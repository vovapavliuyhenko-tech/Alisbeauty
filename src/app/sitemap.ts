import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.domain;
  const routes = ['', '/politic'];

  return routes.flatMap((route) => [
    {
      url: `${base}${route}`,
      lastModified: new Date(),
      alternates: { languages: { ru: `${base}${route}`, en: `${base}/en${route}` } },
    },
  ]);
}
