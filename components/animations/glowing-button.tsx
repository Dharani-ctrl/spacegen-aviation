'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/50 text-slate-900',
  secondary: 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/50 text-white',
  accent: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/50 text-slate-900',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function GlowingButton({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
}: GlowingButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative font-bold rounded-lg transition-all',
        'border-0 cursor-pointer',
        'shadow-lg shadow-cyan-500/50',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)',
      }}
      whileTap={{
        scale: 0.95,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
}
