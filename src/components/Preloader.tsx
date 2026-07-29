'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Экран загрузки при открытии сайта (в духе референса):
// кремовый фон, serif-логотип, тонкая линия, плавное исчезновение.
export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduce ? 300 : 1500;
    const timer = setTimeout(() => setShow(false), delay);
    // блокируем скролл, пока показывается заставка
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = '';
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center">
            <motion.p
              className="font-display text-3xl tracking-[0.12em] sm:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              A&apos;LIS <span className="text-accent">BEAUTY</span>
            </motion.p>
            <motion.div
              className="mx-auto mt-5 h-px bg-accent"
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
