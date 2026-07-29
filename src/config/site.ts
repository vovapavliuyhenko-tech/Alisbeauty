// Все внешние ссылки и контакты — в одном месте.
export const site = {
  name: "A'LIS BEAUTY",
  domain: 'https://alisbeauty.ru',
  telegram: 'https://t.me/alisbeautyclub',
  whatsapp: 'https://wa.me/79888887728',
  whatsappNumber: '+7 988 888 77 28',
  email: 'alisbeautyclub@gmail.com',
  instagramSalon: 'https://www.instagram.com/alisbeauty.ru',
  instagramConcierge: 'https://www.instagram.com/alisbeautyconcierge',
  instagramSalonHandle: '@alisbeauty.ru',
  instagramConciergeHandle: '@alisbeautyconcierge',
  // Новороссийск для карты
  mapEmbed:
    'https://yandex.ru/map-widget/v1/?ll=37.767%2C44.723&z=12&text=%D0%9D%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA',
} as const;

// Пункты якорной навигации (id секций).
export const navItems = [
  'about',
  'concierge',
  'uniqueness',
  'gallery',
  'reviews',
  'price',
  'form',
  'contacts',
] as const;

export type NavKey = (typeof navItems)[number];
