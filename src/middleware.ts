import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Пропускаем api, статику, файлы
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
