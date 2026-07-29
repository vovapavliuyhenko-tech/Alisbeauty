// Хелпер для целей Яндекс.Метрики. Безопасен без счётчика.
declare global {
  interface Window {
    ym?: (id: number, action: string, target?: string) => void;
  }
}

export function trackGoal(goal: string) {
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (typeof window !== 'undefined' && window.ym && id) {
    window.ym(Number(id), 'reachGoal', goal);
  }
}
