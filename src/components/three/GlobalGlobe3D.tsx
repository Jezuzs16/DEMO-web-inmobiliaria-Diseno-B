import { lazy, Suspense, useEffect, useMemo, useState } from 'react';

interface GlobalGlobe3DProps {
  className?: string;
}

/** La escena R3F se carga diferida para no bloquear el primer render. */
const LazyGlobeScene = lazy(() => import('./GlobalGlobe3DScene'));

function useInteractive() {
  const [interactive, setInteractive] = useState(true);

  useEffect(() => {
    const query = window.matchMedia(
      '(hover: none), (pointer: coarse), (max-width: 767px)',
    );
    const update = () => setInteractive(!query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return interactive;
}

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

function StaticGlobe() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id="globe-clip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="45" fill="none" stroke="#00A3E0" strokeWidth="1.5" opacity="0.7" />
      <circle cx="50" cy="50" r="38" fill="#38B2F6" />
      <g clipPath="url(#globe-clip)" fill="none" stroke="#F3D800" strokeWidth="2.4">
        <ellipse cx="50" cy="50" rx="14" ry="38" />
        <ellipse cx="50" cy="50" rx="28" ry="38" />
        <path d="M12 50h76M18 30h64M18 70h64" />
      </g>
    </svg>
  );
}

export function GlobalGlobe3D({ className = '' }: GlobalGlobe3DProps) {
  const interactive = useInteractive();
  const webgl = useMemo(hasWebGL, []);

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${className}`}
      role="img"
      aria-label="Globo terráqueo interactivo de Inmobiliaria Negocios Globales"
    >
      {webgl ? (
        <Suspense fallback={null}>
          <LazyGlobeScene interactive={interactive} />
        </Suspense>
      ) : (
        <StaticGlobe />
      )}
    </div>
  );
}
