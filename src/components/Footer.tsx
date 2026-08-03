'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site, navItems } from '@/config/site';

export default function Footer() {
  const t = useTranslations('nav');
  const tf = useTranslations('footer');
  const tc = useTranslations('contacts');
  const year = new Date().getFullYear();

  const social = [
    { label: 'inst*', href: site.instagramSalon },
    { label: 'tg', href: site.telegram },
    { label: 'wa', href: site.whatsapp },
    { label: 'e-mail', href: `mailto:${site.email}` },
  ];

  return (
    <footer className="border-t border-line bg-bg pt-16 pb-8">
      <div className="mx-auto w-[92%] max-w-content">
        {/* Крупный бренд */}
        <a
          href="#top"
          className="block font-display text-[19vw] leading-[0.9] tracking-tight text-text lg:text-[150px]"
        >
          a&apos;lis <span className="text-accent">beauty</span>
        </a>

        {/* Навигация через «/» */}
        <nav className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
          {navItems.map((id, i) => (
            <span key={id} className="flex items-center gap-3">
              {i > 0 && <span className="text-muted/40">/</span>}
              <a href={`#${id}`} className="lowercase text-muted transition hover:text-text">
                {t(id)}
              </a>
            </span>
          ))}
        </nav>

        {/* Соцсети + реквизиты */}
        <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
            {social.map((s, i) => (
              <span key={s.label} className="flex items-center gap-3">
                {i > 0 && <span className="text-muted/40">/</span>}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition hover:text-accent"
                >
                  {s.label}
                </a>
              </span>
            ))}
          </div>
          <div className="text-[13px] leading-relaxed text-muted md:text-right">
            <p>{tc('ip')}</p>
            <p>{tc('ogrnip')} · {tc('inn')}</p>
            <p className="mt-1">{tc('address')} · {site.email}</p>
          </div>
        </div>

        {/* Низ */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[13px] text-muted">
          <span>© {year} A&apos;LIS BEAUTY. {tf('copyright')}</span>
          <div className="flex items-center gap-5">
            <Link href="/politic" className="transition hover:text-text">{tc('policy')}</Link>
            <a href="#top" className="transition hover:text-accent">наверх ⭡</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
