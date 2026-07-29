'use client';

import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Section from '../Section';

interface Review {
  name: string;
  text: string;
}

export default function Reviews() {
  const t = useTranslations('reviews');
  const items = t.raw('items') as Review[];
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' });

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <Section id="reviews" alt eyebrow={t('eyebrow')} title={t('title')}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {items.map((r, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-bg/40 p-8">
                <Quote className="text-accent" size={28} />
                <p className="mt-4 flex-1 text-lg leading-relaxed">{r.text}</p>
                <div className="mt-6">
                  <p className="font-display text-xl">{r.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{t('tag')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <button onClick={prev} aria-label="prev" className="rounded-full border border-line p-3 transition hover:border-accent hover:text-accent">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} aria-label="next" className="rounded-full border border-line p-3 transition hover:border-accent hover:text-accent">
          <ChevronRight size={20} />
        </button>
      </div>
    </Section>
  );
}
