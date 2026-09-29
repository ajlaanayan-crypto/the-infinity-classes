'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface IOSButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const IOSButton = React.forwardRef<HTMLButtonElement, IOSButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-[#1D1D1F] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)] hover:bg-[#2D2D2F]',
      secondary: 'btn-tactile text-[#1D1D1F]',
      outline: 'bg-transparent border-2 border-[#1D1D1F] text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white',
      ghost: 'bg-transparent text-[#1D1D1F] hover:bg-black/05',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs font-bold rounded-full',
      md: 'px-6 py-3.5 text-sm font-bold rounded-2xl',
      lg: 'px-8 py-5 text-base font-extrabold rounded-[1.25rem]',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98, y: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 transition-all duration-200 select-none overflow-hidden cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {variant === 'primary' && (
          <div className="absolute inset-0 border-t border-white/10 pointer-events-none rounded-inherit" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

IOSButton.displayName = 'IOSButton';
