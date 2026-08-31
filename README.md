# Invitación a cena formal

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrí la dirección que muestra la terminal, normalmente `http://localhost:5173`.

## Generar la versión de producción

```bash
npm run build
npm run preview
```

Vite genera el sitio optimizado en `dist/`.

## Publicar en Vercel

1. Subí esta carpeta a un repositorio de GitHub.
2. En Vercel elegí **Add New → Project** e importá el repositorio.
3. Vercel detectará Vite automáticamente; presioná **Deploy**.

También podés desplegar desde la terminal con `npx vercel` y publicar la versión definitiva con `npx vercel --prod`.

Para personalizar fecha, hora, lugar y textos, editá el bloque `<section class="film">` de `index.html`.
