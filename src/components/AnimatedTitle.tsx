'use client';

import { motion } from 'framer-motion';

// Крупная кинетическая типографика: заголовок собирается по словам при появлении.
export default function AnimatedTitle({
  text,
  className = '',
  as = 'h2',
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  const words = text.split(' ');
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
