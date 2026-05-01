# Synaptic Cinema — Task Checklist

## Component 1 — Face-API.js & Analysis Page
- [x] Update `lib/faceApi.js` for faster initialization (reduce `inputSize` to `224`)
- [x] Add `preloadModels()` to `lib/faceApi.js`
- [x] Rewrite `app/(main)/analysis/page.jsx` to use real `detectDominantEmotion`
- [x] Implement camera startup on click (with models preloaded)
- [x] Create polling loop for stable readings
- [x] Map detected emotion to genre
- [x] Update `MoodBars` with real percentages

## Component 2 — Movie Poster Display
- [x] Modify `components/MovieCard.jsx` to render an `<img>` tag with `movie.poster`
- [x] Add fallback state (halftone pattern) when no poster exists
- [x] Align `components/MovieCard.css` with the new design

## Component 3 — Remove Demo Data, Use TMDB
- [x] Clean up `lib/movies.js` (remove hardcoded `MOVIES`)
- [x] Update `hooks/useMovies.js` to fetch from `/api/home_content`
- [x] Update `app/(main)/collection/page.jsx` with loading states
- [x] Update `app/(main)/search/page.jsx` to hit `/api/search?query=X`

## Component 4 — Settings Page & Dark Mode
- [x] Add `[data-theme="dark"]` variables to `app/globals.css`
- [x] Update `app/layout.jsx` with theme initialization script
- [x] Rewrite `app/(main)/settings/page.jsx` to include new sections:
  - [x] Dark Mode toggle
  - [x] Minimum IMDB Rating slider
  - [x] Custom Mood-Genre Mapping multi-selects

## Component 5 — Recommendations Flow
- [x] Create `components/MovieSliderSection.jsx`
- [x] Update `app/(main)/analysis/page.jsx` to fetch recommendations after scan
- [x] Pass settings (IMDB min, genre overrides) to the recommendation API
- [x] Render fetched movies below the analysis metrics

## Component 6 — Home Page Dynamics
- [x] Fetch data in `app/(main)/home/page.jsx`
- [x] Render dynamic stats
- [x] Add trending movies slider

## Wrap Up
- [x] Final manual verification of all flows
- [x] Clear memory checkpoint
