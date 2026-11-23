import { useRef, type MouseEvent, type ReactNode } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  type?: 'button' | 'submit';
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-4 text-sm',
} as const;

const variants = {
  gold: 'bg-brand-yellow text-navy hover:bg-brand-yellow-hover shadow-[0_10px_30px_-12px_rgba(243,216,0,0.7)]',
  outline:
    'border border-navy/15 text-navy hover:border-brand-yellow hover:bg-brand-yellow/10',
  ghost: 'text-navy/60 hover:text-navy',
} as const;

export function MagneticButton({
  children,
  href,
  target,
  rel,
  onClick,
  className = '',
  variant = 'gold',
  size = 'md',
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const button = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP();

  const handleMove = contextSafe((event: MouseEvent<HTMLElement>) => {
    const element = button.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    gsap.to(element, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.28,
      y: (event.clientY - rect.top - rect.height / 2) * 0.38,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(button.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    });
  });

  const classes = `relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 will-change-transform ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={button as never}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={classes}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={button as never}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={classes}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
