'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Scroll-эффект: сверху заголовок крупнее и «растянут» (широкий трекинг),
  // при скролле вниз плавно садится в нормальный размер по центру.
  const { scrollY } = useScroll();
  const titleScale = useTransform(scrollY, [0, 320], [1.4, 1]);
  const titleTracking = useTransform(scrollY, [0, 320], ['0.08em', '0em']);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ scale: titleScale, letterSpacing: titleTracking }}
            className="mx-auto max-w-[700px] text-[24px] leading-[1.15] will-change-transform sm:text-[32px] lg:text-[40px]"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mx-auto mt-5 max-w-[460px] text-[14px] leading-relaxed text-white/85 sm:text-[16px]"
          >
            {t('subtitle')}
          </motion.p>
          <motion.a
            href="#price"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            onClick={() => trackGoal('hero_services')}
            className="mt-8 inline-block rounded-full bg-accent px-9 py-3.5 text-[15px] font-medium text-white transition hover:bg-accent-2"
          >
            {t('ctaServices')}
          </motion.a>
        </div>
      </div>

      {/* Большой логотип снизу: буквы кремового цвета сливаются с секцией ниже,
          сквозь просветы букв видно видео — как на референсе O'CARE.
          Нижняя треть букв «утоплена» в кремовую полосу — они выныривают снизу. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center">
        <span className="select-none font-display leading-[0.7] text-bg tracking-tight text-[clamp(52px,10vw,150px)]">
          A&apos;LIS
        </span>
        {/* Кремовая полоса перекрывает низ букв — они «выныривают» из секции */}
        <div className="-mt-[0.28em] h-[7vh] w-full bg-bg text-[clamp(52px,10vw,150px)]" />
      </div>
    </section>
  );
}
