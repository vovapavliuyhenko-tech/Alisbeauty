'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { openBookModal } from './BookModal';
import { navItems } from '@/config/site';
import { trackGoal } from '@/lib/metrika';

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

  // scroll-spy
  useEffect(() => {
    const sections = navItems
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const book = () => {
    trackGoal('book_open');
    openBookModal();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 w-[92%] max-w-content items-center justify-between">
          <a href="#top" className="font-display text-xl tracking-wide sm:text-2xl">
            A&apos;LIS <span className="text-accent">BEAUTY</span>
          </a>

          {/* Десктоп-меню */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-sm transition ${
                  active === id ? 'text-accent' : 'text-text/80 hover:text-accent'
                }`}
              >
                {t(id)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <LocaleSwitcher />
            <button
              onClick={book}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-2"
            >
              {t('book')}
            </button>
          </div>

          {/* Мобайл: бургер */}
          <button
            className="lg:hidden"
            onClick={() => setDrawer(true)}
            aria-label={t('book')}
          >
            <Menu size={26} />
          </button>
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
            <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[80%] max-w-xs flex-col border-l border-line bg-surface p-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="mb-8 self-end text-muted"
                onClick={() => setDrawer(false)}
                aria-label="close"
              >
                <X size={26} />
              </button>
              <nav className="flex flex-col gap-5">
                {navItems.map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setDrawer(false)}
                    className="text-lg text-text/90 transition hover:text-accent"
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
                  className="rounded-full bg-accent px-6 py-3 font-medium text-bg"
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
