'use client';

import { useTranslations } from 'next-intl';
import Section from '../Section';
import { Reveal, Stagger, StaggerItem } from '../Reveal';

export default function About() {
  const t = useTranslations('about');
  const stats = [
    { value: '5+', label: t('stats.years') },
    { value: '15+', label: t('stats.masters') },
    { value: '2000+', label: t('stats.events') },
  ];

  return (
    <Section id="about" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>
        </Reveal>
        <Stagger className="grid grid-cols-3 gap-6 self-center" gap={0.12}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="font-display text-4xl text-accent sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
