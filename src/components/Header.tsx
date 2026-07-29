'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { openBookModal } from './BookModal';
import { navItems, site } from '@/config/site';
import { trackGoal } from '@/lib/metrika';

// Меню разбито на две группы вокруг центрального логотипа (как на референсе).
const leftNav = navItems.slice(0, 4); // about, concierge, uniqueness, gallery
const rightNav = navItems.slice(4); // reviews, price, form, contacts

export default function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [drawer, setDrawer] = useState(false);

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

  const book = () => {
    trackGoal('book_open');
    openBookModal();
  };

  const linkCls = (id: string) =>
    `text-[11px] uppercase tracking-[0.16em] transition ${
      active === id ? 'text-accent' : 'text-text/75 hover:text-accent'
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-bg/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        {/* Верхняя тонкая строка: телефон + язык + запись */}
        <div className="hidden border-b border-line/60 lg:block">
          <div className="mx-auto flex h-9 w-[94%] max-w-content items-center justify-between text-[11px] tracking-wide text-muted">
            <a href={`tel:${site.whatsappNumber.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-text">
              <span>🇷🇺</span> {site.whatsappNumber}
            </a>
            <div className="flex items-center gap-5">
              <LocaleSwitcher />
              <button onClick={book} className="uppercase tracking-[0.16em] text-accent hover:text-accent-2">
                {t('book')}
              </button>
            </div>
          </div>
        </div>

        {/* Основной бар с округлой рамкой */}
        <div className="mx-auto w-[94%] max-w-content py-3">
          <div
            className={`relative flex items-center justify-between rounded-full border border-line px-6 lg:px-8 ${
              scrolled ? 'bg-surface/70' : 'bg-surface/40'
            } h-14 backdrop-blur-sm`}
          >
            {/* Левое меню */}
            <nav className="hidden flex-1 items-center gap-6 lg:flex">
              {leftNav.map((id) => (
                <a key={id} href={`#${id}`} className={linkCls(id)}>
                  {t(id)}
                </a>
              ))}
            </nav>

            {/* Центральный логотип */}
            <a
              href="#top"
              className="font-display text-xl tracking-[0.08em] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
            >
              A&apos;LIS <span className="text-accent">BEAUTY</span>
            </a>

            {/* Правое меню */}
            <nav className="hidden flex-1 items-center justify-end gap-6 lg:flex">
              {rightNav.map((id) => (
                <a key={id} href={`#${id}`} className={linkCls(id)}>
                  {t(id)}
                </a>
              ))}
            </nav>

            {/* Мобайл: бургер */}
            <button className="ml-auto lg:hidden" onClick={() => setDrawer(true)} aria-label="menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильный drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col border-l border-line bg-bg p-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="mb-8 self-end text-muted" onClick={() => setDrawer(false)} aria-label="close">
                <X size={26} />
              </button>
              <nav className="flex flex-col gap-5">
                {navItems.map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setDrawer(false)}
                    className="text-sm uppercase tracking-[0.16em] text-text/85 transition hover:text-accent"
                  >
                    {t(id)}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-5 pt-8">
                <LocaleSwitcher />
                <button
                  onClick={() => {
                    setDrawer(false);
                    book();
                  }}
                  className="rounded-full bg-accent px-6 py-3 text-sm uppercase tracking-[0.16em] text-bg"
                >
                  {t('book')}
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
