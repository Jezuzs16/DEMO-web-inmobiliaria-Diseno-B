import type { SyntheticEvent } from 'react';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#EFECE6"/>
  <circle cx="400" cy="270" r="74" fill="none" stroke="#00A3E0" stroke-width="6"/>
  <path d="M326 270h148M400 196v148M343 213h114M343 327h114" stroke="#F3D800" stroke-width="5"/>
  <text x="400" y="420" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="28" font-weight="600" fill="#102331">Imagen no disponible</text>
</svg>`;

export const IMAGE_FALLBACK = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

export function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.dataset.fallback === '1') return;
  image.dataset.fallback = '1';
  image.src = IMAGE_FALLBACK;
}
