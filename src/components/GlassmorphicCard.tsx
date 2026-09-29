'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}

export function GlassmorphicCard({ children, className, tilt = true }: GlassmorphicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { damping: 30, stiffness: 400, mass: 1 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Dynamic light reflection
  const lightX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const lightY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Convert to centered percentage (-0.5 to 0.5)
    x.set((mouseX / rect.width) - 0.5);
    y.set((mouseY / rect.height) - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative group perspective-2000 transition-shadow duration-500',
        isHovered ? 'shadow-2xl shadow-black/05' : 'shadow-lg shadow-black/02',
        className
      )}
    >
      <div 
        className={cn(
          "relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/40",
          "surface-glass transition-colors duration-500",
          isHovered ? "bg-white/95" : "bg-white/80"
        )}
      >
        {/* Grain Overlay */}
        <div className="absolute inset-0 grain-overlay z-0" />
        
        {/* Dynamic Inner Light Reflection */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(0, 113, 227, 0.08) 0%, transparent 70%)`
          }}
        />

        <div className="relative z-20 h-full w-full">
          {children}
        </div>
      </div>

      {/* Layered Shadow for Depth (Preserve-3D) */}
      <div 
        className="absolute -inset-4 bg-[#1D1D1F]/[0.02] blur-3xl -z-10 rounded-[4rem] group-hover:bg-[#1D1D1F]/[0.05] transition-all duration-700"
        style={{ transform: 'translateZ(-40px)' }}
      />
    </motion.div>
  );
}
