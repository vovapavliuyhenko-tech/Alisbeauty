// Кураторская галерея. Пополняйте этот список — раскладка и фильтры подстроятся.
// category — ключ из messages.*.gallery.categories
// src — путь к медиа в /public (замените плейсхолдеры реальными файлами).
export type GalleryCategory = 'wedding' | 'events' | 'backstage' | 'clients';

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  category: GalleryCategory;
  captionRu: string;
  captionEn: string;
  /** Соотношение сторон для masonry-плейсхолдера, напр. '3/4' */
  ratio?: string;
}

// Плейсхолдеры (реальные фото/видео положить в /public/gallery и заменить src).
export const galleryItems: GalleryItem[] = [
  { id: 'g1', type: 'image', src: '', category: 'wedding', captionRu: 'Свадебный образ', captionEn: 'Wedding look', ratio: '3/4' },
  { id: 'g2', type: 'image', src: '', category: 'events', captionRu: 'Образ на мероприятие', captionEn: 'Event look', ratio: '4/5' },
  { id: 'g3', type: 'image', src: '', category: 'backstage', captionRu: 'За кулисами', captionEn: 'Backstage', ratio: '1/1' },
  { id: 'g4', type: 'image', src: '', category: 'clients', captionRu: 'Наша клиентка', captionEn: 'Our client', ratio: '3/4' },
  { id: 'g5', type: 'image', src: '', category: 'wedding', captionRu: 'Утро невесты', captionEn: "Bride's morning", ratio: '4/5' },
  { id: 'g6', type: 'image', src: '', category: 'events', captionRu: 'Вечерний образ', captionEn: 'Evening look', ratio: '1/1' },
  { id: 'g7', type: 'image', src: '', category: 'backstage', captionRu: 'Работа команды', captionEn: 'Team at work', ratio: '3/4' },
  { id: 'g8', type: 'image', src: '', category: 'clients', captionRu: 'Довольная клиентка', captionEn: 'Happy client', ratio: '4/5' },
  { id: 'g9', type: 'image', src: '', category: 'wedding', captionRu: 'Свадебная укладка', captionEn: 'Wedding hairstyle', ratio: '1/1' },
];
