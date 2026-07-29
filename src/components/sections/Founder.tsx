'use client';

import { useTranslations } from 'next-intl';
import Section from '../Section';
import { Reveal } from '../Reveal';

export default function Founder() {
  const t = useTranslations('founder');

  return (
    <Section id="founder" alt eyebrow={t('eyebrow')} title={t('name')}>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          {/* Плейсхолдер под фото основателя */}
          <div className="aspect-[3/4] w-full rounded-2xl border border-line bg-gradient-to-br from-accent/30 to-surface" />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">{t('role')}</p>
            <blockquote className="mt-6 font-display text-2xl leading-snug sm:text-3xl">
              «{t('quote')}»
            </blockquote>
            <p className="mt-6 text-muted">— {t('name')}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
