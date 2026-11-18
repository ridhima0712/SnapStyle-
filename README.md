# SNAP STYLE — Fit in a Bit

Instant-fashion delivery storefront built with React, TypeScript, Tailwind CSS, and Vite.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

This project includes a pre-configured `vercel.json` for zero-config Vercel deployment:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Routing:** Client-side routes (`/`, `/our-story`, `/shop`, `/contact`) are automatically rewritten to `/index.html`.
