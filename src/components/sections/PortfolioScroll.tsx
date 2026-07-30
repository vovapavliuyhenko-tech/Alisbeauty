'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScroll, useMotionValueEvent, useTransform, motion } from 'framer-motion';

interface Item {
  category: string;
  name: string;
  subtitle: string;
}

const cardImg = [
  'linear-gradient(135deg,#6f6152,#2a2320)',
  'linear-gradient(135deg,#5c5560,#241f28)',
  'linear-gradient(135deg,#6e5a48,#2c2622)',
  'linear-gradient(135deg,#4f605c,#222528)',
];

// Плитки коллажа-фона (плейсхолдеры — замените реальными фото работ).
const tilePalette = [
  'linear-gradient(135deg,#4a4038,#241f1b)',
  'linear-gradient(135deg,#3a3a42,#1a1a20)',
  'linear-gradient(135deg,#5a4a3a,#2a2018)',
  'linear-gradient(135deg,#3d4a47,#181f1d)',
  'linear-gradient(135deg,#6a5c4c,#322a22)',
  'linear-gradient(135deg,#463c48,#201a24)',
  'linear-gradient(135deg,#554438,#2a201a)',
  'linear-gradient(135deg,#404a48,#1a201f)',
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

  // Лёгкий параллакс коллажа
  const collageY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const tiles = Array.from({ length: n * 12 + 9 });

  return (
    <section id="works" ref={ref} className="relative bg-[#0e0c0b] text-white">
      {/* Непрерывный коллаж-фон на всю секцию (всегда заполняет экран) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: collageY }}
          className="grid auto-rows-[26vh] grid-cols-2 gap-1.5 sm:grid-cols-3"
        >
          {tiles.map((_, i) => (
            <div
              key={i}
              style={{ background: tilePalette[i % tilePalette.length] }}
              className={i % 5 === 0 ? 'row-span-2' : ''}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Карточки проектов поверх коллажа — обычный скролл, по центру каждой */}
      {items.map((item, i) => (
        <div key={i} className="relative z-10 flex h-screen w-full items-center justify-center px-6">
          <div className="w-full max-w-[380px] bg-white p-8 text-center text-[#1a1512] shadow-2xl">
            <p className="mx-auto max-w-[240px] text-[13px] leading-snug text-[#6b6560]">{item.category}</p>
            <p className="mt-6 font-display text-4xl tracking-wide sm:text-5xl">{item.name}</p>
            <p className="mt-1 text-sm text-[#8a827b]">{item.subtitle}</p>
            <p className="mt-5 text-[13px] uppercase tracking-[0.15em] text-[#8a827b]">{links}</p>
            <div className="mx-auto mt-6 aspect-[4/3] w-full max-w-[300px]" style={{ background: cardImg[i % cardImg.length] }} />
          </div>
        </div>
      ))}

      {/* Зафиксированный слой: вступление, метка, счётчик */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="sticky top-0 h-screen">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-[92%] max-w-content pb-8">
            <p className="mb-4 max-w-md text-xs leading-relaxed text-white/80">{t('intro')}</p>
            <div className="flex items-end justify-between text-white">
              <span className="text-lg tracking-wide sm:text-2xl">({t('label')})</span>
              <span className="text-lg tracking-wide sm:text-2xl">({index})</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
