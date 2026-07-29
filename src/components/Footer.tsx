'use client';

import { useTranslations } from 'next-intl';
import { Send, MessageCircle, Instagram, Mail } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { site, navItems } from '@/config/site';

export default function Footer() {
  const t = useTranslations('nav');
  const tf = useTranslations('footer');
  const tc = useTranslations('contacts');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface py-16">
      <div className="mx-auto grid w-[92%] max-w-content gap-10 md:grid-cols-3">
        <div>
          <a href="#top" className="font-display text-2xl">
            A&apos;LIS <span className="text-accent">BEAUTY</span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted">{tf('tagline')}</p>
          <div className="mt-6 flex gap-4">
            <a href={site.telegram} aria-label="Telegram" target="_blank" rel="noopener noreferrer" className="text-muted transition hover:text-accent"><Send size={20} /></a>
            <a href={site.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="text-muted transition hover:text-accent"><MessageCircle size={20} /></a>
            <a href={site.instagramSalon} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-muted transition hover:text-accent"><Instagram size={20} /></a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="text-muted transition hover:text-accent"><Mail size={20} /></a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">{tf('menu')}</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted transition hover:text-text">{t(id)}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">{tc('requisites')}</p>
          <p className="text-sm text-muted">{tc('ip')}</p>
          <p className="text-sm text-muted">{tc('ogrnip')}</p>
          <p className="text-sm text-muted">{tc('inn')}</p>
          <p className="mt-2 text-sm text-muted">{tc('address')}</p>
          <Link href="/politic" className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline">
            {tc('policy')}
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-12 w-[92%] max-w-content border-t border-line pt-6 text-xs text-muted">
        © {year} A&apos;LIS BEAUTY. {tf('copyright')}
      </div>
    </footer>
  );
}
