// Шрифты в одном месте. Дизайн как на референсе resayme.ru:
//  - крупные заголовки: узкий «конденсед» гротеск (аналог Thunder) — Oswald (есть кириллица)
//  - интерфейс/текст: Inter
//  - элегантные акценты курсивом: serif (Times/Georgia стек, задаётся в globals.css)
import { Oswald, Inter } from 'next/font/google';

// Заголовки — узкий конденсед-гротеск, аналог Thunder на референсе
export const fontDisplay = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Интерфейс/текст — Inter, как на референсе
export const fontBody = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
