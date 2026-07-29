# A'LIS BEAUTY — сайт салона и beauty-консьерж-сервиса

Одностраничный сайт (Next.js App Router + TypeScript) с якорной навигацией, двумя языками (RU/EN), плавным скроллом, анимациями, формами-анкетами и галереей с лентой Instagram.

## Стек
Next.js 15 · TypeScript · Tailwind CSS · next-intl · Framer Motion · Lenis · embla-carousel · lucide-react. Хостинг — Vercel.

## Запуск локально
```bash
npm install
cp .env.example .env.local   # заполнить переменные (см. ниже)
npm run dev                  # http://localhost:3000
```
Сборка: `npm run build` → `npm start`.

## Переменные окружения (`.env.local`)
Сайт работает и без них (формы/лента переходят в запасной режим), но для боевого режима заполните:

| Переменная | Зачем |
|---|---|
| `RESEND_API_KEY` | Отправка заявок на email (сервис [Resend](https://resend.com)) |
| `FORM_EMAIL_TO` | Куда слать заявки (по умолчанию alisbeautyclub@gmail.com) |
| `FORM_EMAIL_FROM` | Отправитель (проверенный домен Resend) |
| `TELEGRAM_BOT_TOKEN` | Токен бота от @BotFather — заявки в Telegram |
| `TELEGRAM_CHAT_ID` | Куда слать заявки в Telegram |
| `IG_ACCESS_TOKEN` | Long-lived токен Instagram Graph API (лента) |
| `IG_USER_ID` | ID бизнес-аккаунта Instagram |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Номер счётчика Яндекс.Метрики |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Капча (опционально) |
| `NEXT_PUBLIC_SITE_URL` | Базовый URL для sitemap/canonical |

Если Telegram/email не заданы — форма примет заявку без падения (для боевого режима задайте хотя бы один канал). Если Instagram не настроен — вместо ленты показывается кнопка «Смотреть в Instagram».

## Что и где менять (для заказчика)
- **Цвета/токены:** `src/app/globals.css` (блок `:root`).
- **Шрифты:** `src/app/fonts.ts` (сейчас Playfair Display + Manrope — заменить на фирменный).
- **Логотип:** текстовый в `src/components/Header.tsx` и `Footer.tsx` — заменить на SVG/PNG в одном месте.
- **Тексты (RU/EN):** `messages/ru.json` и `messages/en.json` — весь контент здесь.
- **Прайс:** внутри `messages/*.json` → секция `price`.
- **Ссылки/контакты/реквизиты:** `src/config/site.ts`.
- **Галерея (фото/видео):** файлы в `public/gallery`, список — `src/config/gallery.ts`.

## Деплой на Vercel
1. Импортировать репозиторий на [vercel.com](https://vercel.com).
2. В настройках проекта → Environment Variables добавить переменные из таблицы.
3. Deploy. Домен `alisbeauty.ru`: Project → Settings → Domains → Add, затем указать DNS-записи у регистратора (Vercel подскажет).

## Структура
```
src/
  app/[locale]/       — страницы (главная, /politic), layout, метаданные
  app/api/            — enquiry (заявки), instagram (лента)
  components/         — Header, Footer, модалки, анимации
  components/sections/— все секции длинной страницы
  config/             — site.ts (ссылки), gallery.ts (медиа)
  i18n/               — настройки next-intl
messages/             — ru.json, en.json (весь текст)
```
