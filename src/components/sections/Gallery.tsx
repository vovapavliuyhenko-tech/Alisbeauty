'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Instagram, Play } from 'lucide-react';
import Section from '../Section';
import { galleryItems, type GalleryCategory } from '@/config/gallery';
import { site } from '@/config/site';

type Filter = 'all' | GalleryCategory;
const categories: GalleryCategory[] = ['wedding', 'events', 'backstage', 'clients'];

interface IgItem {
  id: string;
  image: string;
  permalink: string;
  caption: string;
}

export default function Gallery() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [ig, setIg] = useState<IgItem[]>([]);

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => r.json())
      .then((d) => setIg(d.items || []))
      .catch(() => setIg([]));
  }, []);

  const filtered = galleryItems.filter((i) => filter === 'all' || i.category === filter);
  const caption = (i: (typeof galleryItems)[number]) => (locale === 'en' ? i.captionEn : i.captionRu);

  return (
    <Section id="gallery" eyebrow={t('eyebrow')} title={t('title')}>
      {/* Фильтры */}
      <div className="mb-10 flex flex-wrap gap-3">
        {(['all', ...categories] as Filter[]).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              filter === c
                ? 'border-accent bg-accent text-bg'
                : 'border-line text-muted hover:border-accent hover:text-text'
            }`}
          >
            {c === 'all' ? t('all') : t(`categories.${c}`)}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <div className="[column-fill:_balance] columns-2 gap-4 md:columns-3">
        {filtered.map((item, idx) => (
          <motion.button
            key={item.id}
            layout
            onClick={() => setLightbox(idx)}
            className="group relative mb-4 block w-full overflow-hidden border border-line"
            style={{ aspectRatio: item.ratio || '3/4' }}
          >
            {item.src ? (
              item.type === 'video' ? (
                <video src={item.src} className="h-full w-full object-cover" muted playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.src} alt={caption(item)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-surface text-xs text-muted">
                {caption(item)}
              </div>
            )}
            {item.type === 'video' && (
              <span className="absolute left-3 top-3 rounded-full bg-black/50 p-2 text-white">
                <Play size={14} />
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Instagram-лента / запасной вариант */}
      <div className="mt-20">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="flex items-center gap-3 text-2xl">
            <Instagram className="text-accent" /> {t('instagramTitle')}
          </h3>
          <a href={site.instagramSalon} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
            {t('instagramCta')}
          </a>
        </div>
        {ig.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ig.slice(0, 8).map((p) => (
              <a key={p.id} href={p.permalink} target="_blank" rel="noopener noreferrer" className="aspect-square overflow-hidden rounded-lg border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.caption.slice(0, 60)} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
            <p>{t('instagramFallback')}</p>
            <a href={site.instagramSalon} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3 text-accent transition hover:bg-accent hover:text-bg">
              <Instagram size={18} /> {site.instagramSalonHandle}
            </a>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button className="absolute right-6 top-6 text-white" aria-label={t('open')}>
              <X size={30} />
            </button>
            <div className="max-h-[85vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
              {filtered[lightbox].src ? (
                filtered[lightbox].type === 'video' ? (
                  <video src={filtered[lightbox].src} className="max-h-[85vh] rounded-xl" controls autoPlay />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={filtered[lightbox].src} alt={caption(filtered[lightbox])} className="max-h-[85vh] rounded-xl" />
                )
              ) : (
                <div className="flex aspect-[3/4] w-[70vw] max-w-md items-center justify-center rounded-xl bg-gradient-to-br from-accent/30 to-surface text-muted">
                  {caption(filtered[lightbox])}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
