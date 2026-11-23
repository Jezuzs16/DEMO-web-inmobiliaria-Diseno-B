import { useRef } from 'react';
import { Handshake, MapPinned, ShieldCheck, UserRound } from 'lucide-react';
import { gsap, useGSAP } from '../../../lib/gsap';
import { SplitRevealText } from '../../../components/react-bits/SplitRevealText';
import { MagneticButton } from '../../../components/react-bits/MagneticButton';
import { GlobeMark } from '../../../components/layout/BrandLogo';
import { usePropertyStore } from '../store/usePropertyStore';

export function WhyChooseUsBento() {
  const root = useRef<HTMLElement>(null);
  const showBolivar = usePropertyStore((state) => state.showBolivar);
  const openAdvisory = usePropertyStore((state) => state.openAdvisory);

  useGSAP(
    () => {
      gsap.fromTo(
        '[data-bento-card]',
        { opacity: 0, y: 28, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 80%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-bento-divider]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        },
      );
    },
    { scope: root },
  );

  const handleExploreBolivar = () => {
    showBolivar();
    document.getElementById('propiedades')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={root}
      id="nosotros"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mb-11 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
            <span className="h-px w-8 bg-brand-yellow" />
            Por qué elegirnos
          </p>
          <SplitRevealText
            as="h2"
            text="Tu tranquilidad es nuestro negocio."
            underline={['tranquilidad']}
            className="max-w-2xl font-display text-[clamp(2rem,4.3vw,3.5rem)] font-extrabold leading-tight text-navy"
          />
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-navy/55">
          Más de una década conectando familias e inversionistas con propiedades
          verificadas en el Estado Bolívar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <article
          data-bento-card
          className="flex min-h-[20rem] flex-col justify-between rounded-3xl border border-line bg-white p-7 lg:col-span-7"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
            <ShieldCheck size={24} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold text-navy">
              Compra segura
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy/55">
              Todas nuestras propiedades están verificadas legalmente.
            </p>
          </div>
        </article>

        <article
          data-bento-card
          className="flex min-h-[20rem] flex-col justify-between rounded-3xl bg-navy p-7 lg:col-span-5"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-yellow/15 text-brand-yellow">
              <UserRound size={22} />
            </span>
            <span className="h-1 w-14 rounded-full bg-brand-yellow" />
          </div>
          <div className="mt-6">
            <h3 className="font-display text-xl font-bold text-white">
              Asesoría personalizada
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Un agente dedicado para cada cliente, siempre disponible.
            </p>
            <MagneticButton
              onClick={openAdvisory}
              size="sm"
              className="mt-5"
            >
              Contactar asesor
            </MagneticButton>
          </div>
        </article>

        <article
          data-bento-card
          className="relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-stone-soft p-7 lg:col-span-12 lg:flex-row lg:items-end lg:gap-12"
        >
          <GlobeMark className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 opacity-30" />
          <div className="relative max-w-3xl">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
              <MapPinned size={22} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-navy">
              Estado Bolívar
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy/55">
              El estado Bolívar es el Estado más grande de Venezuela. Liderazgo
              inmobiliario en Puerto Ordaz, Ciudad Bolívar y Upata.
            </p>

            <div className="mt-6 border-t border-line pt-5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-yellow/20 text-navy">
                  <Handshake size={18} />
                </span>
                <h4 className="font-display text-lg font-bold text-navy">
                  Transacciones transparentes y exitosas
                </h4>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy/55">
                Acompañamiento integral en cada paso del proceso de compra, venta
                o alquiler, con total claridad y resultados concretos.
              </p>
            </div>
          </div>

          <div className="relative mt-7 shrink-0 lg:mb-1 lg:mt-0">
            <MagneticButton
              variant="outline"
              size="sm"
              onClick={handleExploreBolivar}
            >
              Conoce más
            </MagneticButton>
          </div>
        </article>
      </div>

      <div
        data-bento-divider
        aria-hidden="true"
        className="mt-12 h-px w-full origin-left bg-navy/15"
        style={{ transform: 'scaleX(0)' }}
      />
    </section>
  );
}
