/* =========================================================
   A'LIS — интерактив и анимации.
   Lenis (плавный скролл) + GSAP ScrollTrigger (параллакс/pin/count-up).
   ========================================================= */
import { t, getLang } from '/js/i18n.js';

/* ---------- Конфиг: сюда владелец подставляет свои данные ---------- */
const CONFIG = {
  YCLIENTS_ID: '',                       // ID виджета YClients (напр. '1234567'); пусто → показывается заглушка
  WHATSAPP: '[НОМЕР]',                   // номер для wa.me, только цифры (напр. 79180000000)
  CALLBACK_ENDPOINT: '/api/lead',        // serverless-функция, шлющая заявку в Telegram (токен — на бэкенде!)
  METRIKA_ID: '',                        // номер счётчика Яндекс.Метрики
};

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- Год в подвале ---------- */
$$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

/* ---------- Подстановка WhatsApp-ссылок ---------- */
function waLink(text) {
  const msg = encodeURIComponent(text || (getLang() === 'en' ? 'Hello! I’d like to book an appointment.' : 'Здравствуйте! Хочу записаться.'));
  return `https://wa.me/${CONFIG.WHATSAPP}?text=${msg}`;
}
$$('a[href^="https://wa.me/"]').forEach((a) => (a.href = waLink()));

/* ========================================================
   Lenis — плавный инерционный скролл
   ======================================================== */
let lenis = null;
if (!reduced && window.Lenis) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

/* ========================================================
   GSAP ScrollTrigger — параллакс, reveal, count-up
   ======================================================== */
document.body.classList.add(reduced ? 'no-anim' : 'is-ready');

if (!reduced && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) lenis.on('scroll', ScrollTrigger.update);

  // Reveal — плавное появление секций
  $$('[data-reveal]').forEach((el) => {
    gsap.fromTo(el, { autoAlpha: 0, y: 26 }, {
      autoAlpha: 1, y: 0, duration: .8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
    el.classList.add('is-in');
  });

  // Параллакс — элементы плывут по вертикали на разной амплитуде (data-speed)
  $$('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0;
    const amp = 120 * speed; // амплитуда движения
    gsap.fromTo(el, { y: -amp }, {
      y: amp, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Hero-блоб — лёгкий параллакс
  const blob = $('.hero__blob');
  if (blob) gsap.to(blob, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
} else {
  // Без анимаций — просто показываем reveal-элементы
  $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
}

/* ---------- Count-up цифр (о нас) ---------- */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = el.dataset.decimal === '0'; // рейтинг 5,0
  if (reduced) { el.textContent = isDecimal ? '5,0' : target; return; }
  const dur = 1400; const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = isDecimal ? val.toFixed(1).replace('.', ',') : Math.round(val);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); statObserver.unobserve(e.target); } });
}, { threshold: .6 });
$$('[data-count]').forEach((el) => statObserver.observe(el));

/* ========================================================
   Шапка: прячется при скролле вниз, появляется вверх
   ======================================================== */
const header = $('#site-header');
let lastY = 0;
function onScrollHeader() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 40);
  if (y > lastY && y > 300) header.classList.add('is-hidden');
  else header.classList.remove('is-hidden');
  lastY = y;
  // Плавающая кнопка — после первого экрана
  fab.classList.toggle('is-visible', y > window.innerHeight * 0.9);
}
const fab = $('#fab');
window.addEventListener('scroll', onScrollHeader, { passive: true });

/* ---------- Мобильное меню ---------- */
const burger = $('#burger');
const mobileMenu = $('#mobile-menu');
function toggleMenu(open) {
  burger.setAttribute('aria-expanded', String(open));
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('is-open')));
$$('#mobile-menu a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

/* ---------- Плавный скролл по якорям (через Lenis) ---------- */
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -70 });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  });
});

/* ========================================================
   Аккордеоны (прайс + FAQ)
   ======================================================== */
$$('.accordion').forEach((acc) => {
  const items = $$('.accordion__item', acc);
  items.forEach((item) => {
    const head = $('.accordion__head', item);
    const body = $('.accordion__body', item);
    head.addEventListener('click', () => {
      const open = head.getAttribute('aria-expanded') === 'true';
      // закрыть остальные в этом аккордеоне
      items.forEach((it) => {
        const h = $('.accordion__head', it); const b = $('.accordion__body', it);
        h.setAttribute('aria-expanded', 'false'); b.style.height = '0px';
      });
      if (!open) {
        head.setAttribute('aria-expanded', 'true');
        body.style.height = body.scrollHeight + 'px';
      }
      if (lenis) setTimeout(() => ScrollTrigger && ScrollTrigger.refresh(), 420);
    });
  });
});

/* ========================================================
   Слайдер «до/после» (drag)
   ======================================================== */
const baRange = $('#ba-range');
if (baRange) {
  const before = $('#ba-before');
  const handle = $('#ba-handle');
  const update = (v) => { before.style.width = v + '%'; handle.style.left = v + '%'; };
  baRange.addEventListener('input', (e) => update(e.target.value));
  update(baRange.value);
}

/* ========================================================
   Лайтбокс галереи
   ======================================================== */
const lightbox = $('#lightbox');
const lightboxImg = $('#lightbox-img');
$$('[data-lightbox]').forEach((el) => {
  el.addEventListener('click', () => {
    const bg = getComputedStyle(el).backgroundImage;
    lightboxImg.style.backgroundImage = bg;
    openOverlay(lightbox);
  });
});

/* ========================================================
   Модалка записи (YClients)
   ======================================================== */
const bookingModal = $('#booking-modal');
let yclientsLoaded = false;
function openBooking(service) {
  if (CONFIG.YCLIENTS_ID && !yclientsLoaded) {
    // Пример интеграции: подставьте корректный домен/виджет YClients
    const slot = $('#yclients-slot');
    slot.innerHTML = `<iframe title="Онлайн-запись" style="width:100%;height:640px;border:0"
      src="https://n${CONFIG.YCLIENTS_ID}.yclients.com/"></iframe>`;
    yclientsLoaded = true;
  }
  openOverlay(bookingModal);
  reachGoal('booking_open', { service: service || 'general' });
}
$$('[data-booking]').forEach((btn) => {
  btn.addEventListener('click', () => openBooking(btn.dataset.service));
});

/* ---------- Общие оверлеи (открыть/закрыть) ---------- */
function openOverlay(el) { el.classList.add('is-open'); el.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; if (lenis) lenis.stop(); }
function closeOverlay(el) { el.classList.remove('is-open'); el.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lenis) lenis.start(); }
$$('[data-close]').forEach((el) => el.addEventListener('click', () => closeOverlay(el.closest('.modal, .lightbox'))));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { $$('.modal.is-open, .lightbox.is-open').forEach(closeOverlay); if (mobileMenu.classList.contains('is-open')) toggleMenu(false); }
});

/* ========================================================
   Форма записи: маска телефона, валидация, honeypot, отправка
   ======================================================== */
const form = $('#booking-form');
const statusEl = $('#form-status');

// Маска +7
const phoneInput = form.querySelector('input[name="phone"]');
phoneInput.addEventListener('input', () => {
  let d = phoneInput.value.replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (!d.startsWith('7')) d = '7' + d;
  d = d.slice(0, 11);
  let out = '+7';
  if (d.length > 1) out += ' (' + d.slice(1, 4);
  if (d.length >= 4) out += ') ' + d.slice(4, 7);
  if (d.length >= 7) out += '-' + d.slice(7, 9);
  if (d.length >= 9) out += '-' + d.slice(9, 11);
  phoneInput.value = out;
});

function validPhone(v) { return v.replace(/\D/g, '').length === 11; }

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.className = 'form__status field--full';

  // honeypot
  if (form.company.value) return;

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const nameField = form.name.closest('.field');
  const phoneField = form.phone.closest('.field');
  nameField.classList.toggle('is-invalid', !name);
  phoneField.classList.toggle('is-invalid', !validPhone(phone));
  if (!name || !validPhone(phone)) {
    statusEl.textContent = t('form.invalid');
    statusEl.classList.add('is-err');
    return;
  }

  const payload = {
    name, phone,
    service: form.service.value,
    date: form.date.value,
    comment: form.comment.value.trim(),
    lang: getLang(),
    page: location.href,
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  try {
    // Токен Telegram-бота держим на бэкенде (serverless). Здесь — только запрос к своей функции.
    const res = await fetch(CONFIG.CALLBACK_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('bad status');
    statusEl.textContent = t('form.ok');
    statusEl.classList.add('is-ok');
    form.reset();
    reachGoal('lead_sent');
  } catch (err) {
    // Фолбэк — предлагаем WhatsApp с предзаполненным сообщением
    statusEl.innerHTML = t('form.err');
    statusEl.classList.add('is-err');
    const msg = `${payload.name}, ${payload.phone}, ${payload.service}${payload.date ? ', ' + payload.date : ''}`;
    window.open(waLink(msg), '_blank', 'noopener');
  } finally {
    submitBtn.disabled = false;
  }
});

/* ========================================================
   Cookie-баннер
   ======================================================== */
const cookie = $('#cookie');
if (!localStorage.getItem('alis-cookie')) {
  setTimeout(() => { cookie.classList.add('is-visible'); cookie.setAttribute('aria-hidden', 'false'); }, 1200);
}
$('#cookie-ok').addEventListener('click', () => {
  localStorage.setItem('alis-cookie', '1');
  cookie.classList.remove('is-visible');
  cookie.setAttribute('aria-hidden', 'true');
});

/* ========================================================
   Аналитика (Яндекс.Метрика) — цель на запись/заявку
   ======================================================== */
function reachGoal(goal, params) {
  if (CONFIG.METRIKA_ID && window.ym) window.ym(CONFIG.METRIKA_ID, 'reachGoal', goal, params);
}

/* ---------- Обновление WhatsApp/i18n при смене языка ---------- */
document.addEventListener('langchange', () => {
  $$('a[href^="https://wa.me/"]').forEach((a) => (a.href = waLink()));
});
