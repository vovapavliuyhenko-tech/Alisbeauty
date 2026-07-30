import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Founder from '@/components/sections/Founder';
import Concierge from '@/components/sections/Concierge';
import Uniqueness from '@/components/sections/Uniqueness';
import FullLook from '@/components/sections/FullLook';
import HowTo from '@/components/sections/HowTo';
import PortfolioScroll from '@/components/sections/PortfolioScroll';
import Gallery from '@/components/sections/Gallery';
import Reviews from '@/components/sections/Reviews';
import Price from '@/components/sections/Price';
import EnquiryForm from '@/components/sections/EnquiryForm';
import Contacts from '@/components/sections/Contacts';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Founder />
      <Concierge />
      <Uniqueness />
      <FullLook />
      <HowTo />
      <PortfolioScroll />
      <Gallery />
      <Reviews />
      <Price />
      <EnquiryForm />
      <Contacts />
    </>
  );
}
