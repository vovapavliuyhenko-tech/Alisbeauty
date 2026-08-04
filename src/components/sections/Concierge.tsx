'use client';

import { useTranslations } from 'next-intl';
import Section from '../Section';
import { Reveal } from '../Reveal';
import { openBookModal } from '../BookModal';
import { trackGoal } from '@/lib/metrika';

export default function Concierge() {
  const t = useTranslations('concierge');

  return (
    <Section id="concierge" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-5 text-[15px] leading-relaxed text-muted sm:text-[16px]">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <button
              onClick={() => {
                trackGoal('concierge_cta');
                openBookModal();
              }}
              className="mt-2 rounded-full bg-accent px-8 py-3.5 font-medium text-bg transition hover:bg-accent-2"
            >
              {t('cta')}
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="aspect-[4/3] w-full border border-line bg-gradient-to-tr from-accent/25 via-[var(--surface-alt)] to-surface" />
        </Reveal>
      </div>
    </Section>
  );
}
