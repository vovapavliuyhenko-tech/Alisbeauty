import { NextRequest, NextResponse } from 'next/server';

interface Payload {
  formType: 'russia' | 'abroad';
  name?: string;
  phone?: string;
  messenger?: string;
  date?: string;
  location?: string;
  people?: string;
  country?: string;
  dateFrom?: string;
  dateTo?: string;
  eventType?: string;
  consent?: boolean;
  // анти-спам
  company?: string; // honeypot — должно быть пустым
  ts?: number; // время открытия формы
}

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // не настроено — пропускаем
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

function buildMessage(p: Payload): string {
  const kind = p.formType === 'abroad' ? 'ЗА РУБЕЖ' : 'ПО РОССИИ';
  const lines = [
    `💅 Новая заявка A'LIS BEAUTY (${kind})`,
    '',
    `Имя: ${p.name || '—'}`,
    `Телефон: ${p.phone || '—'}`,
  ];
  if (p.formType === 'abroad') {
    lines.push(`Мессенджер: ${p.messenger || '—'}`);
    lines.push(`Страна и город: ${p.country || '—'}`);
    lines.push(`Даты поездки: ${p.dateFrom || '—'} — ${p.dateTo || '—'}`);
    lines.push(`Кол-во человек: ${p.people || '—'}`);
    lines.push(`Тип мероприятия: ${p.eventType || '—'}`);
  } else {
    lines.push(`Дата мероприятия: ${p.date || '—'}`);
    lines.push(`Локация: ${p.location || '—'}`);
    lines.push(`Кол-во человек: ${p.people || '—'}`);
  }
  return lines.join('\n');
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

async function sendEmail(text: string, subject: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.FORM_EMAIL_TO;
  const from = process.env.FORM_EMAIL_FROM || 'onboarding@resend.dev';
  if (!key || !to) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
    }),
  });
}

export async function POST(req: NextRequest) {
  let p: Payload;
  try {
    p = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Анти-спам: honeypot
  if (p.company && p.company.trim() !== '') {
    return NextResponse.json({ ok: true }); // тихо игнорируем бота
  }
  // Анти-спам: time-trap (форма заполнена быстрее 2.5 сек — вероятно бот)
  if (p.ts && Date.now() - p.ts < 2500) {
    return NextResponse.json({ ok: true });
  }

  // Валидация обязательных полей на сервере
  const baseValid = p.name && p.phone && p.people && p.consent;
  const specificValid =
    p.formType === 'abroad'
      ? p.messenger && p.country && p.dateFrom && p.dateTo
      : p.date && p.location;
  if (!baseValid || !specificValid) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  // Turnstile (если настроен)
  const captchaOk = await verifyTurnstile((p as Payload & { turnstile?: string }).turnstile);
  if (!captchaOk) {
    return NextResponse.json({ ok: false, error: 'captcha' }, { status: 403 });
  }

  const text = buildMessage(p);
  const subject = `Заявка A'LIS (${p.formType === 'abroad' ? 'за рубеж' : 'по России'})`;

  try {
    await Promise.all([sendTelegram(text), sendEmail(text, subject)]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
}
