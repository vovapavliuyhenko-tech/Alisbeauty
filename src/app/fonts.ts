// Шрифты в одном месте — легко заменить на фирменный, когда пришлют.
import { Playfair_Display, Manrope } from 'next/font/google';

export const fontDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const fontBody = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
