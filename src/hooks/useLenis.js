import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      wrapper: window,
      content: document.documentElement,
      eventsTarget: window,
      wheelEventsTarget: window,
      touchEventsTarget: window,
      lerp: 0.1,
      syncTouch: true,
      autoResize: true,
    });

    // Make lenis available globally for custom scroll functions
    window.lenis = lenis;

    // Animation frame function
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
};
