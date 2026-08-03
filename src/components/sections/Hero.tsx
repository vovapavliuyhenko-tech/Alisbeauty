'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

// Фон героя: одно фото зеркалом слева/справа (ч-б, редакционно), как на референсе.
// Пока реальные ролики не добавлены — светлый нейтральный градиент-плейсхолдер.
function MirrorMedia() {
  return (
    <div className="absolute inset-0 grid grid-cols-2">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#dad7d2] to-[#c3bfb9]">
        <video className="h-full w-full object-cover grayscale" autoPlay muted loop playsInline preload="auto">
          <source src="/videos/hero-left.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative overflow-hidden bg-gradient-to-b from-[#dad7d2] to-[#c3bfb9]">
        {/* Зеркальная половина */}
        <video className="h-full w-full -scale-x-100 object-cover grayscale" autoPlay muted loop playsInline preload="auto">
          <source src="/videos/hero-right.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden">
      <MirrorMedia />

      {/* Центральная белая карточка */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="relative z-10 flex aspect-[337/443] max-h-[80vh] w-[88%] max-w-[338px] flex-col justify-between bg-white px-7 py-9 text-center text-[#17191a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
      >
        {/* Верхний тэглайн */}
        <p className="mx-auto max-w-[17rem] text-[13px] leading-snug text-[#17191a]">
          {t('cardTop')}
        </p>

        {/* Крупное брендовое имя — Didone serif */}
        <div className="flex flex-1 items-center justify-center">
          <span className="font-display text-[52px] font-500 leading-none tracking-tight text-[#17191a] sm:text-[58px]">
            A&apos;LIS
          </span>
        </div>

        {/* Нижний подзаголовок */}
        <p className="mx-auto max-w-[18rem] text-[13px] leading-snug text-[#4a4a4a]">
          {t('cardSub')}
        </p>
      </motion.div>
    </section>
  );
}
