'use client';

import { useTranslations } from 'next-intl';
import Section from '../Section';
import { Reveal } from '../Reveal';

interface Row {
  name: string;
  price: string;
}

function PriceTable({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <Reveal>
      <div className="h-full border border-line bg-surface p-8 transition-colors hover:border-accent/60">
        <h3 className="mb-6 text-xl font-medium tracking-tight text-accent">{title}</h3>
        <ul>
          {rows.map((row, i) => (
            <li
              key={i}
              className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 last:border-0"
            >
              <span className="text-text/85">{row.name}</span>
              <span className="whitespace-nowrap text-[15px] font-medium tracking-tight text-accent-2">{row.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Price() {
  const t = useTranslations('price');

  return (
    <Section id="price" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:row-span-2">
          <PriceTable title={t('services.title')} rows={t.raw('services.rows') as Row[]} />
        </div>
        <PriceTable title={t('travel.title')} rows={t.raw('travel.rows') as Row[]} />
        <PriceTable title={t('support.title')} rows={t.raw('support.rows') as Row[]} />
      </div>
      <p className="mt-6 text-sm text-muted">{t('note')}</p>
    </Section>
  );
}
