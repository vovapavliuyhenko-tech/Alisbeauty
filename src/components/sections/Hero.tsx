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
  // Короткий «ход»: карточка едет вниз до полного исчезновения в темноте
  const cardY = useTransform(scrollY, [0, 330], [0, 580]);
  const darkOpacity = useTransform(scrollY, [0, 130, 330], [0, 0.15, 1]);

  return (
    // Секция чуть длиннее экрана — короткий «ход» скролла
    <section className="relative h-[150vh] w-full bg-bg">
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
            className="flex aspect-[337/443] max-h-[82svh] w-[90%] max-w-[380px] flex-col justify-between bg-white px-8 py-10 text-center text-[#17191a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
          >
            {/* Верхний тэглайн */}
            <p className="mx-auto max-w-[18rem] text-[14px] leading-snug tracking-tight text-[#17191a]">
              {t('cardTop')}
            </p>

            {/* Крупное брендовое имя — чистый гротеск, чёткий (как «resayme») */}
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

        {/* Градиентное затемнение снизу — поднимается при скролле, поглощает карточку */}
        <motion.div
          style={{ opacity: darkOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-bg to-bg"
        />
      </div>
    </section>
  );
}
