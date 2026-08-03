'use client';

import { useTranslations } from 'next-intl';
import Section from '../Section';
import { Reveal, Stagger, StaggerItem } from '../Reveal';
import { site } from '@/config/site';

export default function About() {
  const t = useTranslations('about');
  const stats = [
    { value: '5+', label: t('stats.years') },
    { value: '15+', label: t('stats.masters') },
    { value: '2000+', label: t('stats.events') },
  ];

  return (
    <Section id="about" eyebrow={t('eyebrow')}>
      <div className="relative">
        {/* Вертикальные соц-ссылки у правого края — как «behance / dprofile / inst*» */}
        <div className="pointer-events-none absolute -right-1 top-0 hidden h-full lg:block">
          <div className="sticky top-1/3 flex rotate-180 items-center gap-4 text-[13px] tracking-wide text-muted [writing-mode:vertical-rl]">
            <a href={site.instagramSalon} target="_blank" rel="noopener noreferrer" className="pointer-events-auto transition hover:text-text">inst*</a>
            <span className="text-muted/40">/</span>
            <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="pointer-events-auto transition hover:text-text">tg</a>
          </div>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Левая колонка: текст + статистика */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="max-w-xl space-y-6 text-[16px] leading-relaxed text-muted sm:text-[17px]">
                <p>{t('p1')}</p>
                <p>{t('p2')}</p>
              </div>
            </Reveal>
            <Stagger className="mt-12 grid grid-cols-3 gap-6" gap={0.12}>
              {stats.map((s) => (
                <StaggerItem key={s.label}>
                  <p className="font-display text-4xl text-accent sm:text-5xl">{s.value}</p>
                  <p className="mt-2 text-sm text-muted">{s.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Правая колонка: портрет-плейсхолдер (замените фото основателя) */}
          <Reveal delay={0.1} className="order-1 lg:order-2 lg:pr-10">
            <div
              className="aspect-[3/4] w-full bg-gradient-to-b from-[#3a3d3f] to-[#1e2021] grayscale"
              style={{
                backgroundImage:
                  "linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.35)), url('/images/founder.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-label={t('title')}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
