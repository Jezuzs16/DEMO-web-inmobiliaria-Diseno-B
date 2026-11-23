import { safeExternalUrl } from '../../../lib/safeLinks';
import type { Property } from '../types/property.types';

const DEFAULT_PHOTO = 'photo-1600596542815-ffad4c1539a9';

const photo = (id: string, width = 1400) => {
  const safeId = /^photo-[\w-]+$/.test(id) ? id : DEFAULT_PHOTO;
  const safeWidth = Math.min(Math.max(width, 200), 2400);
  return `https://images.unsplash.com/${safeId}?auto=format&fit=crop&w=${safeWidth}&q=80`;
};

/** Datos de contacto de demostración: reemplazar por los reales del cliente. */
export const CONTACT = {
  whatsapp: '584121234567',
  email: 'contacto@negociosglobales.com',
  phone: '+58 412 123 4567',
  address: 'Puerto Ordaz, Estado Bolívar, Venezuela',
} as const;

export const whatsappLink = (message: string) =>
  safeExternalUrl(
    `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`,
  );

export const mockProperties: Property[] = [
  {
    id: 'ING-101',
    title: 'Townhouse en Terrazas del Atlántico',
    operation: 'Venta',
    category: 'Townhouse',
    city: 'Puerto Ordaz',
    neighborhood: 'Terrazas del Atlántico',
    price: 85000,
    area: 185,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    badge: 'Exclusivo',
    featured: true,
    images: [
      photo('photo-1600596542815-ffad4c1539a9'),
      photo('photo-1600607687939-ce8a6c25118c'),
      photo('photo-1600210492486-724fe5c67fb0'),
    ],
    description:
      'Townhouse en conjunto residencial cerrado con patio privado, tres habitaciones y dos puestos de estacionamiento. Una oportunidad única en Terrazas del Atlántico, Puerto Ordaz, con espacios amplios y acompañamiento legal en cada etapa de la compra.',
    amenities: [
      'Patio privado',
      'Conjunto residencial',
      'Seguridad perimetral',
      '2 puestos de estacionamiento',
      'Áreas verdes',
      'Verificación legal',
    ],
  },
  {
    id: 'ING-102',
    title: 'Apartamento Vista al Río Caroní',
    operation: 'Venta',
    category: 'Apartamento',
    city: 'Puerto Ordaz',
    neighborhood: 'Alta Vista',
    price: 145000,
    area: 210,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    badge: 'Verificada',
    images: [
      photo('photo-1600585154340-be6161a56a0c'),
      photo('photo-1600566753086-00f18fb6b3ea'),
      photo('photo-1600607688969-a5bfcd646154'),
    ],
    description:
      'Amplio apartamento con vista al río Caroní, cuatro habitaciones y espacios sociales integrados. Propiedad verificada legalmente, ideal para familias que buscan comodidad y una ubicación privilegiada en Alta Vista.',
    amenities: [
      'Vista al río',
      'Ascensor',
      'Seguridad 24/7',
      '3 puestos de estacionamiento',
      'Balcón',
      'Verificación legal',
    ],
  },
  {
    id: 'ING-103',
    title: 'Quinta Familiar en Villa Alianza',
    operation: 'Venta',
    category: 'Casa',
    city: 'Puerto Ordaz',
    neighborhood: 'Villa Alianza',
    price: 195000,
    area: 320,
    bedrooms: 4,
    bathrooms: 4,
    parking: 4,
    badge: 'Oportunidad',
    images: [
      photo('photo-1564013799919-ab600027ffc6'),
      photo('photo-1512917774080-9991f1c4c750'),
      photo('photo-1600047509807-ba8f99d2cdde'),
    ],
    description:
      'Quinta familiar de grandes dimensiones con jardín, cuatro habitaciones y capacidad para cuatro vehículos. Una oportunidad de inversión en una zona consolidada de Puerto Ordaz.',
    amenities: [
      'Jardín',
      'Patio amplio',
      '4 puestos de estacionamiento',
      'Aire acondicionado',
      'Seguridad perimetral',
      'Verificación legal',
    ],
  },
  {
    id: 'ING-104',
    title: 'Local Comercial en Centro Empresarial',
    operation: 'Alquiler',
    category: 'Comercial',
    city: 'Puerto Ordaz',
    neighborhood: 'Centro Empresarial',
    price: 1500,
    priceSuffix: '/mes',
    area: 95,
    bedrooms: 0,
    bathrooms: 2,
    parking: 3,
    badge: 'Alquiler',
    images: [
      photo('photo-1441986300917-64674bd600d8'),
      photo('photo-1497366754035-f200968a6e72'),
      photo('photo-1497366811353-6870744d04b2'),
    ],
    description:
      'Local comercial con alta visibilidad en centro empresarial, dos baños y tres puestos de estacionamiento. Contrato transparente y asesoría dedicada durante todo el proceso.',
    amenities: [
      'Alta visibilidad',
      'Aire acondicionado',
      '3 puestos de estacionamiento',
      'Seguridad',
      'Contrato verificado',
    ],
  },
  {
    id: 'ING-105',
    title: 'Townhouse Amoblado en Los Olivos',
    operation: 'Alquiler',
    category: 'Townhouse',
    city: 'Puerto Ordaz',
    neighborhood: 'Los Olivos',
    price: 950,
    priceSuffix: '/mes',
    area: 150,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    badge: 'Alquiler',
    images: [
      photo('photo-1600566753190-17f0baa2a6c3'),
      photo('photo-1484154218962-a197022b5858'),
      photo('photo-1505693416388-ac5ce068fe85'),
    ],
    description:
      'Townhouse amoblado y listo para habitar, con tres habitaciones, tres baños y dos puestos de estacionamiento. Solución ideal para ejecutivos que llegan a Puerto Ordaz.',
    amenities: [
      'Amoblado',
      'Aire acondicionado',
      '2 puestos de estacionamiento',
      'Seguridad 24/7',
      'Áreas verdes',
    ],
  },
  {
    id: 'ING-106',
    title: 'Residencia Moderna en Ciudad Bolívar',
    operation: 'Venta',
    category: 'Casa',
    city: 'Ciudad Bolívar',
    neighborhood: 'La Florencia',
    price: 110000,
    area: 240,
    bedrooms: 3,
    bathrooms: 3,
    parking: 3,
    badge: 'Verificada',
    images: [
      photo('photo-1570129477492-45c003edd2be'),
      photo('photo-1600607688960-e095ff83135c'),
      photo('photo-1600566752355-35792bedcfea'),
    ],
    description:
      'Residencia de diseño moderno en Ciudad Bolívar, con tres habitaciones, tres baños y tres puestos de estacionamiento. Documentación verificada y acompañamiento de un agente dedicado.',
    amenities: [
      'Diseño moderno',
      '3 puestos de estacionamiento',
      'Patio',
      'Aire acondicionado',
      'Verificación legal',
    ],
  },
];
