'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface CounterProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({ from = 0, to, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const motionVal = useMotionValue(from);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (isInView) motionVal.set(to);
  }, [isInView, motionVal, to]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.floor(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}
<Ajlaan></Ajlaan>