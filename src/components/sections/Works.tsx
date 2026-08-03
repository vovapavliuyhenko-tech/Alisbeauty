'use client';

import { useTranslations } from 'next-intl';
import Section from '../Section';
import { Stagger, StaggerItem } from '../Reveal';

// Превью работ, ведёт в галерею.
export default function Works() {
  const t = useTranslations('works');

  return (
    <Section id="works" eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4" gap={0.08}>
        {[0, 1, 2, 3].map((i) => (
          <StaggerItem key={i}>
            <div className="aspect-[3/4] border border-line bg-gradient-to-br from-accent/20 to-surface" />
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-8">
        <a href="#gallery" className="inline-block rounded-full border border-accent px-8 py-3 text-accent transition hover:bg-accent hover:text-bg">
          {t('cta')}
        </a>
      </div>
    </Section>
  );
}
