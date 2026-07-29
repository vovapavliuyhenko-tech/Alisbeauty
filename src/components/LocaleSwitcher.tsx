'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

// Мгновенное переключение RU/EN с сохранением выбора в cookie (next-intl сам ставит cookie).
export default function LocaleSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: 'ru' | 'en') => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className={`flex items-center gap-1 text-sm ${className}`} aria-busy={isPending}>
      {(['ru', 'en'] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 text-line">/</span>}
          <button
            onClick={() => switchTo(l)}
            className={`uppercase tracking-wide transition ${
              locale === l ? 'text-accent' : 'text-muted hover:text-text'
            }`}
            aria-current={locale === l ? 'true' : undefined}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
