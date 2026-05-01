# SYNAPTIC CINEMA — Rebuild Tasks

## Phase 1 — Foundation
- [x] Remove old dependencies (`@react-three/drei`, `@react-three/fiber`, `@studio-freight/lenis`, `three`, `encoding`)
- [x] Add new dependencies (`tailwindcss`, `postcss`, `autoprefixer`, `gsap`)
- [x] Create `tailwind.config.js` with brutalist tokens
- [x] Create `postcss.config.js`
- [x] Rewrite `app/globals.css` with Tailwind and custom effects
- [x] Update `next.config.js`
- [x] Update `jsconfig.json` with aliases

## Phase 2 — Root Layout + Global Components
- [x] Rename `app/layout.js` to `app/layout.jsx` and update font loading
- [x] Create `components/Sidebar.jsx`
- [x] Create `components/Topbar.jsx`
- [x] Create `components/BottomTicker.jsx`
- [x] Create `components/GlitchOverlay.jsx`
- [x] Create `components/CustomCursor.jsx`
- [x] Create `components/NoiseOverlay.jsx`
- [x] Create `components/ScanLine.jsx`
- [x] Create `components/GridLines.jsx`
- [x] Create new `app/(main)/layout.jsx` shell and delete old one

## Phase 3 — Shared Hooks & Utilities
- [x] Create `hooks/useCursor.js`
- [x] Create `hooks/useGlitch.js`
- [x] Create `hooks/useParallax.js`
- [x] Create `hooks/useMovies.js`
- [x] Create `lib/movies.js`
- [x] Create `lib/utils.js`

## Phase 4 — Shared Components
- [x] Create `components/MovieCard.jsx`
- [x] Create `components/MagneticButton.jsx`
- [x] Create `components/RippleButton.jsx`
- [x] Create `components/LensGraphic.jsx`
- [x] Create `components/MoodBars.jsx`

## Phase 5 — Splash, Home, Exhibition, Collection
- [x] Update `app/page.jsx` (Auth Splash) to brutalist style
- [x] Create `app/home/page.jsx`
- [x] Create `app/exhibition/page.jsx`
- [x] Create `app/collection/page.jsx`

## Phase 6 — Analysis, Search, Profile
- [x] Create `app/analysis/page.jsx`
- [x] Create `app/search/page.jsx`
- [x] Create `app/profile/page.jsx`

## Phase 7 — Settings Page & TMDB Integration
- [x] Create `app/settings/page.jsx`
- [x] Integrate TMDB fetching with `services/api.js` for dynamic content

## Phase 8 — Cleanup
- [x] Delete old 3D components
- [x] Delete old route directories (`app/(main)/Home`, etc.)
- [x] Delete old CSS files

## Phase 9 — Polish
- [x] Verify glitch transitions and custom cursor
- [x] Test across resolutions
- [x] Ensure Lighthouse performance
