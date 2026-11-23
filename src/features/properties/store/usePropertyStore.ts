import { create } from 'zustand';
import {
  BOLIVAR_CITIES,
  type FilterPill,
  type Property,
  type PropertyFilters,
} from '../types/property.types';

export const defaultFilters: PropertyFilters = {
  operation: 'Todas',
  category: 'Todos',
  city: 'Todas',
  search: '',
  region: 'Todas',
};

interface PropertyState {
  filters: PropertyFilters;
  favorites: string[];
  selectedPropertyId: string | null;
  advisoryOpen: boolean;
  setFilter: <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K],
  ) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  setPill: (pill: FilterPill) => void;
  resetFilters: () => void;
  showBolivar: () => void;
  toggleFavorite: (id: string) => void;
  openProperty: (id: string) => void;
  closeProperty: () => void;
  openAdvisory: () => void;
  closeAdvisory: () => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  filters: defaultFilters,
  favorites: [],
  selectedPropertyId: null,
  advisoryOpen: false,
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setPill: (pill) =>
    set((state) => ({
      filters: {
        ...state.filters,
        region: 'Todas',
        operation:
          pill === 'Venta' || pill === 'Alquiler' ? pill : 'Todas',
        category:
          pill === 'Townhouse'
            ? 'Townhouse'
            : pill === 'Apartamentos'
              ? 'Apartamento'
              : pill === 'Comercial'
                ? 'Comercial'
                : 'Todos',
      },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  showBolivar: () =>
    set({
      filters: {
        ...defaultFilters,
        region: 'Bolívar',
        city: 'Todas',
      },
    }),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((favorite) => favorite !== id)
        : [...state.favorites, id],
    })),
  openProperty: (id) => set({ selectedPropertyId: id }),
  closeProperty: () => set({ selectedPropertyId: null }),
  openAdvisory: () => set({ advisoryOpen: true }),
  closeAdvisory: () => set({ advisoryOpen: false }),
}));

export function getActivePill(filters: PropertyFilters): FilterPill {
  if (filters.operation === 'Venta' && filters.category === 'Todos')
    return 'Venta';
  if (filters.operation === 'Alquiler' && filters.category === 'Todos')
    return 'Alquiler';
  if (filters.category === 'Townhouse') return 'Townhouse';
  if (filters.category === 'Apartamento') return 'Apartamentos';
  if (filters.category === 'Comercial') return 'Comercial';
  return 'Todos';
}

/** Filtrado puro y sincronizado: se llama desde useMemo en los componentes. */
export function filterProperties(
  properties: Property[],
  filters: PropertyFilters,
): Property[] {
  const search = filters.search.trim().toLowerCase();

  return properties.filter((property) => {
    if (
      filters.operation !== 'Todas' &&
      property.operation !== filters.operation
    ) {
      return false;
    }
    if (
      filters.category !== 'Todos' &&
      property.category !== filters.category
    ) {
      return false;
    }
    if (filters.city !== 'Todas' && property.city !== filters.city) {
      return false;
    }
    if (
      filters.region === 'Bolívar' &&
      !(BOLIVAR_CITIES as readonly string[]).includes(property.city)
    ) {
      return false;
    }
    if (!search) return true;

    return [
      property.title,
      property.city,
      property.neighborhood,
      property.category,
      property.operation,
      property.id,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search);
  });
}
