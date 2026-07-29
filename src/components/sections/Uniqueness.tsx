'use client';

import { useTranslations } from 'next-intl';
import Section from '../Section';
import { Stagger, StaggerItem } from '../Reveal';

interface Item {
  num: string;
  title: string;
  text: string;
}

export default function Uniqueness() {
  const t = useTranslations('uniqueness');
  const items = t.raw('items') as Item[];

  return (
    <Section id="uniqueness" alt eyebrow={t('eyebrow')} title={t('title')}>
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
        {items.map((item) => (
          <StaggerItem
            key={item.num}
            className="group rounded-2xl border border-line bg-bg/40 p-8 transition hover:border-accent"
          >
            <span className="font-display text-5xl text-accent/40 transition group-hover:text-accent">
              {item.num}
            </span>
            <h3 className="mt-4 text-2xl">{item.title}</h3>
            <p className="mt-3 text-muted">{item.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
