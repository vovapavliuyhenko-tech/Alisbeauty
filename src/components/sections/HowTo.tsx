'use client';

import { useTranslations } from 'next-intl';
import Section from '../Section';
import { Stagger, StaggerItem } from '../Reveal';

interface Step {
  num: string;
  title: string;
  text: string;
}

export default function HowTo() {
  const t = useTranslations('howto');
  const steps = t.raw('steps') as Step[];

  return (
    <Section id="howto" eyebrow={t('eyebrow')} title={t('title')}>
      <Stagger className="grid gap-8 md:grid-cols-3" gap={0.15}>
        {steps.map((step, i) => (
          <StaggerItem key={step.num} className="relative">
            <div className="flex items-center gap-4">
              <span className="font-display text-6xl text-accent">{step.num}</span>
              {i < steps.length - 1 && (
                <span className="hidden h-px flex-1 bg-line md:block" />
              )}
            </div>
            <h3 className="mt-4 text-2xl">{step.title}</h3>
            <p className="mt-3 text-muted">{step.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
