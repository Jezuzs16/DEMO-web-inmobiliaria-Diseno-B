import { useMemo, useRef, type FormEvent } from 'react';
import {
  ChevronDown,
  Search,
  ShieldCheck
} from 'lucide-react';
import { gsap, useGSAP } from '../../../lib/gsap';
import { SplitRevealText } from '../../../components/react-bits/SplitRevealText';
import { MagneticButton } from '../../../components/react-bits/MagneticButton';
import { TiltedSpotlightCard } from '../../../components/react-bits/TiltedSpotlightCard';
import { usePropertyStore } from '../store/usePropertyStore';
import { mockProperties } from '../data/mockProperties';
import { handleImageError } from '../../../lib/imageFallback';
import type {
  OperationType,
  PropertyCategory,
} from '../types/property.types';

const operations: Array<OperationType | 'Todas'> = ['Todas', 'Venta', 'Alquiler'];
const categories: Array<PropertyCategory | 'Todos'> = [
  'Todos',
  'Townhouse',
  'Apartamento',
  'Casa',
  'Comercial',
];
const zones = [
  'Todas',
  'Puerto Ordaz',
  'San Félix',
  'Ciudad Bolívar',
  'Upata',
  'Lechería',
  'Caracas',
];

const selectClass =
  'w-full appearance-none rounded-xl border border-line bg-white py-3 pl-3 pr-9 text-[13px] font-semibold text-navy outline-none transition-colors focus:border-brand-cyan';

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const filters = usePropertyStore((state) => state.filters);
  const setFilters = usePropertyStore((state) => state.setFilters);
  const featured = useMemo(
    () => mockProperties.find((property) => property.featured) ?? mockProperties[0],
    [],
  );

  useGSAP(
    () => {
      gsap.to('[data-hero-glow]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '[data-hero-reveal]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
        },
      );
    },
    { scope: root },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById('propiedades')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={root}
      id="inicio"
      className="relative overflow-hidden bg-alabaster pb-20 pt-36 sm:pt-44 lg:pb-24"
    >
      <div
        aria-hidden="true"
        data-hero-glow
        className="pointer-events-none absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-brand-sky/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-brand-yellow/15 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p
            data-hero-reveal
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-yellow/50 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy"
          >
            <span className="h-2 w-2 rounded-full bg-brand-yellow" />
            Inmobiliaria de confianza en Venezuela
          </p>

          <div data-hero-reveal>
            <SplitRevealText
              as="h1"
              text="Expertos en conectar personas con propiedades excepcionales"
              underline={['propiedades', 'excepcionales']}
              className="max-w-2xl font-display text-[clamp(2.35rem,5.2vw,4.6rem)] font-extrabold leading-[1.06] text-navy"
            />
          </div>

          <p
            data-hero-reveal
            className="mt-7 max-w-2xl text-sm leading-[1.9] text-navy/65 sm:text-[15px]"
          >
            En Inmobiliaria Negocios Globales nos enorgullece ser una de las
            inmobiliarias más confiables del país. Nuestro equipo de asesores
            altamente capacitados te acompaña en cada paso del proceso,
            garantizando transacciones seguras, transparentes y exitosas.
          </p>

          <form
            data-hero-reveal
            onSubmit={handleSubmit}
            className="mt-9 grid gap-3 rounded-3xl border border-line bg-white p-3 shadow-[0_20px_60px_-35px_rgba(16,35,49,0.5)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
          >
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-navy/45">
                Operación
              </span>
              <span className="relative block">
                <select
                  aria-label="Operación"
                  value={filters.operation}
                  onChange={(event) =>
                    setFilters({
                      operation: event.target.value as OperationType | 'Todas',
                      region: 'Todas',
                    })
                  }
                  className={selectClass}
                >
                  {operations.map((operation) => (
                    <option key={operation} value={operation}>
                      {operation}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-cyan"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-navy/45">
                Tipo de inmueble
              </span>
              <span className="relative block">
                <select
                  aria-label="Tipo de inmueble"
                  value={filters.category}
                  onChange={(event) =>
                    setFilters({
                      category: event.target.value as PropertyCategory | 'Todos',
                      region: 'Todas',
                    })
                  }
                  className={selectClass}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-cyan"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-navy/45">
                Zona
              </span>
              <span className="relative block">
                <select
                  aria-label="Zona"
                  value={filters.city}
                  onChange={(event) =>
                    setFilters({ city: event.target.value, region: 'Todas' })
                  }
                  className={selectClass}
                >
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-cyan"
                />
              </span>
            </label>

            <MagneticButton type="submit" className="h-[46px] w-full lg:w-auto">
              <Search size={16} /> Explorar
            </MagneticButton>
          </form>

          <div className="mt-10 flex flex-wrap gap-x-9 gap-y-5 border-t border-line pt-7">
            {[
              ['100%', 'Propiedades verificadas'],
              ['4', 'Zonas de Puerto Ordaz'],
              ['1 a 1', 'Asesor dedicado'],
            ].map(([value, label]) => (
              <div key={label} data-hero-reveal>
                <p className="font-display text-2xl font-extrabold text-navy">
                  {value}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div data-hero-reveal className="mx-auto w-full max-w-lg lg:max-w-none">
          <TiltedSpotlightCard tilt={6}>
            <div className="relative h-full min-h-[430px] overflow-hidden rounded-3xl bg-navy sm:min-h-[520px]">
              <img
                src={featured.images[0]}
                alt="Conjunto residencial Terrazas del Atlántico en Puerto Ordaz"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/spotlight:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/25 to-navy/90" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-brand-cyan/95 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-lg">
                    <ShieldCheck size={15} /> 100% Compra Segura • Verificada
                  </span>
                </div>
              </div>
            </div>
          </TiltedSpotlightCard>
        </div>
      </div>
    </section>
  );
}
