'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '../Reveal';
import AnimatedTitle from '../AnimatedTitle';

export default function FullLook() {
  const t = useTranslations('fullLook');

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background:radial-gradient(50%_60%_at_50%_50%,rgba(217,121,94,0.15),transparent)]" />
      <div className="mx-auto w-[92%] max-w-3xl text-center">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">{t('eyebrow')}</p>
        </Reveal>
        <AnimatedTitle text={t('title')} className="text-4xl sm:text-5xl lg:text-6xl" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{t('text')}</p>
        </Reveal>
      </div>
    </section>
  );
}
