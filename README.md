# Simple Next.js Blog

A minimal blog built with Next.js.

## Features

- Markdown-based posts (store posts in /posts or /content as .md)
- Static generation with Next.js (getStaticProps / getStaticPaths)
- Simple routing for post slugs
- Ready for deployment to Vercel or GitHub (see Deploy)

## Tech stack

- Next.js (React)
- Node.js (>= 16/18 recommended)
- Optional: any CSS solution (Tailwind/CSS modules) and markdown parser (gray-matter, remark)

## Quick start

1. Clone the repo:
   git clone <repo-url>
   cd next-app

2. Install dependencies:
   npm install

   # or

   yarn

   # or

   pnpm install

3. Run in development:
   npm run dev

   # opens on http://localhost:3000

4. Build for production:
   npm run build
   npm start

## Typical scripts

- npm run dev — start dev server
- npm run build — build production assets
- npm run start — start server after build
- npm run export — (optional) static export for GitHub Pages if configured

## Contributing

- Fork, add changes, open a PR. Keep changes small and focused.
