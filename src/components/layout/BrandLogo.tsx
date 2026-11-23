import { useId, type ReactNode } from 'react';

interface BrandLogoProps {
  /** "light" para fondos claros (texto navy); "dark" para fondos navy (texto blanco). */
  variant?: 'light' | 'dark';
  /** Isotipo a la izquierda: escena 3D en el navbar, SVG estático en footer/bento. */
  globe?: ReactNode;
  className?: string;
}

export function GlobeMark({ className = '' }: { className?: string }) {
  const clipId = useId().replace(/:/g, '');

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="38" fill="#38B2F6" />
      <g clipPath={`url(#${clipId})`} fill="none" stroke="#F3D800" strokeWidth="2.6">
        <ellipse cx="50" cy="50" rx="14" ry="38" />
        <ellipse cx="50" cy="50" rx="28" ry="38" />
        <path d="M12 50h76M18 30h64M18 70h64" />
      </g>
      <circle cx="50" cy="50" r="38" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  );
}

export function BrandLogo({
  variant = 'light',
  globe,
  className = '',
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {globe ?? <GlobeMark className="h-12 w-12 shrink-0" />}
      <div className="flex min-w-0 flex-col items-start">
        <span className="font-sans text-[11px] font-semibold leading-none tracking-tight text-brand-cyan">
          inmobiliaria
        </span>
        <span className="my-[5px] block h-[2px] w-full bg-brand-yellow" />
        <span
          className={`font-display text-[15px] leading-[1.05] ${
            variant === 'dark' ? 'text-white' : 'text-navy'
          }`}
        >
          <span className="block font-normal">NEGOCIOS</span>
          <span className="block font-extrabold">GLOBALES</span>
        </span>
      </div>
    </div>
  );
}
