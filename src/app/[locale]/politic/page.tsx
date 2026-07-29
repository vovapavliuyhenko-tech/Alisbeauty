import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function PolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('policy');

  return (
    <div className="mx-auto min-h-screen w-[92%] max-w-3xl px-0 py-40">
      <Link href="/" className="text-sm text-accent hover:underline">
        ← {t('back')}
      </Link>
      <h1 className="mt-6 text-4xl sm:text-5xl">{t('title')}</h1>
      <p className="mt-8 leading-relaxed text-muted">{t('body')}</p>
    </div>
  );
}
