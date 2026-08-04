/* Vercel serverless-функция: приём заявки с формы и отправка в Telegram.
   Токен бота НЕ хранится в клиентском JS — только в переменных окружения Vercel:
     TELEGRAM_BOT_TOKEN  — токен бота (@BotFather)
     TELEGRAM_CHAT_ID    — id чата/канала, куда слать заявки
   Деплой: положите файл в /api/lead.js, задайте env-переменные в проекте Vercel.
   Фронт шлёт POST на /api/lead (см. CONFIG.CALLBACK_ENDPOINT в js/main.js). */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT = process.env.TELEGRAM_CHAT_ID;
  if (!TOKEN || !CHAT) return res.status(500).json({ ok: false, error: 'Bot not configured' });

  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const name = String(b.name || '').slice(0, 120);
    const phone = String(b.phone || '').slice(0, 40);
    const digits = phone.replace(/\D/g, '');
    if (!name || digits.length !== 11) return res.status(400).json({ ok: false, error: 'Invalid data' });

    const text =
      `🌸 Новая заявка — A'LIS\n\n` +
      `👤 ${name}\n` +
      `📞 ${phone}\n` +
      `💅 Услуга: ${b.service || '—'}\n` +
      `📅 Дата: ${b.date || '—'}\n` +
      (b.comment ? `📝 ${b.comment}\n` : '') +
      `🌐 ${b.lang || 'ru'} · ${b.page || ''}`;

    const tg = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text, disable_web_page_preview: true }),
    });
    if (!tg.ok) throw new Error('Telegram error');

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Send failed' });
  }
}
