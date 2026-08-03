'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { openBookModal } from '@/components/BookModal';
import { site } from '@/config/site';
import { trackGoal } from '@/lib/metrika';

// Фоновое видео/градиент под тёмной вуалью — как крупный визуал героя на референсе.
function HeroMedia() {
  return (
    <div className="absolute inset-0">
      <div className="grid h-full w-full grid-cols-2">
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#2c2622,#3a2f28)' }}>
          <video className="h-full w-full object-cover opacity-70" autoPlay muted loop playsInline preload="auto">
            <source src="/videos/hero-left.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#3a2f28,#221d1a)' }}>
          <video className="h-full w-full object-cover opacity-70" autoPlay muted loop playsInline preload="auto">
            <source src="/videos/hero-right.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      {/* Тёмная вуаль в цвет фона — визуал утоплен, читается крупная типографика */}
      <div className="absolute inset-0 bg-bg/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-svh w-full flex-col justify-end overflow-hidden pb-[6vh] pt-28">
      <HeroMedia />

      <div className="relative mx-auto w-[94%] max-w-content">
        {/* Верхняя строка-эйброу */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-muted"
        >
          <span className="h-px w-10 bg-accent" />
          {t('eyebrow')} · Новороссийск
        </motion.div>

        {/* Крупный конденсед-заголовок с serif-акцентом */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="max-w-[16ch] font-display text-[13vw] font-500 uppercase leading-[0.92] tracking-[-0.01em] text-text sm:text-[12vw] lg:text-[130px]"
        >
          {t('title')}
        </motion.h1>

        {/* Описание */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-7 max-w-[48ch] text-[15px] leading-relaxed text-muted sm:text-[16px]"
        >
          {t('subtitle')}
        </motion.p>

        {/* Ряд действий */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 text-[14px]"
        >
          <a
            href="#price"
            onClick={() => trackGoal('hero_services')}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-medium text-bg transition hover:bg-accent-2"
          >
            {t('ctaServices')}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <button
            onClick={() => {
              trackGoal('book_open');
              openBookModal();
            }}
            className="rounded-full border border-line px-8 py-3.5 text-text transition hover:border-accent hover:text-accent"
          >
            {t('cta')}
          </button>
          <div className="ml-1 flex items-center gap-3 text-muted">
            <a href={site.instagramSalon} target="_blank" rel="noopener noreferrer" className="transition hover:text-text">inst*</a>
            <span className="text-muted/40">/</span>
            <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="transition hover:text-text">tg</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
