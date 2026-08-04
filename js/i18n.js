/* =========================================================
   i18n — RU/EN. RU заполнен, EN — рабочий перевод (правьте строки).
   Механика: data-i18n="ключ" (textContent), data-i18n-placeholder (placeholder).
   Выбор языка хранится в localStorage, обновляется <html lang>.
   ========================================================= */

const DICT = {
  ru: {
    'a11y.skip': 'К основному содержимому',
    'nav.services': 'Услуги', 'nav.price': 'Прайс', 'nav.about': 'О нас',
    'nav.cases': 'Кейсы', 'nav.reviews': 'Отзывы', 'nav.contacts': 'Контакты', 'nav.book': 'Записаться',

    'hero.eyebrow': 'Салон красоты · Новороссийск',
    'hero.title': 'Безупречно — от маникюра до дня свадьбы',
    'hero.sub': 'Премиальный салон в Новороссийске. Результат, за который не стыдно.',
    'hero.ctaBook': 'Записаться онлайн', 'hero.ctaServices': 'Смотреть услуги',
    'hero.trust': '500+ клиентов · 5,0 на Яндексе · мастера от 5 лет',

    'services.eyebrow': 'Услуги', 'services.title': 'Одно место — весь ваш образ',
    'services.sub': 'Не эксперименты. Результат, который видно.',
    'services.s1.name': 'Маникюр и педикюр.', 'services.s1.text': 'Держится 3–4 недели. Стерильно.', 'services.s1.price': 'от [X] ₽',
    'services.s2.name': 'Брови и ресницы.', 'services.s2.text': 'Идеальный взгляд без макияжа.', 'services.s2.price': 'от [X] ₽',
    'services.s3.name': 'Макияж.', 'services.s3.text': 'Подчёркиваем вас, не прячем.', 'services.s3.price': 'от [X] ₽',
    'services.s4.name': 'Причёски и укладки.', 'services.s4.text': 'Держится до последнего танца.', 'services.s4.price': 'от [X] ₽',
    'services.s5.name': 'Образ невесты.', 'services.s5.text': 'Макияж, причёска, репетиция — под ключ.', 'services.s5.price': 'от [X] ₽',

    'price.eyebrow': 'Прайс', 'price.title': 'Цены известны заранее', 'price.sub': 'Никаких «доплатите на месте».',
    'price.c1.title': 'Маникюр и педикюр',
    'price.c1.r1': 'Маникюр с покрытием', 'price.c1.p1': '[X] ₽',
    'price.c1.r2': 'Педикюр с покрытием', 'price.c1.p2': '[X] ₽',
    'price.c1.r3': 'Снятие / укрепление', 'price.c1.p3': '[X] ₽',
    'price.c2.title': 'Брови и ресницы',
    'price.c2.r1': 'Оформление и окрашивание бровей', 'price.c2.p1': '[X] ₽',
    'price.c2.r2': 'Ламинирование ресниц', 'price.c2.p2': '[X] ₽',
    'price.c3.title': 'Макияж и причёски',
    'price.c3.r1': 'Дневной / вечерний макияж', 'price.c3.p1': '[X] ₽',
    'price.c3.r2': 'Причёска / укладка', 'price.c3.p2': '[X] ₽',
    'price.c4.title': 'Образ невесты',
    'price.c4.r1': 'Образ под ключ (макияж + причёска)', 'price.c4.p1': '[X] ₽',
    'price.c4.r2': 'Репетиция образа', 'price.c4.p2': '[X] ₽',

    'about.eyebrow': 'О нас', 'about.title': 'Салон, куда возвращаются',
    'about.text': '[N] лет. [N]+ клиентов. Ноль конвейера. Каждому — время, внимание и результат. Стерильность, премиум-материалы, мастера, которые слушают. Доверьте внешность тем, кто знает, что делает.',
    'about.st1': 'лет', 'about.st2': 'клиентов', 'about.st3': 'мастеров', 'about.st4': 'рейтинг',

    'cases.eyebrow': 'Наши работы', 'cases.title': 'Смотрите на результат',
    'cases.sub': 'Реальные работы, без тяжёлой ретуши. Так будет и у вас.',
    'cases.before': 'До', 'cases.after': 'После', 'cases.cta': 'Хочу так же',

    'steps.eyebrow': 'Как мы работаем', 'steps.title': 'Просто и без нервов',
    'steps.s1.t': 'Заявка', 'steps.s1.d': 'Ответ за 15 минут.',
    'steps.s2.t': 'Консультация', 'steps.s2.d': 'Подберём услугу под вас.',
    'steps.s3.t': 'Запись', 'steps.s3.d': 'Удобное время, без очередей.',
    'steps.s4.t': 'Процедура', 'steps.s4.d': 'Вы отдыхаете, мастер работает.',
    'steps.s5.t': 'Результат', 'steps.s5.d': 'Уходите с образом мечты.',

    'reviews.eyebrow': 'Отзывы', 'reviews.title': 'Нам доверяют главное',
    'reviews.sub': '5,0 на Яндексе и 2ГИС. Читайте сами.',
    'reviews.r1.text': 'Пришла на образ невесты — это была лучшая версия меня. Держалось весь день до последнего танца.',
    'reviews.r1.name': 'Анна', 'reviews.r1.service': 'Образ невесты',
    'reviews.r2.text': 'Хожу на маникюр только сюда. Стерильно, аккуратно, держится три недели минимум.',
    'reviews.r2.name': 'Мария', 'reviews.r2.service': 'Маникюр',
    'reviews.r3.text': 'Брови сделали идеально под лицо. Наконец без макияжа выгляжу собранно.',
    'reviews.r3.name': 'Ольга', 'reviews.r3.service': 'Брови',
    'reviews.cta': 'Оставить отзыв',

    'ig.eyebrow': 'Мы в Instagram', 'ig.title': 'Красота в прямом эфире',
    'ig.sub': 'Свежие работы каждый день.', 'ig.cta': 'Подписаться @alis.beauty',

    'faq.eyebrow': 'Вопросы', 'faq.title': 'Коротко о важном',
    'faq.q1': 'Как записаться?', 'faq.a1': 'Онлайн за минуту или в WhatsApp. Подтвердим сразу.',
    'faq.q2': 'Перенести или отменить?', 'faq.a2': 'Да, за 24 часа.',
    'faq.q3': 'Выезд на дом или в отель?', 'faq.a3': 'Да, особенно для невест.',
    'faq.q4': 'Безопасно?', 'faq.a4': 'Стерильно, одноразовые материалы.',
    'faq.q5': 'Подготовка невесты?', 'faq.a5': '[X] часов + репетиция заранее.',
    'faq.q6': 'Оплата?', 'faq.a6': 'Карта или наличные. Невестам — бронь по предоплате.',

    'form.eyebrow': 'Запись', 'form.title': 'Запишитесь за минуту',
    'form.sub': 'Оставьте заявку — подберём время и мастера. На выходные и свадебный сезон места уходят вперёд.',
    'form.name': 'Имя', 'form.namePh': 'Как к вам обращаться',
    'form.phone': 'Телефон', 'form.service': 'Услуга', 'form.date': 'Желаемая дата',
    'form.comment': 'Комментарий', 'form.commentPh': 'Пожелания, событие, дата',
    'form.opt.manicure': 'Маникюр и педикюр', 'form.opt.brows': 'Брови и ресницы', 'form.opt.makeup': 'Макияж',
    'form.opt.hair': 'Причёски и укладки', 'form.opt.bride': 'Образ невесты',
    'form.submit': 'Записаться', 'form.whatsapp': 'Написать в WhatsApp',
    'form.note': 'Перезвоним за 15 минут. Без спама.',
    'form.ok': 'Спасибо! Заявка отправлена — перезвоним за 15 минут.',
    'form.err': 'Не удалось отправить. Напишите нам в WhatsApp.',
    'form.invalid': 'Проверьте имя и телефон (+7).',

    'footer.tagline': '[НАЗВАНИЕ] — премиальный салон красоты в Новороссийске.',
    'footer.contacts': 'Контакты', 'footer.address': '[адрес], Новороссийск', 'footer.hours': 'Ежедневно [09:00–21:00]',
    'footer.phone': '+7 [___] ___-__-__', 'footer.legal': 'Реквизиты', 'footer.ip': '[ИП ___]', 'footer.inn': '[ИНН ___]',

    'modal.placeholder': 'Здесь откроется виджет онлайн-записи YClients. Подставьте ID компании/виджета в js/main.js (YCLIENTS_ID).',
    'cookie.text': 'Cookie — чтобы сайт был удобнее.', 'cookie.ok': 'Ок',
  },

  en: {
    'a11y.skip': 'Skip to content',
    'nav.services': 'Services', 'nav.price': 'Pricing', 'nav.about': 'About',
    'nav.cases': 'Work', 'nav.reviews': 'Reviews', 'nav.contacts': 'Contacts', 'nav.book': 'Book now',

    'hero.eyebrow': 'Beauty salon · Novorossiysk',
    'hero.title': 'Flawless — from manicure to your wedding day',
    'hero.sub': 'A premium salon in Novorossiysk. A result you can be proud of.',
    'hero.ctaBook': 'Book online', 'hero.ctaServices': 'View services',
    'hero.trust': '500+ clients · 5.0 on Yandex · masters with 5+ years',

    'services.eyebrow': 'Services', 'services.title': 'One place — your whole look',
    'services.sub': 'No experiments. A result you can see.',
    'services.s1.name': 'Manicure & pedicure.', 'services.s1.text': 'Lasts 3–4 weeks. Sterile.', 'services.s1.price': 'from [X] ₽',
    'services.s2.name': 'Brows & lashes.', 'services.s2.text': 'A perfect look without makeup.', 'services.s2.price': 'from [X] ₽',
    'services.s3.name': 'Makeup.', 'services.s3.text': 'We enhance you, not hide you.', 'services.s3.price': 'from [X] ₽',
    'services.s4.name': 'Hair & styling.', 'services.s4.text': 'Holds until the last dance.', 'services.s4.price': 'from [X] ₽',
    'services.s5.name': 'Bridal look.', 'services.s5.text': 'Makeup, hair, trial — turnkey.', 'services.s5.price': 'from [X] ₽',

    'price.eyebrow': 'Pricing', 'price.title': 'Prices known upfront', 'price.sub': 'No “pay extra on site”.',
    'price.c1.title': 'Manicure & pedicure',
    'price.c1.r1': 'Manicure with coating', 'price.c1.p1': '[X] ₽',
    'price.c1.r2': 'Pedicure with coating', 'price.c1.p2': '[X] ₽',
    'price.c1.r3': 'Removal / reinforcement', 'price.c1.p3': '[X] ₽',
    'price.c2.title': 'Brows & lashes',
    'price.c2.r1': 'Brow shaping & tinting', 'price.c2.p1': '[X] ₽',
    'price.c2.r2': 'Lash lamination', 'price.c2.p2': '[X] ₽',
    'price.c3.title': 'Makeup & hair',
    'price.c3.r1': 'Day / evening makeup', 'price.c3.p1': '[X] ₽',
    'price.c3.r2': 'Hairstyle / styling', 'price.c3.p2': '[X] ₽',
    'price.c4.title': 'Bridal look',
    'price.c4.r1': 'Turnkey look (makeup + hair)', 'price.c4.p1': '[X] ₽',
    'price.c4.r2': 'Trial look', 'price.c4.p2': '[X] ₽',

    'about.eyebrow': 'About', 'about.title': 'A salon you return to',
    'about.text': '[N] years. [N]+ clients. Zero conveyor belt. Time, attention and a result for everyone. Sterility, premium materials, masters who listen. Trust your looks to people who know what they do.',
    'about.st1': 'years', 'about.st2': 'clients', 'about.st3': 'masters', 'about.st4': 'rating',

    'cases.eyebrow': 'Our work', 'cases.title': 'Look at the result',
    'cases.sub': 'Real work, no heavy retouching. Yours will look the same.',
    'cases.before': 'Before', 'cases.after': 'After', 'cases.cta': 'I want this too',

    'steps.eyebrow': 'How we work', 'steps.title': 'Simple and calm',
    'steps.s1.t': 'Request', 'steps.s1.d': 'A reply within 15 minutes.',
    'steps.s2.t': 'Consultation', 'steps.s2.d': 'We pick the service for you.',
    'steps.s3.t': 'Booking', 'steps.s3.d': 'A convenient time, no queues.',
    'steps.s4.t': 'Procedure', 'steps.s4.d': 'You relax, the master works.',
    'steps.s5.t': 'Result', 'steps.s5.d': 'You leave with the look of your dreams.',

    'reviews.eyebrow': 'Reviews', 'reviews.title': 'Trusted with what matters',
    'reviews.sub': '5.0 on Yandex and 2GIS. See for yourself.',
    'reviews.r1.text': 'Came for a bridal look — it was the best version of me. It held all day, to the last dance.',
    'reviews.r1.name': 'Anna', 'reviews.r1.service': 'Bridal look',
    'reviews.r2.text': 'I only get my manicure here. Sterile, precise, lasts three weeks at least.',
    'reviews.r2.name': 'Maria', 'reviews.r2.service': 'Manicure',
    'reviews.r3.text': 'They shaped my brows perfectly for my face. Finally I look put-together without makeup.',
    'reviews.r3.name': 'Olga', 'reviews.r3.service': 'Brows',
    'reviews.cta': 'Leave a review',

    'ig.eyebrow': 'We are on Instagram', 'ig.title': 'Beauty, live',
    'ig.sub': 'Fresh work every day.', 'ig.cta': 'Follow @alis.beauty',

    'faq.eyebrow': 'FAQ', 'faq.title': 'The essentials, briefly',
    'faq.q1': 'How to book?', 'faq.a1': 'Online in a minute or via WhatsApp. Confirmed right away.',
    'faq.q2': 'Reschedule or cancel?', 'faq.a2': 'Yes, 24 hours ahead.',
    'faq.q3': 'On-location, home or hotel?', 'faq.a3': 'Yes, especially for brides.',
    'faq.q4': 'Is it safe?', 'faq.a4': 'Sterile, single-use materials.',
    'faq.q5': 'Bridal preparation?', 'faq.a5': '[X] hours + a trial in advance.',
    'faq.q6': 'Payment?', 'faq.a6': 'Card or cash. Brides — booking with a deposit.',

    'form.eyebrow': 'Booking', 'form.title': 'Book in a minute',
    'form.sub': 'Leave a request — we’ll pick a time and a master. Weekends and wedding season fill up early.',
    'form.name': 'Name', 'form.namePh': 'How to address you',
    'form.phone': 'Phone', 'form.service': 'Service', 'form.date': 'Preferred date',
    'form.comment': 'Comment', 'form.commentPh': 'Wishes, event, date',
    'form.opt.manicure': 'Manicure & pedicure', 'form.opt.brows': 'Brows & lashes', 'form.opt.makeup': 'Makeup',
    'form.opt.hair': 'Hair & styling', 'form.opt.bride': 'Bridal look',
    'form.submit': 'Book now', 'form.whatsapp': 'Message on WhatsApp',
    'form.note': 'We’ll call back within 15 minutes. No spam.',
    'form.ok': 'Thank you! Request sent — we’ll call back within 15 minutes.',
    'form.err': 'Could not send. Please message us on WhatsApp.',
    'form.invalid': 'Please check name and phone (+7).',

    'footer.tagline': '[NAME] — a premium beauty salon in Novorossiysk.',
    'footer.contacts': 'Contacts', 'footer.address': '[address], Novorossiysk', 'footer.hours': 'Daily [09:00–21:00]',
    'footer.phone': '+7 [___] ___-__-__', 'footer.legal': 'Legal', 'footer.ip': '[Sole proprietor ___]', 'footer.inn': '[VAT/INN ___]',

    'modal.placeholder': 'The YClients online-booking widget opens here. Add your company/widget ID in js/main.js (YCLIENTS_ID).',
    'cookie.text': 'Cookies — to make the site more convenient.', 'cookie.ok': 'OK',
  },
};

const STORAGE_KEY = 'alis-lang';

export function t(key, lang) {
  const l = lang || getLang();
  return (DICT[l] && DICT[l][key]) || (DICT.ru[key]) || key;
}

export function getLang() {
  return localStorage.getItem(STORAGE_KEY) || 'ru';
}

export function applyLang(lang) {
  const l = DICT[lang] ? lang : 'ru';
  localStorage.setItem(STORAGE_KEY, l);
  document.documentElement.lang = l;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (DICT[l][key] != null) el.textContent = DICT[l][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (DICT[l][key] != null) el.setAttribute('placeholder', DICT[l][key]);
  });

  document.querySelectorAll('.lang__btn').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.lang === l);
  });
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
}

export function initI18n() {
  applyLang(getLang());
  document.querySelectorAll('.lang__btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

initI18n();
