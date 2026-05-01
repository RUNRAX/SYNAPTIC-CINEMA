# Synaptic Cinema — Full Fix & Feature Restoration Plan

This plan addresses **7 critical issues** identified across the codebase: broken face-api.js integration, missing TMDB poster display, hardcoded demo data in analysis, missing settings features, and broken movie recommendation flow.

---

## Diagnosed Issues Summary

| # | Issue | Root Cause | Severity |
|---|-------|-----------|----------|
| 1 | **Analysis page shows fake data** | `startAnalysis()` uses `setTimeout` with hardcoded values `{happy:12, neutral:65...}` instead of calling `detectDominantEmotion()` from `lib/faceApi.js` | 🔴 Critical |
| 2 | **face-api.js never actually used** | Analysis page imports neither `loadFaceApiModels()` nor `detectDominantEmotion()` — the entire faceApi.js library is unused | 🔴 Critical |
| 3 | **Movie posters never display** | `MovieCard.jsx` never renders an `<img>` tag — it only shows a colored `div` with halftone SVG. The `movie.poster` field exists but is ignored | 🔴 Critical |
| 4 | **Static demo movies dominate** | `useMovies.js` merges `MOVIES` (16 hardcoded items with `/placeholder.jpg`) with API data. The hardcoded `MOVIES` array has no real poster URLs | 🟡 Major |
| 5 | **Settings page missing key features** | No dark mode toggle, no IMDB rating filter, no custom mood-genre mapping. Only has: high performance, haptics, data saver, auto-play, camera access | 🟡 Major |
| 6 | **Mood-based recommendations not rendered** | Analysis page detects mood but never calls the `/api/recommendations?emotion=X` endpoint to fetch mood-matched movies | 🔴 Critical |
| 7 | **No emotion API route** | `app/api/emotion/` directory is empty — no route exists for the Python backend emotion detection endpoint | 🟡 Major |

---

## User Review Required

> [!IMPORTANT]
> **Dark Mode Implementation**: The current design is a brutalist cream/black editorial theme. Adding dark mode means creating a full alternate color scheme (dark background, light text). The plan below implements this as a CSS class toggle (`data-theme="dark"`) on the `<html>` element. Is this the approach you want?

> [!IMPORTANT]
> **TMDB API Key**: The `.env.local` file is empty (no `TMDB_API_KEY`). The code has a fallback key `e16728764eeafcf3bc42279f1d444aff` hardcoded in `lib/server/tmdb.js`. This will work, but is not ideal for production. Do you want to set your own key?

> [!WARNING]
> **Removing static demo movies**: The 16 hardcoded movies in `lib/movies.js` all point to `/placeholder.jpg` (which doesn't exist). The plan is to **replace them entirely with TMDB API data**. The `useMovies` hook and all pages that consume it will be rewired to use only real TMDB data. Are you okay with removing the hardcoded fallback completely?

---

## Proposed Changes

### Component 1 — Face-API.js & Analysis Page (Real Facial Detection)

The analysis page currently fakes the entire scanning pipeline with a `setTimeout`. This component rewires it to use the actual `face-api.js` library.

#### [MODIFY] [faceApi.js](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/lib/faceApi.js)

- Reduce `inputSize` from `320` to `224` for faster initial detection
- Add a `preloadModels()` function that begins model download on app mount (not on camera click), so the camera feels instant
- Add error handling for model loading failures with user-friendly states

#### [MODIFY] [page.jsx (analysis)](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/(main)/analysis/page.jsx)

Major rewrite of `startAnalysis()`:
1. Import `loadFaceApiModels` and `detectDominantEmotion` from `@/lib/faceApi`
2. Begin model preloading in a `useEffect` on component mount (not on click) — this is the key to "quick camera initialization"
3. When "Initialize Camera" is clicked: only start `getUserMedia()` (models are already loaded)
4. Run `detectDominantEmotion(videoRef.current)` in a polling loop (every ~1.5s) to get real expression data
5. After 3-4 stable readings, lock in the dominant emotion
6. Map the detected emotion to a genre using `EMOTION_GENRE_MAP` logic
7. Display real percentages in the `MoodBars` component
8. After scan completes, call `/api/recommendations?emotion={detected}` to fetch mood-based movies
9. Show the fetched movies in a new results section below the metrics panel

---

### Component 2 — Movie Poster Display (Fix MovieCard)

The MovieCard component completely ignores the `movie.poster` URL. It renders a background color + halftone SVG but never an `<img>`.

#### [MODIFY] [MovieCard.jsx](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/components/MovieCard.jsx)

- Add an `<img>` tag that renders `movie.poster` as the card's visual background
- Keep the gradient overlay, genre text, and metadata on top
- Add loading/error states: show the halftone background only as fallback when no poster exists
- Use `loading="lazy"` for performance
- Show rating badge (`movie.vote_average`) when available
- MovieCard CSS already defines `.movie-poster` and `.movie-info` classes — use those

#### [MODIFY] [MovieCard.css](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/components/MovieCard.css)

- The CSS is from an older "dark frosted glass" design but still has useful poster/info styles
- Align the CSS with the brutalist theme while preserving hover animations
- Ensure the poster image fills the card properly

---

### Component 3 — Remove Hardcoded Movies, Use Real TMDB Data

#### [MODIFY] [movies.js](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/lib/movies.js)

- Remove the 16 hardcoded `MOVIES` array entries with `/placeholder.jpg`
- Keep `GENRES` export for filter UI

#### [MODIFY] [useMovies.js](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/hooks/useMovies.js)

- Remove import of `MOVIES` from `lib/movies`
- Fetch movies from `/api/home_content` (the Next.js API route that calls `fetchHomeContent()` from TMDB)
- The response has `trending`, `featuredMovies`, `popularSeries` — flatten into a single browsable list
- Data already comes pre-formatted from `formatContent()` with proper `poster` URLs (e.g., `https://image.tmdb.org/t/p/w500/...`)
- Add loading and error states

#### [MODIFY] [page.jsx (collection)](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/(main)/collection/page.jsx)

- Add loading skeleton UI while movies load
- Wire up movie click to navigate to `/exhibition` or a detail view

#### [MODIFY] [page.jsx (search)](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/(main)/search/page.jsx)

- Replace `useMovies` with direct call to `/api/search?query=X` for real TMDB search
- Add debounced search input
- Show loading skeleton during search

---

### Component 4 — Settings Page (Dark Mode, IMDB Filter, Mood-Genre Config)

The current settings page only has 5 toggles. These critical features are missing.

#### [MODIFY] [page.jsx (settings)](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/(main)/settings/page.jsx)

Add three new settings sections:

**Section: Appearance**
- **Dark Mode Toggle** — Saves `theme` to localStorage and applies `data-theme="dark"` to `<html>`
- When dark mode is on: background becomes `#0A0A0A`, text becomes cream, sidebar stays dark, all borders invert

**Section: Content Filters**
- **Minimum IMDB Rating Slider** — Range from 6.0 to 9.0, step 0.5
- Stored in localStorage as `minImdbRating`
- Passed to `/api/recommendations?minImdbRating=X` when fetching mood-based movies

**Section: Custom Mood-Genre Mapping**
- For each emotion (happy, sad, angry, surprised, neutral, fear), show a multi-select of genres
- User can override which genres map to which mood
- Stored in localStorage as `customMoodGenres`
- Passed to `/api/recommendations?genreOverrideIds=X,Y,Z`

**All settings persist via localStorage and are read by the analysis page and search filters.**

#### [MODIFY] [globals.css](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/globals.css)

- Add `[data-theme="dark"]` CSS variables that override the base `:root` values
- Dark cream → `#0A0A0A`, dark cream-2 → `#141414`, text → `#F2EDE3`, etc.

#### [MODIFY] [layout.jsx (root)](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/layout.jsx)

- Add a client-side script/component that reads `theme` from localStorage on mount and applies `data-theme` to prevent flash of wrong theme

---

### Component 5 — Mood-Based Movie Recommendations After Scan

#### [MODIFY] [page.jsx (analysis)](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/(main)/analysis/page.jsx)

After the face scan completes and a mood is detected:
1. Read `minImdbRating` and `customMoodGenres` from localStorage (the settings)
2. Call `/api/recommendations?emotion={detected}&minImdbRating={X}&genreOverrideIds={Y}`
3. Render the returned movies/series using `MovieCard` components in a horizontal slider or grid below the metrics panel
4. Add a "View All" button that navigates to `/collection?genre={recommended}`

#### [NEW] [MovieSliderSection.jsx](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/components/MovieSliderSection.jsx)

- A reusable section component that takes a title and array of movies
- Renders a horizontal scrolling row of `MovieCard` components with TMDB poster images
- Used on both the analysis results page and the home page

---

### Component 6 — Home Page Dynamic Content

#### [MODIFY] [page.jsx (home)](file:///d:/RAKSHIT/PROJECTS/MAIN%20PROJECT/WORKING%20MODEL/app/(main)/home/page.jsx)

- Fetch real data from `/api/home_content` on mount
- Replace the static `40+` stat values with actual counts from the API response
- Add a "Trending Now" movie slider section below the hero

---

## Verification Plan

### Manual Verification
1. **Face Scan Test**: Open Analysis page → click "Initialize Camera" → verify camera opens quickly (models preloaded) → verify real emotion percentages appear in MoodBars → verify mood maps to correct genre
2. **Movie Posters**: Navigate to Collection → verify all cards show TMDB poster images (no blank/colored rectangles)
3. **Settings**: Open Settings → toggle dark mode → verify entire app switches theme → set IMDB filter → set custom mood genres → verify these persist on page reload
4. **Mood Recommendations**: Complete a face scan → verify real movies appear below results, fetched from TMDB based on detected emotion
5. **Search**: Type a movie name → verify real TMDB results appear with posters
6. **Home Stats**: Verify home page shows real counts and trending movie slider

### Build Verification
```bash
npm run build
```
Ensure no build errors after all changes.
