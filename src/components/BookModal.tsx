'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { site } from '@/config/site';
import { trackGoal } from '@/lib/metrika';

// Открытие модалки из любого места: window.dispatchEvent(new Event('open-book'))
export function openBookModal() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('open-book'));
}

export default function BookModal() {
  const t = useTranslations('book');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-book', handler);
    return () => window.removeEventListener('open-book', handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-8"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-muted transition hover:text-text"
              aria-label={t('close')}
            >
              <X size={22} />
            </button>
            <h3 className="text-2xl">{t('title')}</h3>
            <p className="mt-2 text-sm text-muted">{t('subtitle')}</p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('book_telegram')}
                className="flex items-center justify-center gap-3 rounded-full bg-accent py-4 font-medium text-bg transition hover:bg-accent-2"
              >
                <Send size={20} /> {t('telegram')}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('book_whatsapp')}
                className="flex items-center justify-center gap-3 rounded-full border border-line py-4 font-medium transition hover:border-accent hover:text-accent"
              >
                <MessageCircle size={20} /> {t('whatsapp')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
