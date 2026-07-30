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
}

// Тёмные фоновые градиенты-плейсхолдеры (замените реальными фото в /public при желании).
const bgStyles = [
  'linear-gradient(135deg,#2a2320,#0e0c0b 70%)',
  'linear-gradient(135deg,#241f28,#0d0b0f 70%)',
  'linear-gradient(135deg,#2c2622,#100d0b 70%)',
  'linear-gradient(135deg,#222528,#0b0d0e 70%)',
];

// Фон одного проекта — плавно проявляется/затухает по прогрессу скролла.
function ProjectBg({ progress, i, n }: { progress: MotionValue<number>; i: number; n: number }) {
  const seg = 1 / n;
  const start = i * seg;
  const end = (i + 1) * seg;
  const first = i === 0;
  const last = i === n - 1;
  const opacity = useTransform(
    progress,
    [start - 0.02, start + 0.08, end - 0.08, end + 0.02],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );
  const scale = useTransform(progress, [start, end], [1.08, 1]);
  return (
    <motion.div
      style={{ opacity, background: bgStyles[i % bgStyles.length] }}
      className="absolute inset-0"
    >
      <motion.div style={{ scale }} className="absolute inset-0 opacity-30 mix-blend-overlay [background:radial-gradient(60%_60%_at_30%_20%,#fff,transparent)]" />
    </motion.div>
  );
}

// Карточка проекта — проявляется и уплывает вверх (перетекание одна в другую).
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
  const first = i === 0;
  const last = i === n - 1;
  const opacity = useTransform(
    progress,
    [start, start + 0.04, end - 0.04, end],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );
  const y = useTransform(progress, [start, end], [first ? 0 : 60, last ? 0 : -60]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="w-full max-w-[380px] rounded-md bg-white p-8 text-center text-[#1a1512] shadow-2xl">
        <p className="mx-auto max-w-[240px] text-[13px] leading-snug text-[#6b6560]">{item.category}</p>
        <p className="my-7 font-display text-4xl tracking-wide sm:text-5xl">{item.name}</p>
        <p className="text-[13px] uppercase tracking-[0.15em] text-[#8a827b]">{links}</p>
        <div
          className="mt-6 aspect-[4/3] w-full rounded-sm"
          style={{ background: bgStyles[i % bgStyles.length] }}
        />
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
    const idx = Math.min(n, Math.max(1, Math.floor(v * n) + 1));
    setIndex(idx);
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

        {/* Нижние подписи: (портфолио) слева, счётчик справа */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto flex w-[92%] max-w-content items-center justify-between text-white/90">
          <span className="text-lg tracking-wide sm:text-2xl">({t('label')})</span>
          <span className="text-lg tracking-wide sm:text-2xl">
            ({index})
          </span>
        </div>

        {/* Вступительный текст (как на референсе, у нижнего края) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-20 mx-auto w-[92%] max-w-content">
          <p className="max-w-xl text-sm leading-relaxed text-white/70">{t('intro')}</p>
        </div>
      </div>
    </section>
  );
}
