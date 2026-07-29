import { NextResponse } from 'next/server';

// Кеш на 1 час (revalidate). Если токена нет — отдаём пустой список,
// фронт покажет запасной вариант (кураторские превью + ссылка на профиль).
export const revalidate = 3600;

interface IgMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

export async function GET() {
  const token = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;

  if (!token || !userId) {
    return NextResponse.json({ configured: false, items: [] });
  }

  try {
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption';
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=8&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate } });

    if (!res.ok) throw new Error('IG API ' + res.status);
    const data = (await res.json()) as { data: IgMedia[] };

    const items = (data.data || []).map((m) => ({
      id: m.id,
      image: m.media_type === 'VIDEO' ? m.thumbnail_url || m.media_url : m.media_url,
      permalink: m.permalink,
      caption: m.caption || '',
    }));

    return NextResponse.json({ configured: true, items });
  } catch {
    // Не роняем сайт — просто запасной вариант
    return NextResponse.json({ configured: false, items: [] });
  }
}
