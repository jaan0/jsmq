import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

/**
 * Custom hook for scroll-triggered animations
 * Returns ref to attach to element and animation state
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -100px 0px',
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
    margin: rootMargin as any,
  });

  return { ref, isInView };
}

/**
 * Hook for staggered animations (useful for lists/grids)
 */
export function useStaggerAnimation(
  itemCount: number,
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -100px 0px',
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: triggerOnce,
    amount: threshold,
    margin: rootMargin as any,
  });

  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isInView && visibleItems.length < itemCount) {
      const interval = setInterval(() => {
        setVisibleItems((prev) => {
          if (prev.length >= itemCount) {
            clearInterval(interval);
            return prev;
          }
          return [...prev, prev.length];
        });
      }, 100); // Stagger delay in ms

      return () => clearInterval(interval);
    }
  }, [isInView, itemCount, visibleItems.length]);

  return { containerRef, isInView, visibleItems };
}

/**
 * Hook for counter animation
 */
export function useCounterAnimation(
  targetValue: number,
  duration: number = 2000,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isInView } = useScrollAnimation(options);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    animate();
  }, [isInView, targetValue, duration]);

  return { ref, count };
}

