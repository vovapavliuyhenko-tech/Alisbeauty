'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { trackGoal } from '@/lib/metrika';

// Плейсхолдер-градиенты под видео (пока не добавлены реальные ролики).
// Положите файлы в public/videos/hero-left.mp4 и public/videos/hero-right.mp4 —
// они подхватятся автоматически, а до этого показывается тёплый градиент.
function VideoHalf({ src, gradient }: { src: string; gradient: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: gradient }}>
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Два видео на весь экран: слева и справа */}
      <div className="absolute inset-0 grid grid-cols-2">
        <VideoHalf src="/videos/hero-left.mp4" gradient="linear-gradient(135deg,#6e5a48,#2c2622)" />
        <VideoHalf src="/videos/hero-right.mp4" gradient="linear-gradient(135deg,#8a6f5c,#3a2f28)" />
      </div>

      {/* Затемнение для читабельности текста */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Контент поверх видео */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full max-w-3xl text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>
          <motion.a
            href="#price"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            onClick={() => trackGoal('hero_services')}
            className="mt-10 inline-block rounded-full bg-accent px-10 py-4 font-medium text-white transition hover:bg-accent-2"
          >
            {t('ctaServices')}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
