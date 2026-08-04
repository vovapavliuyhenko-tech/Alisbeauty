'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  // Scroll-эффект: карточка плавно уезжает вниз, снизу поднимается затемнение —
  // карточка как будто уходит в темноту (глобальный scrollY — надёжно обновляется).
  const { scrollY } = useScroll();
  const cardY = useTransform(scrollY, [0, 720], [0, 300]);
  const darkOpacity = useTransform(scrollY, [0, 260, 680], [0, 0.12, 1]);

  return (
    // Секция длиннее экрана — даёт «ход» скроллу, пока сцена закреплена
    <section className="relative h-[190vh] w-full bg-bg">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Два ч-б фото на фоне */}
        <MirrorMedia />

        {/* Центральная белая карточка — уезжает вниз при скролле */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease }}
            className="flex aspect-[337/443] max-h-[78svh] w-[88%] max-w-[338px] flex-col justify-between bg-white px-7 py-9 text-center text-[#17191a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
          >
            {/* Верхний тэглайн */}
            <p className="mx-auto max-w-[17rem] text-[13px] leading-snug tracking-tight text-[#17191a]">
              {t('cardTop')}
            </p>

            {/* Крупное брендовое имя — чистый гротеск, мельче и чётче (как «resayme») */}
            <div className="flex flex-1 items-center justify-center">
              <span className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-[#17191a] sm:text-[48px]">
                a&apos;lis
              </span>
            </div>

            {/* Нижний подзаголовок */}
            <p className="mx-auto max-w-[18rem] text-[13px] leading-snug tracking-tight text-[#4a4a4a]">
              {t('cardSub')}
            </p>
          </motion.div>
        </div>

        {/* Градиентное затемнение снизу — поднимается при скролле, поглощает карточку */}
        <motion.div
          style={{ opacity: darkOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-bg/55 to-bg"
        />
      </div>
    </section>
  );
}
