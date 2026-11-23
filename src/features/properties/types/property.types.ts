export type OperationType = 'Venta' | 'Alquiler';

export type PropertyCategory =
  | 'Townhouse'
  | 'Apartamento'
  | 'Casa'
  | 'Comercial';

export type PropertyBadge =
  | 'Exclusivo'
  | 'Verificada'
  | 'Oportunidad'
  | 'Alquiler';

export interface Property {
  /** Código de referencia, p. ej. ING-101 */
  id: string;
  title: string;
  operation: OperationType;
  category: PropertyCategory;
  city: string;
  neighborhood: string;
  /** Precio en dólares estadounidenses (USD) */
  price: number;
  /** Sufijo para operaciones de alquiler, p. ej. "/mes" */
  priceSuffix?: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  badge: PropertyBadge;
  featured?: boolean;
  images: string[];
  description: string;
  amenities: string[];
}

export type FilterPill =
  | 'Todos'
  | 'Venta'
  | 'Alquiler'
  | 'Townhouse'
  | 'Apartamentos'
  | 'Comercial';

export const filterPills: FilterPill[] = [
  'Todos',
  'Venta',
  'Alquiler',
  'Townhouse',
  'Apartamentos',
  'Comercial',
];

export const BOLIVAR_CITIES = [
  'Puerto Ordaz',
  'San Félix',
  'Ciudad Bolívar',
  'Upata',
] as const;

export interface PropertyFilters {
  operation: OperationType | 'Todas';
  category: PropertyCategory | 'Todos';
  city: string;
  search: string;
  region: 'Todas' | 'Bolívar';
}
