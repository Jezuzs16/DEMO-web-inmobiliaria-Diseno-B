import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

interface TiltedSpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Intensidad máxima de la inclinación en grados. */
  tilt?: number;
}

export function TiltedSpotlightCard({
  children,
  className = '',
  tilt = 7,
}: TiltedSpotlightCardProps) {
  const inner = useRef<HTMLDivElement>(null);
  const [tiltEnabled, setTiltEnabled] = useState(true);

  useEffect(() => {
    const query = window.matchMedia(
      '(hover: none), (pointer: coarse), (max-width: 1023px)',
    );
    const update = () => setTiltEnabled(!query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useGSAP(() => {
    if (!tiltEnabled && inner.current) {
      gsap.to(inner.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.3,
      });
    }
  }, [tiltEnabled]);

  const { contextSafe } = useGSAP();

  const handleMove = contextSafe((event: MouseEvent<HTMLDivElement>) => {
    const element = inner.current;
    if (!element || !tiltEnabled) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty('--mouse-x', `${(x + 0.5) * 100}%`);
    element.style.setProperty('--mouse-y', `${(y + 0.5) * 100}%`);
    element.style.setProperty('--spotlight-opacity', '1');

    gsap.to(element, {
      rotateY: x * tilt,
      rotateX: -y * tilt,
      scale: 1.01,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  const handleLeave = contextSafe(() => {
    const element = inner.current;
    element?.style.setProperty('--spotlight-opacity', '0');
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });

  return (
    <div className={`group/spotlight h-full ${className}`} style={{ perspective: 1200 }}>
      <div
        ref={inner}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative h-full overflow-hidden rounded-3xl"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[25] rounded-[inherit] transition-opacity duration-500"
          style={{
            opacity: 'var(--spotlight-opacity, 0)',
            background:
              'radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(243, 216, 0, 0.2), transparent 65%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[25] rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
          style={{
            background:
              'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.25), transparent 55%)',
          }}
        />
      </div>
    </div>
  );
}
