import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

// Единая обёртка секции с eyebrow + заголовком и якорем.
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  alt = false,
  center = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
  center?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-28 ${alt ? 'bg-surface' : ''} ${className}`}
    >
      <div className="mx-auto w-[92%] max-w-content">
        {(eyebrow || title) && (
          <div className={`mb-12 sm:mb-16 ${center ? 'text-center' : ''}`}>
            {(eyebrow || title) && (
              <Reveal>
                <h2 className={`flex items-baseline gap-2 text-4xl font-normal lowercase tracking-tight sm:text-5xl ${center ? 'justify-center' : ''}`}>
                  <span className="font-light text-muted/60">(</span>
                  <span>{(eyebrow || title)!.toLowerCase()}</span>
                  <span className="font-light text-muted/60">)</span>
                </h2>
              </Reveal>
            )}
            {subtitle && (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl text-muted">{subtitle}</p>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
