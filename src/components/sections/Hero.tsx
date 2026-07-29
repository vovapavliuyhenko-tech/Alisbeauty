'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, Sparkles, Scissors } from 'lucide-react';
import { openBookModal } from '../BookModal';
import { trackGoal } from '@/lib/metrika';

export default function Hero() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Параллакс-фон */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--surface-alt)] via-bg to-bg"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_50%_at_50%_0%,rgba(217,121,94,0.12),transparent)]" />

      <motion.div style={{ opacity }} className="mx-auto w-[92%] max-w-content pt-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-accent"
        >
          {t('eyebrow')}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          {t('title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl text-muted"
        >
          {t('subtitle')}
        </motion.p>

        {/* Две карточки выбора направления */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2"
        >
          <a
            href="#about"
            className="group rounded-2xl border border-line bg-surface/60 p-6 text-left backdrop-blur transition hover:border-accent"
          >
            <Scissors className="mb-3 text-accent" size={24} />
            <p className="font-display text-2xl">{t('salon')}</p>
            <p className="mt-1 text-sm text-muted">{t('salonDesc')}</p>
          </a>
          <a
            href="#concierge"
            className="group rounded-2xl border border-line bg-surface/60 p-6 text-left backdrop-blur transition hover:border-accent"
          >
            <Sparkles className="mb-3 text-accent" size={24} />
            <p className="font-display text-2xl">{t('conciergeCard')}</p>
            <p className="mt-1 text-sm text-muted">{t('conciergeDesc')}</p>
          </a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          onClick={() => {
            trackGoal('book_open');
            openBookModal();
          }}
          className="mt-10 rounded-full bg-accent px-8 py-3.5 font-medium text-bg transition hover:bg-accent-2"
        >
          {t('cta')}
        </motion.button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}
