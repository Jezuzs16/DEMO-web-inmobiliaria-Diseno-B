import { useSmoothScroll } from './lib/smoothScroll';
import { Navbar3D } from './components/layout/Navbar3D';
import { Footer } from './components/layout/Footer';
import { SplitRevealText } from './components/react-bits/SplitRevealText';
import { HeroSection } from './features/properties/components/HeroSection';
import { PropertyFilters } from './features/properties/components/PropertyFilters';
import { PropertyGrid } from './features/properties/components/PropertyGrid';
import { PropertyModal } from './features/properties/components/PropertyModal';
import { AdvisoryModal } from './features/properties/components/AdvisoryModal';
import { WhyChooseUsBento } from './features/properties/components/WhyChooseUsBento';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Navbar3D />
      <main>
        <HeroSection />

        <section
          id="propiedades"
          className="scroll-mt-24 bg-stone-soft/60 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
                  <span className="h-px w-8 bg-brand-yellow" />
                  Catálogo verificado
                </p>
                <SplitRevealText
                  as="h2"
                  text="Propiedades seleccionadas para ti."
                  underline={['seleccionadas']}
                  className="max-w-2xl font-display text-[clamp(2rem,4.3vw,3.5rem)] font-extrabold leading-tight text-navy"
                />
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-navy/55">
                Compra, venta o alquiler con agentes dedicados. Cada inmueble
                cuenta con verificación legal y vista detallada.
              </p>
            </div>

            <div className="space-y-7">
              <PropertyFilters />
              <PropertyGrid />
            </div>
          </div>
        </section>

        <WhyChooseUsBento />
      </main>
      <Footer />
      <PropertyModal />
      <AdvisoryModal />
    </>
  );
}
