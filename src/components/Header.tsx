'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Send, MessageCircle } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { openBookModal } from './BookModal';
import { navItems, site } from '@/config/site';
import { trackGoal } from '@/lib/metrika';

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
          scrolled ? 'bg-bg/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        {/* Верхняя тонкая строка */}
        <div className="hidden border-b border-line/60 lg:block">
          <div className="mx-auto flex h-9 w-[94%] max-w-content items-center justify-between text-[11px] tracking-wide text-muted">
            <a href={`tel:${site.whatsappNumber.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-text">
              <span>🇷🇺</span> {site.whatsappNumber}
            </a>
            <LocaleSwitcher />
          </div>
        </div>

        {/* Основной бар-пилюля */}
        <div className="mx-auto w-[94%] max-w-content py-3">
          <div
            className={`relative flex h-14 items-center justify-between rounded-full border border-line px-5 sm:px-7 ${
              scrolled ? 'bg-surface/70' : 'bg-surface/40'
            } backdrop-blur-sm`}
          >
            {/* Бургер + МЕНЮ (на всех размерах) */}
            <button
              onClick={() => setMenu(true)}
              className="flex items-center gap-3 text-text transition hover:text-accent"
              aria-label={t('menu')}
            >
              <Menu size={22} />
              <span className="hidden text-[12px] uppercase tracking-[0.22em] sm:inline">{t('menu')}</span>
            </button>

            {/* Центральный логотип */}
            <a
              href="#top"
              className="absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-[0.08em]"
            >
              A&apos;LIS <span className="text-accent">BEAUTY</span>
            </a>

            {/* Справа: Записаться */}
            <button
              onClick={book}
              className="text-[12px] uppercase tracking-[0.18em] text-accent transition hover:text-accent-2"
            >
              {t('book')}
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
              {/* Верх: закрыть */}
              <div className="flex h-20 items-center justify-end">
                <button onClick={() => setMenu(false)} aria-label="close" className="text-text transition hover:text-accent">
                  <X size={30} strokeWidth={1.5} />
                </button>
              </div>

              {/* Центрированные пункты */}
              <motion.nav
                className="flex flex-1 flex-col items-center justify-center gap-6 sm:gap-7"
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
                    className={`text-sm uppercase tracking-[0.22em] transition sm:text-base ${
                      active === id
                        ? 'text-accent underline decoration-1 underline-offset-8'
                        : 'text-text hover:text-accent'
                    }`}
                  >
                    {t(id)}
                  </motion.a>
                ))}
              </motion.nav>

              {/* Низ: язык, запись, контакты */}
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
