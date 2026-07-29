// Шрифты в одном месте — легко заменить на фирменный, когда пришлют.
// Как на референсе BlancBloom: элегантный высококонтрастный serif для заголовков
// (аналог их декоративного шрифта) + геометрический гротеск для интерфейса (аналог FuturaPT).
import { Playfair_Display, Montserrat } from 'next/font/google';

// Заголовки — элегантный serif с поддержкой кириллицы
export const fontDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Интерфейс/текст — геометрический гротеск с кириллицей
export const fontBody = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
