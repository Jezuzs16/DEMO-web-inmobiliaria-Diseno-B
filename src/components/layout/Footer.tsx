import { ArrowUpRight, Briefcase, Camera, Mail, MapPin, Phone, Users } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CONTACT } from '../../features/properties/data/mockProperties';
import { mailtoLink, telLink } from '../../lib/safeLinks';
import { usePropertyStore } from '../../features/properties/store/usePropertyStore';

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Propiedades', href: '#propiedades' },
  { label: 'Nosotros', href: '#nosotros' },
];

export function Footer() {
  const openAdvisory = usePropertyStore((state) => state.openAdvisory);

  return (
    <footer id="contacto" className="scroll-mt-24 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandLogo variant="dark" />
            <h2 className="mt-7 max-w-md font-display text-3xl font-bold leading-tight sm:text-4xl">
              Hablemos de tu próxima propiedad.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Corretaje inmobiliario con propiedades verificadas legalmente,
              asesores dedicados y presencia en todo el Estado Bolívar.
            </p>
            <button
              type="button"
              onClick={openAdvisory}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-yellow transition-colors hover:text-white"
            >
              Iniciar conversación <ArrowUpRight size={16} />
            </button>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Enlaces rápidos
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-yellow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Contacto
            </h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-cyan" />
                {CONTACT.address}
              </li>
              <li>
                <a
                  href={mailtoLink(CONTACT.email)}
                  className="flex items-center gap-3 transition-colors hover:text-brand-yellow"
                >
                  <Mail size={16} className="shrink-0 text-brand-cyan" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={telLink(CONTACT.whatsapp)}
                  className="flex items-center gap-3 transition-colors hover:text-brand-yellow"
                >
                  <Phone size={16} className="shrink-0 text-brand-cyan" />
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[
                { label: 'Instagram', icon: Camera },
                { label: 'Facebook', icon: Users },
                { label: 'LinkedIn', icon: Briefcase },
              ].map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#contacto"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Inmobiliaria Negocios Globales. Demo
            interactiva.
          </p>
          <p>Puerto Ordaz · San Félix · Ciudad Bolívar · Upata</p>
        </div>
      </div>
    </footer>
  );
}
