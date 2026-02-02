# Project Apnapan – React + Tailwind

A React + Vite + Tailwind single-page experience showcasing Apnapan’s story: hero, teacher voices, team, partners, contributions, metrics, and actions with dark/light theming.

## Scripts
```bash
npm install
npm run dev     # start dev server
npm run build   # production build
npm run preview # preview build
```

## Features
- React + Vite with Tailwind utility styling
- Dark/light theme toggle with OS preference fallback
- Responsive grids for teachers, team, and partners
- Storytelling-friendly hero, contributions, metrics, and actions
- Reduced-motion support and lazy-loaded images

## Assets
Local image placeholders are referenced (`/logo.png`, `/ipsita.png`, `/alok.png`, `/butty.jpg`, `/educare.png`, `/globallearning.jpg`, `/brightfuture.png`). Replace them with your actual assets in the project root or `public/`.

## Notes
- `npm install` reported 2 moderate vulnerabilities (from dependencies). Run `npm audit` to review or `npm audit fix --force` if you accept potential breaking changes.
