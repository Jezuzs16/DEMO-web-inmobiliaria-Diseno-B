import { useMemo, useRef } from 'react';
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  CarFront,
  Heart,
  MapPin,
  Ruler,
  SearchX,
} from 'lucide-react';
import { gsap, useGSAP } from '../../../lib/gsap';
import { TiltedSpotlightCard } from '../../../components/react-bits/TiltedSpotlightCard';
import { MagneticButton } from '../../../components/react-bits/MagneticButton';
import { filterProperties, usePropertyStore } from '../store/usePropertyStore';
import { mockProperties } from '../data/mockProperties';
import type { Property, PropertyBadge } from '../types/property.types';
import { formatNumber, formatUSD } from '../../../lib/format';
import { handleImageError } from '../../../lib/imageFallback';

const spanClasses = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
] as const;

const badgeStyles: Record<PropertyBadge, string> = {
  Exclusivo: 'bg-brand-yellow text-navy',
  Verificada: 'bg-brand-cyan text-white',
  Oportunidad: 'bg-navy text-white',
  Alquiler: 'border border-line bg-white text-navy',
};

export function PropertyGrid() {
  const root = useRef<HTMLDivElement>(null);
  const filters = usePropertyStore((state) => state.filters);
  const favorites = usePropertyStore((state) => state.favorites);
  const toggleFavorite = usePropertyStore((state) => state.toggleFavorite);
  const openProperty = usePropertyStore((state) => state.openProperty);

  const properties = useMemo(
    () => filterProperties(mockProperties, filters),
    [filters],
  );
  const key = properties.map((property) => property.id).join('|');

  useGSAP(
    () => {
      const cards = root.current?.querySelectorAll<HTMLElement>('[data-card]');
      if (!cards?.length) return;

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 55%',
              scrub: 0.6,
            },
          },
        );

        const parallax = card.querySelector<HTMLElement>('[data-parallax]');
        if (parallax) {
          gsap.fromTo(
            parallax,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            },
          );
        }
      });
    },
    { scope: root, dependencies: [key] },
  );

  if (properties.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-white px-6 py-20 text-center">
        <SearchX size={40} className="mx-auto mb-5 text-brand-cyan" />
        <h3 className="font-display text-xl font-bold text-navy">
          No encontramos propiedades
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-navy/55">
          Prueba con otros filtros o limpia la búsqueda para ver toda la oferta
          verificada.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={root}
      className="grid grid-cols-1 gap-5 lg:grid-cols-12"
    >
      {properties.map((property, index) => (
        <div
          key={property.id}
          data-card
          className={`col-span-12 ${spanClasses[index % spanClasses.length]}`}
        >
          <TiltedSpotlightCard>
            <PropertyCard
              property={property}
              wide={index % spanClasses.length === 0 || index % spanClasses.length === 3}
              saved={favorites.includes(property.id)}
              onFavorite={() => toggleFavorite(property.id)}
              onOpen={() => openProperty(property.id)}
            />
          </TiltedSpotlightCard>
        </div>
      ))}
    </div>
  );
}

interface PropertyCardProps {
  property: Property;
  wide: boolean;
  saved: boolean;
  onFavorite: () => void;
  onOpen: () => void;
}

function PropertyCard({
  property,
  wide,
  saved,
  onFavorite,
  onOpen,
}: PropertyCardProps) {
  const specs = [
    { icon: Ruler, value: `${formatNumber(property.area)} m²` },
    { icon: BedDouble, value: `${property.bedrooms} hab.` },
    { icon: Bath, value: `${property.bathrooms} baños` },
    { icon: CarFront, value: `${property.parking} est.` },
  ];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <div
        className={`relative overflow-hidden bg-stone-soft ${
          wide ? 'aspect-[16/10]' : 'aspect-[4/3]'
        }`}
      >
        <div
          data-parallax
          className="absolute inset-x-0 -top-[6%] h-[112%] will-change-transform"
        >
          <img
            src={property.images[0]}
            alt={property.title}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="h-full w-full object-cover transition-transform duration-700 group-hover/spotlight:scale-[1.035]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />

        <span
          className={`absolute left-4 top-4 z-30 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${badgeStyles[property.badge]}`}
        >
          {property.badge}
        </span>

        <button
          type="button"
          onClick={onFavorite}
          aria-label={
            saved
              ? `Quitar ${property.title} de favoritos`
              : `Guardar ${property.title} en favoritos`
          }
          aria-pressed={saved}
          className="absolute right-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full border border-line bg-white/95 text-navy transition-colors hover:border-brand-yellow"
        >
          <Heart
            size={16}
            className={saved ? 'fill-brand-cyan text-brand-cyan' : ''}
          />
        </button>

        <div className="absolute bottom-4 left-4 z-30 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
            {property.category}
          </span>
          <span className="rounded-full bg-navy/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-yellow">
            {property.operation}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-navy/40">
          <span>{property.id}</span>
          <span className="flex items-center gap-1 text-navy/55">
            <MapPin size={11} className="text-brand-cyan" />
            {property.neighborhood}
          </span>
        </div>

        <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-navy">
          {property.title}
        </h3>
        <p className="mt-3 font-display text-xl font-extrabold text-navy">
          {formatUSD(property.price)}
          {property.priceSuffix && (
            <span className="text-sm font-semibold text-navy/50">
              {property.priceSuffix}
            </span>
          )}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 border-y border-line py-3.5">
          {specs.map(({ icon: Icon, value }) => (
            <span
              key={value}
              className="flex items-center gap-2 text-[11px] font-medium text-navy/60"
            >
              <Icon size={13} className="shrink-0 text-brand-cyan" />
              {value}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <MagneticButton
            variant="outline"
            size="sm"
            onClick={onOpen}
            ariaLabel={`Ver detalle de ${property.title}`}
          >
            Ver detalle <ArrowUpRight size={14} />
          </MagneticButton>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/35">
            Vista rápida
          </span>
        </div>
      </div>
    </article>
  );
}
