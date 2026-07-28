// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// Форма записи — отправка заявки в Telegram.
// Токен и chat_id задаются в js/config.js. Если они не заполнены,
// форма работает в тестовом режиме (показывает сообщение, но ничего не отправляет).
const form = document.getElementById('bookingForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  if (!data.name || !data.phone || !data.service) {
    note.textContent = 'Пожалуйста, заполните имя, телефон и услугу.';
    note.className = 'form__note err';
    return;
  }

  const cfg = window.ALIS_CONFIG || {};
  const submitBtn = form.querySelector('button[type="submit"]');

  // Тестовый режим — Telegram ещё не настроен
  if (!cfg.TELEGRAM_BOT_TOKEN || !cfg.TELEGRAM_CHAT_ID) {
    console.log('Заявка (тестовый режим, Telegram не настроен):', data);
    note.textContent = 'Спасибо! Заявка получена (тестовый режим).';
    note.className = 'form__note ok';
    form.reset();
    return;
  }

  const text =
    '💅 Новая заявка с сайта Alis Beauty\n\n' +
    'Имя: ' + data.name + '\n' +
    'Телефон: ' + data.phone + '\n' +
    'Услуга: ' + data.service + '\n' +
    'Дата: ' + (data.date || '—') + '\n' +
    'Комментарий: ' + (data.comment || '—');

  note.textContent = 'Отправляем…';
  note.className = 'form__note';
  submitBtn.disabled = true;

  try {
    const res = await fetch(
      'https://api.telegram.org/bot' + cfg.TELEGRAM_BOT_TOKEN + '/sendMessage',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: cfg.TELEGRAM_CHAT_ID, text })
      }
    );
    if (!res.ok) throw new Error('Telegram API error ' + res.status);

    note.textContent = 'Спасибо! Заявка отправлена. Мы скоро свяжемся с вами.';
    note.className = 'form__note ok';
    form.reset();
  } catch (err) {
    console.error(err);
    note.textContent = 'Не удалось отправить. Позвоните нам по телефону.';
    note.className = 'form__note err';
  } finally {
    submitBtn.disabled = false;
  }
});
