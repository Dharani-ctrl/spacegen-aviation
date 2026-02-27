'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function TextReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: TextRevealProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.33, 0.66, 0.66, 1],
      },
    },
  };

  const text = typeof children === 'string' ? children : '';

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, idx) => (
        <motion.span key={idx} variants={itemVariants}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
