import type { ReactNode } from 'react';
import AnimatedTitle from './AnimatedTitle';
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
            {eyebrow && (
              <Reveal>
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
              </Reveal>
            )}
            {title && (
              <AnimatedTitle
                text={title}
                className="max-w-[18ch] text-5xl uppercase leading-[0.95] tracking-[-0.01em] sm:text-6xl lg:text-7xl"
              />
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
