// Шрифты в одном месте — легко заменить на фирменный, когда пришлют.
// Стиль как на референсе BlancBloom (FuturaPT) — берём Montserrat:
// геометрический гротеск с поддержкой кириллицы и латиницы, тонкие начертания.
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-main',
  display: 'swap',
});

// И заголовки, и текст — один геометрический шрифт (как в референсе).
export const fontDisplay = montserrat;
export const fontBody = montserrat;
