'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Send, MessageCircle } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { openBookModal } from './BookModal';
import { navItems, site } from '@/config/site';
import { trackGoal } from '@/lib/metrika';

// Пункты, показываемые инлайн в шапке на десктопе (как ряд ссылок через «/» на референсе)
const inlineNav = ['about', 'concierge', 'gallery', 'price', 'contacts'] as const;

export default function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-bg/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-[94%] max-w-content items-center justify-between">
          {/* Бренд слева */}
          <a
            href="#top"
            className="font-display text-[17px] font-600 uppercase tracking-[0.14em] text-text"
          >
            A&apos;LIS <span className="text-accent">BEAUTY</span>
          </a>

          {/* Инлайн-навигация через «/» — только десктоп */}
          <nav className="hidden items-center gap-2 text-[13px] lg:flex">
            {inlineNav.map((id, i) => (
              <span key={id} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted/50">/</span>}
                <a
                  href={`#${id}`}
                  className={`lowercase tracking-wide transition ${
                    active === id ? 'text-accent' : 'text-muted hover:text-text'
                  }`}
                >
                  {t(id)}
                </a>
              </span>
            ))}
          </nav>

          {/* Справа: язык + записаться + бургер */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:block">
              <LocaleSwitcher />
            </div>
            <button
              onClick={book}
              className="hidden text-[13px] lowercase tracking-wide text-accent transition hover:text-accent-2 sm:inline"
            >
              {t('book')}
            </button>
            <button
              onClick={() => setMenu(true)}
              className="flex items-center gap-2 text-text transition hover:text-accent"
              aria-label={t('menu')}
            >
              <span className="hidden text-[12px] uppercase tracking-[0.2em] sm:inline lg:hidden">
                {t('menu')}
              </span>
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Полноэкранное меню по центру */}
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
              <div className="flex h-16 items-center justify-between">
                <span className="font-display text-[17px] uppercase tracking-[0.14em] text-text">
                  A&apos;LIS <span className="text-accent">BEAUTY</span>
                </span>
                <button onClick={() => setMenu(false)} aria-label="close" className="text-text transition hover:text-accent">
                  <X size={30} strokeWidth={1.5} />
                </button>
              </div>

              <motion.nav
                className="flex flex-1 flex-col items-center justify-center gap-5 sm:gap-6"
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
                    className={`font-display text-3xl uppercase tracking-[0.06em] transition sm:text-4xl ${
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
                  <a href={`tel:${site.whatsappNumber.replace(/\s/g, '')}`} className="text-[12px] tracking-wide transition hover:text-accent">{site.whatsappNumber}</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
