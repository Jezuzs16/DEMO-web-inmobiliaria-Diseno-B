import { useMemo } from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import {
  filterPills,
  type FilterPill,
} from '../types/property.types';
import {
  filterProperties,
  getActivePill,
  usePropertyStore,
} from '../store/usePropertyStore';
import { mockProperties } from '../data/mockProperties';

export function PropertyFilters() {
  const filters = usePropertyStore((state) => state.filters);
  const setFilter = usePropertyStore((state) => state.setFilter);
  const setPill = usePropertyStore((state) => state.setPill);
  const resetFilters = usePropertyStore((state) => state.resetFilters);

  const resultCount = useMemo(
    () => filterProperties(mockProperties, filters).length,
    [filters],
  );
  const activePill = getActivePill(filters);
  const hasActiveFilters =
    activePill !== 'Todos' ||
    Boolean(filters.search.trim()) ||
    filters.city !== 'Todas' ||
    filters.region !== 'Todas';

  return (
    <div className="rounded-3xl border border-line bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal size={16} className="text-brand-cyan" />
          <h3 className="font-display text-sm font-bold text-navy">
            Filtra tus propiedades
          </h3>
          {filters.region === 'Bolívar' && (
            <span className="rounded-full bg-brand-cyan/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
              Estado Bolívar
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-navy/50">
            <strong className="font-bold text-navy">{resultCount}</strong>{' '}
            {resultCount === 1 ? 'propiedad' : 'propiedades'}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/60 transition-colors hover:text-brand-cyan"
            >
              <RotateCcw size={13} /> Limpiar
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterPills.map((pill) => (
          <Pill
            key={pill}
            label={pill}
            active={activePill === pill}
            onClick={() => setPill(pill as FilterPill)}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="relative block w-full sm:max-w-sm">
          <Search
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy/40"
          />
          <input
            type="search"
            aria-label="Buscar propiedad"
            value={filters.search}
            onChange={(event) => setFilter('search', event.target.value)}
            placeholder="Busca por código, nombre o zona..."
            className="w-full rounded-xl border border-line bg-alabaster py-2.5 pl-9 pr-3 text-[13px] font-medium text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-brand-cyan"
          />
        </span>
        <p className="text-xs text-navy/45">
          Todas las propiedades están verificadas legalmente.
        </p>
      </div>
    </div>
  );
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300 ${
        active
          ? 'border-brand-yellow bg-brand-yellow text-navy shadow-[0_8px_20px_-12px_rgba(243,216,0,0.9)]'
          : 'border-line bg-alabaster text-navy/65 hover:border-brand-cyan hover:text-navy'
      }`}
    >
      {label}
    </button>
  );
}
