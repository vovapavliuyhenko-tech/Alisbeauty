'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Send, MessageCircle } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { openBookModal } from './BookModal';
import { navItems, site } from '@/config/site';
import { trackGoal } from '@/lib/metrika';

// Инлайн-навигация в шапке (правый верх, две строки через «/») — как на референсе
const inlineNav = ['about', 'concierge', 'gallery', 'price', 'form', 'contacts'] as const;

export default function Header() {
  const t = useTranslations('nav');
  const [overHero, setOverHero] = useState(true);
  const [active, setActive] = useState<string>('');
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setOverHero(window.scrollY < window.innerHeight * 0.82);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    if (menu) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menu]);

  const book = () => {
    trackGoal('book_open');
    openBookModal();
  };

  // Цвет текста шапки: чёрный над светлым героем, белый над тёмными секциями
  const fg = overHero ? 'text-[#17191a]' : 'text-white';
  const fgMuted = overHero ? 'text-[#17191a]/60' : 'text-white/55';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex w-[94%] max-w-content items-start justify-between pt-6">
          {/* Бренд слева */}
          <a
            href="#top"
            className={`font-display text-[22px] leading-none tracking-tight transition-colors ${fg}`}
          >
            a&apos;lis
          </a>

          {/* Инлайн-навигация справа (две строки, через «/») — десктоп */}
          <nav className="hidden max-w-[420px] flex-wrap items-center justify-end gap-x-2 gap-y-1 text-right text-[14px] lg:flex">
            {inlineNav.map((id, i) => (
              <span key={id} className="flex items-center gap-2">
                {i > 0 && <span className={fgMuted}>/</span>}
                <a
                  href={`#${id}`}
                  className={`lowercase transition-colors ${
                    active === id ? 'text-accent' : `${fg} hover:text-accent`
                  }`}
                >
                  {t(id)}
                </a>
              </span>
            ))}
          </nav>

          {/* Бургер — планшет/мобайл */}
          <button
            onClick={() => setMenu(true)}
            className={`transition-colors lg:hidden ${fg} hover:text-accent`}
            aria-label={t('menu')}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Полноэкранное меню */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[80] bg-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex h-full w-[92%] max-w-content flex-col">
              <div className="flex items-start justify-between pt-6">
                <span className="font-display text-[22px] leading-none tracking-tight text-text">a&apos;lis</span>
                <button onClick={() => setMenu(false)} aria-label="close" className="text-text transition hover:text-accent">
                  <X size={28} strokeWidth={1.5} />
                </button>
              </div>

              <motion.nav
                className="flex flex-1 flex-col items-center justify-center gap-5"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              >
                {navItems.map((id) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setMenu(false)}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className={`text-2xl lowercase transition ${
                      active === id ? 'text-accent' : 'text-text hover:text-accent'
                    }`}
                  >
                    {t(id)}
                  </motion.a>
                ))}
              </motion.nav>

              <div className="flex flex-col items-center gap-6 pb-12">
                <LocaleSwitcher />
                <button
                  onClick={() => {
                    setMenu(false);
                    book();
                  }}
                  className="rounded-full bg-accent px-10 py-3 text-[12px] uppercase tracking-[0.2em] text-bg transition hover:bg-accent-2"
                >
                  {t('book')}
                </button>
                <div className="flex items-center gap-6 text-muted">
                  <a href={site.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="transition hover:text-accent"><Send size={20} /></a>
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition hover:text-accent"><MessageCircle size={20} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
