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

// Контент карточки — плавно проявляется, когда позади центрируется его фон.
// Рамка карточки при этом НЕ двигается: карточки «соединяются».
function CardContent({
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
  const c = n > 1 ? i / (n - 1) : 0; // центр проекта i по прогрессу
  const step = n > 1 ? 1 / (n - 1) : 1;
  const e = step * 0.16; // короткое перекрёстное затухание у середины перехода
  const midL = c - step / 2; // граница слева
  const midR = c + step / 2; // граница справа

  // Контент держится сплошным на своём отрезке, быстро крестится у границ.
  const input =
    i === 0
      ? [midR - e, midR + e]
      : i === n - 1
        ? [midL - e, midL + e]
        : [midL - e, midL + e, midR - e, midR + e];
  const output = i === 0 ? [1, 0] : i === n - 1 ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, input, output);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
      <p className="mx-auto max-w-[240px] text-[13px] leading-snug text-[#6b6560]">{item.category}</p>
      <p className="mt-6 font-display text-4xl tracking-wide sm:text-5xl">{item.name}</p>
      <p className="mt-1 text-sm text-[#8a827b]">{item.subtitle}</p>
      <p className="mt-5 text-[13px] uppercase tracking-[0.15em] text-[#8a827b]">{links}</p>
      <div className="mt-6 aspect-[4/3] w-full max-w-[300px]" style={{ background: cardImg[i % cardImg.length] }} />
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
    setIndex(Math.min(n, Math.max(1, Math.round(v * (n - 1)) + 1)));
  });

  // Непрерывная прокрутка фона: колонка из n экранов едет вверх.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0vh', `-${(n - 1) * 100}vh`]);

  return (
    <section id="works" ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0e0c0b] text-white">
        {/* Непрерывный фоновый коллаж (двигается только он) */}
        <motion.div style={{ y: bgY }} className="absolute inset-x-0 top-0">
          {items.map((_, i) => (
            <div key={i} className="h-screen w-full" style={{ background: bgStyles[i % bgStyles.length] }} />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-black/25" />

        {/* Неподвижная карточка по центру — меняется только её содержимое */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="relative h-[540px] w-full max-w-[380px] bg-white text-[#1a1512] shadow-2xl">
            {items.map((item, i) => (
              <CardContent key={i} progress={scrollYProgress} i={i} n={n} item={item} links={t('links')} />
            ))}
          </div>
        </div>

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
