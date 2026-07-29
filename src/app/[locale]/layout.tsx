import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { fontDisplay, fontBody } from '../fonts';
import { site } from '@/config/site';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookModal from '@/components/BookModal';
import Preloader from '@/components/Preloader';
import YandexMetrika from '@/components/YandexMetrika';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.domain;

  return {
    metadataBase: new URL(base),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'ru' ? '/' : '/en',
      languages: { ru: '/', en: '/en' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: base,
      siteName: "A'LIS BEAUTY",
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    icons: { icon: '/favicon.svg' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <SmoothScroll>
            <Header />
            <main id="top">{children}</main>
            <Footer />
          </SmoothScroll>
          <BookModal />
        </NextIntlClientProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
