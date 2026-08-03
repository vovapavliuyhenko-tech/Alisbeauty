// Шрифты как на референсе resayme.ru:
//  - основной текст, интерфейс, лейблы «(about me)» — Inter (чистый гротеск)
//  - крупные брендовые/проектные слова («resayme», «bergammo») — изящный Didone-serif.
//    Берём Playfair Display (высокий контраст, есть кириллица).
import { Inter, Playfair_Display } from 'next/font/google';

// Крупные брендовые слова — высококонтрастный serif (Didone), как «bergammo» на референсе
export const fontDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Интерфейс/текст/заголовки-лейблы — Inter, как на референсе
export const fontBody = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
