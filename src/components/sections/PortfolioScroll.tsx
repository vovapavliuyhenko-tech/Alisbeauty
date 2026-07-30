'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';

interface Item {
  category: string;
  name: string;
  subtitle: string;
}

// Тёмные фоновые градиенты-плейсхолдеры (замените реальными фото в /public при желании).
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

// Доля сегмента, отведённая на въезд/выезд карточки (остальное — «зависание» по центру).
const T = 0.3;

// Фон одного проекта: проявляется на своём сегменте + лёгкий параллакс.
function ProjectBg({ progress, i, n }: { progress: MotionValue<number>; i: number; n: number }) {
  const seg = 1 / n;
  const start = i * seg;
  const end = (i + 1) * seg;
  const t = seg * T;
  const first = i === 0;
  const last = i === n - 1;
  const opacity = useTransform(
    progress,
    [start, start + t, end - t, end],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );
  const y = useTransform(progress, [start, end], ['-6%', '6%']); // параллакс фона
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, background: bgStyles[i % bgStyles.length] }} className="absolute inset-[-8%]" />
    </motion.div>
  );
}

// Карточка проекта: въезжает снизу → зависает по центру → уезжает вверх (перетекание).
function ProjectCard({
  progress,
  i,
  n,
  item,
  links,
}: {
  progress: MotionValue<number>;
  i: number;
  n: number;
  item: Item;
  links: string;
}) {
  const seg = 1 / n;
  const start = i * seg;
  const end = (i + 1) * seg;
  const t = seg * T;
  const first = i === 0;
  const last = i === n - 1;

  // Позиция по вертикали в процентах экрана: снизу (110%) → центр (0) → вверх (-110%)
  const y = useTransform(
    progress,
    first ? [start, end - t, end] : last ? [start, start + t, end] : [start, start + t, end - t, end],
    first ? ['0%', '0%', '-110%'] : last ? ['110%', '0%', '0%'] : ['110%', '0%', '0%', '-110%']
  );

  return (
    <motion.div style={{ y }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
      <div className="pointer-events-auto w-full max-w-[380px] bg-white p-8 text-center text-[#1a1512] shadow-2xl">
        <p className="mx-auto max-w-[240px] text-[13px] leading-snug text-[#6b6560]">{item.category}</p>
        <p className="mt-6 font-display text-4xl tracking-wide sm:text-5xl">{item.name}</p>
        <p className="mt-1 text-sm text-[#8a827b]">{item.subtitle}</p>
        <p className="mt-5 text-[13px] uppercase tracking-[0.15em] text-[#8a827b]">{links}</p>
        <div className="mt-6 aspect-[4/3] w-full" style={{ background: cardImg[i % cardImg.length] }} />
      </div>
    </motion.div>
  );
}

export default function PortfolioScroll() {
  const t = useTranslations('portfolio');
  const items = t.raw('items') as Item[];
  const n = items.length;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [index, setIndex] = useState(1);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIndex(Math.min(n, Math.max(1, Math.floor(v * n) + 1)));
  });

  return (
    <section id="works" ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0e0c0b] text-white">
        {/* Фоновый коллаж */}
        {items.map((_, i) => (
          <ProjectBg key={i} progress={scrollYProgress} i={i} n={n} />
        ))}
        <div className="absolute inset-0 bg-black/30" />

        {/* Карточки проектов */}
        {items.map((item, i) => (
          <ProjectCard key={i} progress={scrollYProgress} i={i} n={n} item={item} links={t('links')} />
        ))}

        {/* Фиксированный оверлей: вступление, метка, счётчик */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[92%] max-w-content pb-8">
          <p className="mb-4 max-w-md text-xs leading-relaxed text-white/70">{t('intro')}</p>
          <div className="flex items-end justify-between text-white/90">
            <span className="text-lg tracking-wide sm:text-2xl">({t('label')})</span>
            <span className="text-lg tracking-wide sm:text-2xl">({index})</span>
          </div>
        </div>
      </div>
    </section>
  );
}
