// Шрифты в одном месте — легко заменить на фирменный, когда пришлют.
// Как на референсе BlancBloom: элегантный высококонтрастный serif для заголовков
// (аналог их декоративного шрифта) + геометрический гротеск для интерфейса (аналог FuturaPT).
import { Prata, Montserrat } from 'next/font/google';

// Заголовки — Prata (Didone), как декоративный serif на референсе. Одно начертание.
export const fontDisplay = Prata({
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
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
