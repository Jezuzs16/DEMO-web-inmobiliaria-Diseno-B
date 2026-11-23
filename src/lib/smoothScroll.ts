import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenis: Lenis | null = null;
let pauseCount = 0;

/** Devuelve la instancia compartida de Lenis, si ya fue montada. */
export function getLenis(): Lenis | null {
  return lenis;
}

/** Pausa el scroll inercial. Las llamadas anidadas se equilibran con resumeScroll. */
export function pauseScroll(): void {
  pauseCount += 1;
  lenis?.stop();
}

/** Reanuda el scroll cuando se han cerrado todos los modales que lo pausaron. */
export function resumeScroll(): void {
  pauseCount = Math.max(0, pauseCount - 1);
  if (pauseCount === 0) lenis?.start();
}

/** Configura Lenis y lo sincroniza con el ticker de GSAP y ScrollTrigger. */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      duration: 0.85,
      smoothWheel: true,
    });
    lenis = instance;

    instance.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    if (pauseCount > 0) instance.stop();

    return () => {
      gsap.ticker.remove(raf);
      instance.off('scroll', ScrollTrigger.update);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, []);
}
