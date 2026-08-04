'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

// Фон героя: одно фото зеркалом слева/справа (ч-б, редакционно), как на референсе.
// Пока реальные фото не добавлены — светлый нейтральный градиент-плейсхолдер.
function MirrorMedia() {
  return (
    <div className="absolute inset-0 grid grid-cols-2">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#dedbd6] to-[#b9b5af]">
        <video className="h-full w-full object-cover grayscale" autoPlay muted loop playsInline preload="auto">
          <source src="/videos/hero-left.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative overflow-hidden bg-gradient-to-b from-[#dedbd6] to-[#b9b5af]">
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
    // Обычный блок в один экран, как артборд референса. Никакой scroll-анимации:
    // при обычном скролле карточка уезжает вверх, а низ затемнён — уход в темноту.
    <section className="relative h-svh min-h-[620px] w-full overflow-hidden bg-bg">
      {/* Два ч-б фото на фоне */}
      <MirrorMedia />

      {/* Затемнение низа — фото плавно уходят в тёмный фон, стык с секцией «о салоне» бесшовный */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-b from-transparent to-bg" />

      {/* Центральная белая карточка */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="flex aspect-[337/443] max-h-[76svh] w-[90%] max-w-[380px] flex-col justify-between bg-white px-8 py-10 text-center text-[#17191a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
        >
          {/* Верхний тэглайн */}
          <p className="mx-auto max-w-[18rem] text-[14px] leading-snug tracking-tight text-[#17191a]">
            {t('cardTop')}
          </p>

          {/* Крупное брендовое имя — чистый гротеск (как «resayme») */}
          <div className="flex flex-1 items-center justify-center">
            <span className="text-[52px] font-semibold leading-none tracking-[-0.03em] text-[#17191a] sm:text-[58px]">
              a&apos;lis
            </span>
          </div>

          {/* Нижний подзаголовок */}
          <p className="mx-auto max-w-[19rem] text-[14px] leading-snug tracking-tight text-[#4a4a4a]">
            {t('cardSub')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
