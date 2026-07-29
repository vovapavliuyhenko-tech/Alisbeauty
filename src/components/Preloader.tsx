'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FULL = "A'LIS BEAUTY";

// Экран загрузки: текст логотипа печатается по буквам на линии (как ввод в строке),
// затем плавно исчезает. Кремовый фон в стиле референса.
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';

    if (reduce) {
      setTyped(FULL);
      const t = setTimeout(() => setShow(false), 400);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }

    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setTyped(FULL.slice(0, i));
      if (i >= FULL.length) clearInterval(typer);
    }, 110);

    const hide = setTimeout(() => setShow(false), FULL.length * 110 + 700);

    return () => {
      clearInterval(typer);
      clearTimeout(hide);
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
          <div className="flex items-end justify-center border-b border-text/40 pb-2">
            <span className="font-display text-2xl tracking-[0.12em] sm:text-4xl">{typed}</span>
            <motion.span
              className="mb-1 ml-1 inline-block h-6 w-px bg-accent sm:h-8"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
