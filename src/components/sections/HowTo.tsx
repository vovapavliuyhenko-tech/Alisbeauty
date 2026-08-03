'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Section from '../Section';

interface Step {
  num: string;
  title: string;
  text: string;
}

export default function HowTo() {
  const t = useTranslations('howto');
  const steps = t.raw('steps') as Step[];
  const [open, setOpen] = useState<number>(0);

  return (
    <Section id="howto" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="border-t border-line">
        {steps.map((step, i) => {
          const isOpen = open === i;
          return (
            <div key={step.num} className="border-b border-line">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center gap-6 py-7 text-left sm:gap-10 sm:py-8"
                aria-expanded={isOpen}
              >
                <span
                  className={`w-12 shrink-0 text-[15px] tabular-nums transition-colors ${
                    isOpen ? 'text-accent' : 'text-muted'
                  }`}
                >
                  ({step.num})
                </span>
                <span
                  className={`flex-1 text-lg tracking-tight transition-colors sm:text-xl ${
                    isOpen ? 'text-text' : 'text-text/85 group-hover:text-text'
                  }`}
                >
                  {step.title}
                </span>
                <Plus
                  size={24}
                  strokeWidth={1.25}
                  className={`shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-45 text-accent' : 'text-muted group-hover:text-text'
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-8 pl-[4.5rem] text-muted sm:pl-[5.5rem] sm:text-[17px]">
                      {step.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
