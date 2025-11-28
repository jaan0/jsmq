import { useEffect, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

/**
 * Custom hook for parallax scrolling effects
 * @param speed - Parallax speed multiplier (0-1, where 0.5 is half speed)
 * @param offset - Initial offset in pixels
 * @param disabled - Disable parallax (useful for mobile or reduced motion)
 */
export function useParallax({ speed = 0.5, offset = 0, disabled = false }: UseParallaxOptions = {}) {
  const [transform, setTransform] = useState(offset);

  useEffect(() => {
    if (disabled) {
      setTransform(offset);
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTransform(offset);
      return;
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxValue = scrolled * speed + offset;
      setTransform(parallaxValue);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [speed, offset, disabled]);

  return transform;
}

/**
 * Hook for parallax with multiple layers
 */
export function useMultiLayerParallax(layers: UseParallaxOptions[]) {
  const transforms = layers.map((layer) => useParallax(layer));
  return transforms;
}

