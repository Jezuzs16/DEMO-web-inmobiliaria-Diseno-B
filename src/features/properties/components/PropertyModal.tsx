import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  CarFront,
  Check,
  MapPin,
  MessageCircle,
  Ruler,
  X,
} from 'lucide-react';
import { MagneticButton } from '../../../components/react-bits/MagneticButton';
import { usePropertyStore } from '../store/usePropertyStore';
import { mockProperties, whatsappLink } from '../data/mockProperties';
import { formatNumber, formatUSD } from '../../../lib/format';
import { handleImageError } from '../../../lib/imageFallback';
import { pauseScroll, resumeScroll } from '../../../lib/smoothScroll';

export function PropertyModal() {
  const selectedId = usePropertyStore((state) => state.selectedPropertyId);
  const closeProperty = usePropertyStore((state) => state.closeProperty);
  const property = mockProperties.find((item) => item.id === selectedId);
  const [activeImage, setActiveImage] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImage(0);
  }, [selectedId]);

  useEffect(() => {
    if (!property) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pauseScroll();
    closeButton.current?.focus();

    const total = property.images.length;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProperty();
      if (event.key === 'ArrowLeft' && total > 1) {
        event.preventDefault();
        setActiveImage((current) => (current - 1 + total) % total);
      }
      if (event.key === 'ArrowRight' && total > 1) {
        event.preventDefault();
        setActiveImage((current) => (current + 1) % total);
      }
      if (event.key === 'Tab' && dialog.current) {
        const focusable = dialog.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      resumeScroll();
    };
  }, [property, closeProperty]);

  if (!property) return null;

  const message = `Hola, me interesa la propiedad ${property.title} (código ${property.id}, ${property.city}). ¿Podrían agendar una visita?`;
  const specs = [
    { icon: Ruler, label: 'Área', value: `${formatNumber(property.area)} m²` },
    { icon: BedDouble, label: 'Habitaciones', value: String(property.bedrooms) },
    { icon: Bath, label: 'Baños', value: String(property.bathrooms) },
    {
      icon: CarFront,
      label: 'Estacionamiento',
      value: String(property.parking),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-navy/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeProperty();
      }}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-modal-title"
        className="relative my-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-2xl"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={closeProperty}
          aria-label="Cerrar detalle de la propiedad"
          className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy transition-colors hover:border-brand-yellow"
        >
          <X size={18} />
        </button>

        <div className="grid max-h-[92vh] overflow-y-auto lg:max-h-[88vh] lg:grid-cols-[1.05fr_1fr] lg:overflow-hidden">
          <div className="flex flex-col bg-stone-soft p-4 sm:p-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
              <img
                src={property.images[activeImage]}
                alt={`${property.title} — vista ${activeImage + 1}`}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="h-full w-full object-cover"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage((current) =>
                        (current - 1 + property.images.length) %
                        property.images.length,
                      )
                    }
                    aria-label="Imagen anterior"
                    className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/95 text-navy transition-colors hover:border-brand-yellow"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage(
                        (current) => (current + 1) % property.images.length,
                      )
                    }
                    aria-label="Imagen siguiente"
                    className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/95 text-navy transition-colors hover:border-brand-yellow"
                  >
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
              <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-wider text-navy">
                {activeImage + 1} / {property.images.length}
              </span>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {property.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                    activeImage === index
                      ? 'border-brand-yellow'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em]">
              <span className="rounded-full bg-brand-yellow px-2.5 py-1 text-navy">
                {property.badge}
              </span>
              <span className="text-brand-cyan">{property.operation}</span>
              <span className="text-navy/25">/</span>
              <span className="text-navy/60">{property.category}</span>
            </div>

            <h2
              id="property-modal-title"
              className="font-display text-2xl font-extrabold leading-tight text-navy sm:text-3xl"
            >
              {property.title}
            </h2>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-navy/55">
              <MapPin size={14} className="text-brand-cyan" />
              {property.neighborhood}, {property.city} · Ref. {property.id}
            </p>

            <p className="mt-5 font-display text-3xl font-extrabold text-navy">
              {formatUSD(property.price)}
              {property.priceSuffix && (
                <span className="text-base font-semibold text-navy/50">
                  {property.priceSuffix}
                </span>
              )}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {specs.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-line bg-alabaster p-3"
                >
                  <Icon size={16} className="mb-2 text-brand-cyan" />
                  <p className="text-sm font-bold text-navy">{value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-navy/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-navy/70">
                Descripción
              </h3>
              <p className="text-sm leading-relaxed text-navy/60">
                {property.description}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-navy/70">
                Amenidades
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2 text-xs text-navy/60"
                  >
                    <Check size={13} className="shrink-0 text-brand-cyan" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-navy/50">
                ¿Te interesa este inmueble? Agenda una visita sin compromiso.
              </p>
              <MagneticButton
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                <MessageCircle size={15} /> Agendar visita por WhatsApp
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
