'use client';

import { useTranslations } from 'next-intl';
import { Send, MessageCircle, Instagram, Mail, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Section from '../Section';
import { Reveal } from '../Reveal';
import { site } from '@/config/site';

export default function Contacts() {
  const t = useTranslations('contacts');

  const socials = [
    { icon: Send, label: 'Telegram', href: site.telegram, value: 'alisbeautyclub' },
    { icon: MessageCircle, label: 'WhatsApp', href: site.whatsapp, value: site.whatsappNumber },
    { icon: Instagram, label: t('salonInsta'), href: site.instagramSalon, value: site.instagramSalonHandle },
    { icon: Instagram, label: t('conciergeInsta'), href: site.instagramConcierge, value: site.instagramConciergeHandle },
    { icon: Mail, label: 'Email', href: `mailto:${site.email}`, value: site.email },
  ];

  return (
    <Section id="contacts" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <div className="mb-6 flex items-center gap-3 text-lg">
              <MapPin className="text-accent" /> {t('address')}
            </div>
            <ul className="space-y-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                    <span className="rounded-full border border-line p-3 text-accent transition group-hover:border-accent">
                      <s.icon size={18} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-muted">{s.label}</span>
                      <span className="transition group-hover:text-accent">{s.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-line pt-6 text-sm text-muted">
              <p className="mb-1 font-medium text-text">{t('requisites')}</p>
              <p>{t('ip')}</p>
              <p>{t('ogrnip')}</p>
              <p>{t('inn')}</p>
              <p className="mt-4 text-xs">{t('instagramNote')}</p>
              <Link href="/politic" className="mt-3 inline-block text-accent hover:underline">
                {t('policy')}
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-[420px] overflow-hidden rounded-2xl border border-line">
            <iframe
              src={site.mapEmbed}
              className="h-full w-full"
              loading="lazy"
              title="Новороссийск"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
