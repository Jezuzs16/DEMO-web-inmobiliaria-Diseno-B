import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle, UserRound, X } from 'lucide-react';
import { MagneticButton } from '../../../components/react-bits/MagneticButton';
import { pauseScroll, resumeScroll } from '../../../lib/smoothScroll';
import { usePropertyStore } from '../store/usePropertyStore';
import { whatsappLink } from '../data/mockProperties';

export function AdvisoryModal() {
  const open = usePropertyStore((state) => state.advisoryOpen);
  const closeAdvisory = usePropertyStore((state) => state.closeAdvisory);
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('Comprar');
  const [message, setMessage] = useState('');
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pauseScroll();
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAdvisory();
      if (event.key === 'Tab' && dialog.current) {
        const focusable = dialog.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
  }, [open, closeAdvisory]);

  if (!open) return null;

  const summary = [
    name.trim() && `Nombre: ${name.trim()}`,
    `Interés: ${interest}`,
    message.trim() && `Mensaje: ${message.trim()}`,
  ]
    .filter(Boolean)
    .join('\n');
  const href = whatsappLink(
    `Hola, quisiera recibir asesoría personalizada de Inmobiliaria Negocios Globales.\n${summary}`,
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-navy/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeAdvisory();
      }}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="advisory-modal-title"
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-white shadow-2xl"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={closeAdvisory}
          aria-label="Cerrar formulario de asesoría"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy transition-colors hover:border-brand-yellow"
        >
          <X size={18} />
        </button>

        <div className="border-b border-line bg-alabaster p-6 pr-16 sm:p-8 sm:pr-20">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-yellow/20 text-navy">
            <UserRound size={22} />
          </span>
          <p className="mt-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
            <span className="h-px w-8 bg-brand-yellow" />
            Asesoría personalizada
          </p>
          <h2
            id="advisory-modal-title"
            className="mt-3 font-display text-2xl font-extrabold leading-tight text-navy sm:text-3xl"
          >
            Cuéntanos qué estás buscando.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy/60">
            Completa estos datos y continuamos la conversación por WhatsApp con
            un asesor dedicado. Sin formularios ni esperas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8">
          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-navy/45">
              Tu nombre
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nombre y apellido"
              autoComplete="name"
              className="w-full rounded-xl border border-line bg-white px-3 py-3 text-[13px] font-semibold text-navy outline-none transition-colors placeholder:font-normal placeholder:text-navy/35 focus:border-brand-cyan"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-navy/45">
              ¿Qué te interesa?
            </span>
            <select
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
              className="w-full rounded-xl border border-line bg-white px-3 py-3 text-[13px] font-semibold text-navy outline-none transition-colors focus:border-brand-cyan"
            >
              <option>Comprar</option>
              <option>Alquilar</option>
              <option>Vender</option>
              <option>Invertir</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-navy/45">
              Mensaje (opcional)
            </span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Zona, presupuesto, tipo de inmueble..."
              rows={3}
              className="w-full resize-none rounded-xl border border-line bg-white px-3 py-3 text-[13px] font-semibold text-navy outline-none transition-colors placeholder:font-normal placeholder:text-navy/35 focus:border-brand-cyan"
            />
          </label>

          <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] leading-relaxed text-navy/45">
              Tus datos solo se usan para preparar el mensaje de WhatsApp.
            </p>
            <MagneticButton type="submit" size="sm" className="shrink-0">
              <MessageCircle size={15} /> Continuar por WhatsApp
            </MagneticButton>
          </div>
        </form>
      </div>
    </div>
  );
}
