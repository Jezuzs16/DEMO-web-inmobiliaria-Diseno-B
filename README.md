# DEMO-web-inmobiliaria

Demo interactiva para **Inmobiliaria Negocios Globales**: catálogo de propiedades verificadas, animaciones GSAP, componentes estilo React Bits y un globo terráqueo 3D en la navegación.

## Ejecutar

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

## Comandos

- `npm run dev` — servidor de desarrollo.
- `npm run build` — verifica TypeScript y genera `dist/`.
- `npm run preview` — sirve la build de producción.
- `npm run typecheck` — solo comprobación de tipos.

## Stack

React 19 + Vite + TypeScript estricto · Tailwind CSS v4 · GSAP + ScrollTrigger (`useGSAP`) · Zustand · Three.js + React Three Fiber + drei · lucide-react.

## Identidad visual

Paleta oficial: alabastro cálido `#F9F8F6`, piedra suave `#EFECE6`, navy `#102331`, amarillo de marca `#F3D800` y celeste `#00A3E0` / `#38B2F6`. Tipografías: **Exo 2** para logotipo y titulares, **Montserrat** para textos. El logotipo replica el isotipo de globo con retícula amarilla y el bloque `inmobiliaria` / `NEGOCIOS GLOBALES`.

## Estructura

```
src/
├── components/
│   ├── layout/       Navbar3D, Footer, BrandLogo
│   ├── react-bits/   TiltedSpotlightCard, MagneticButton, SplitRevealText
│   └── three/        GlobalGlobe3D (wrapper) + escena R3F diferida
├── features/properties/
│   ├── components/   Hero, filtros, grilla, modal, bento, simulador
│   ├── data/         6 propiedades (ING-101…ING-106) y contacto
│   ├── store/        usePropertyStore
│   └── types/        property.types
├── lib/              gsap, formato de moneda, fallback de imágenes
├── App.tsx
└── main.tsx
```

## Notas

- El globo 3D usa `React.lazy` + `<Suspense fallback={null}>`, `dpr={[1,2]}` y un fallback SVG si no hay WebGL. La inclinación reactiva se desactiva en pantallas táctiles / < 768 px.
- La inclinación de tarjetas se desactiva en dispositivos táctiles y pantallas < 1024 px.
- Todas las imágenes tienen un `onError` con fallback limpio.
- Las fotografías provienen de URLs públicas y válidas de Unsplash; requieren conexión a internet.
- Los datos de contacto en `src/features/properties/data/mockProperties.ts` son de ejemplo: reemplazar por los reales del cliente.
