import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { GlobalGlobe3D } from '../three/GlobalGlobe3D';
import { BrandLogo } from './BrandLogo';
import { MagneticButton } from '../react-bits/MagneticButton';
import { CONTACT, whatsappLink } from '../../features/properties/data/mockProperties';
import { mailtoLink } from '../../lib/safeLinks';
import { pauseScroll, resumeScroll } from '../../lib/smoothScroll';
import { usePropertyStore } from '../../features/properties/store/usePropertyStore';

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Propiedades', href: '#propiedades' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navbar3D() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const openAdvisory = usePropertyStore((state) => state.openAdvisory);

  useGSAP(
    () => {
      gsap.fromTo(
        root.current,
        { y: -25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
        },
      );
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        start: 40,
        end: 'max',
        onToggle: (self) => {
          gsap.to(bar.current, {
            scale: self.isActive ? 0.97 : 1,
            y: self.isActive ? -6 : 0,
            duration: 0.45,
            ease: 'power3.out',
          });
        },
      });
      return () => trigger.kill();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set(progress.current, { scaleX: self.progress });
        },
      });
      return () => trigger.kill();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!menuOpen || !drawer.current) return;
      const items = drawer.current.querySelectorAll('[data-drawer-link]');
      gsap.fromTo(
        drawer.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
      );
    },
    { dependencies: [menuOpen] },
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) pauseScroll();
    return () => {
      document.body.style.overflow = '';
      if (menuOpen) resumeScroll();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={root}
        className="fixed inset-x-0 top-3 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-7xl sm:top-5"
      >
        <div
          ref={bar}
          className="glass-pill flex h-[72px] items-center justify-between gap-2 rounded-full px-3 shadow-[0_12px_40px_-24px_rgba(16,35,49,0.55)] sm:gap-3 sm:px-5"
        >
          <a href="#inicio" className="flex min-w-0 items-center" aria-label="Ir al inicio">
            <BrandLogo
              globe={
                <GlobalGlobe3D className="h-12 w-12 rounded-full border-2 border-white shadow-sm sm:h-[54px] sm:w-[54px]" />
              }
            />
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-6 xl:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-semibold text-navy/70 transition-colors hover:text-navy after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-brand-yellow after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <MagneticButton
              onClick={openAdvisory}
              size="sm"
              ariaLabel="Asesoría Personalizada"
              className="px-3 text-[10px] sm:px-4 sm:text-xs"
            >
              Asesoría Personalizada
              <ArrowUpRight size={14} className="hidden sm:block" />
            </MagneticButton>

            <button
              type="button"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy transition-colors hover:border-brand-yellow xl:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-7 bottom-[3px] h-[2px] overflow-hidden rounded-full sm:inset-x-10"
        >
          <div
            ref={progress}
            className="h-full w-full origin-left rounded-full bg-brand-yellow"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </header>

      {menuOpen && (
        <div
          ref={drawer}
          className="fixed inset-0 z-40 flex flex-col justify-center bg-alabaster/97 px-7 backdrop-blur-xl xl:hidden"
        >
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
            Navegación
          </p>
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            {links.map((link, index) => (
              <a
                key={link.href}
                data-drawer-link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline justify-between border-b border-line py-4 font-display text-3xl font-bold text-navy transition-colors hover:text-brand-cyan"
              >
                {link.label}
                <span className="text-xs font-medium text-brand-cyan/70">
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>
          <div className="mt-10 space-y-2 text-sm text-navy/60">
            <a href={mailtoLink(CONTACT.email)} className="block hover:text-brand-cyan">
              {CONTACT.email}
            </a>
            <a
              href={whatsappLink('Hola, deseo agendar una visita.')}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-brand-cyan"
            >
              WhatsApp: {CONTACT.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
