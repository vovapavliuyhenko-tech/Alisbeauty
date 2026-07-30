'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface Item {
  category: string;
  name: string;
  subtitle: string;
}

// Тёмные фоновые градиенты-плейсхолдеры (замените реальными фото при желании).
const bgStyles = [
  'linear-gradient(135deg,#3a322c,#0e0c0b 75%)',
  'linear-gradient(135deg,#2b2a30,#0d0b0f 75%)',
  'linear-gradient(135deg,#3a2f28,#100d0b 75%)',
  'linear-gradient(135deg,#26302f,#0b0d0e 75%)',
];
const cardImg = [
  'linear-gradient(135deg,#6f6152,#2a2320)',
  'linear-gradient(135deg,#5c5560,#241f28)',
  'linear-gradient(135deg,#6e5a48,#2c2622)',
  'linear-gradient(135deg,#4f605c,#222528)',
];

export default function PortfolioScroll() {
  const t = useTranslations('portfolio');
  const items = t.raw('items') as Item[];
  const n = items.length;
  const links = t('links');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [index, setIndex] = useState(1);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIndex(Math.min(n, Math.max(1, Math.round(v * (n - 1)) + 1)));
  });

  return (
    <section id="works" ref={ref} className="relative bg-[#0e0c0b] text-white">
      {/* Панели проектов — обычный скролл; карточка по центру каждой */}
      {items.map((item, i) => (
        <div key={i} className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0" style={{ background: bgStyles[i % bgStyles.length] }} />
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative w-full max-w-[380px] bg-white p-8 text-center text-[#1a1512] shadow-2xl">
            <p className="mx-auto max-w-[240px] text-[13px] leading-snug text-[#6b6560]">{item.category}</p>
            <p className="mt-6 font-display text-4xl tracking-wide sm:text-5xl">{item.name}</p>
            <p className="mt-1 text-sm text-[#8a827b]">{item.subtitle}</p>
            <p className="mt-5 text-[13px] uppercase tracking-[0.15em] text-[#8a827b]">{links}</p>
            <div className="mx-auto mt-6 aspect-[4/3] w-full max-w-[300px]" style={{ background: cardImg[i % cardImg.length] }} />
          </div>
        </div>
      ))}

      {/* Зафиксированный слой: вступление, метка, счётчик (стоит, пока листаем секцию) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="sticky top-0 h-screen">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-[92%] max-w-content pb-8">
            <p className="mb-4 max-w-md text-xs leading-relaxed text-white/70">{t('intro')}</p>
            <div className="flex items-end justify-between text-white/90">
              <span className="text-lg tracking-wide sm:text-2xl">({t('label')})</span>
              <span className="text-lg tracking-wide sm:text-2xl">({index})</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
