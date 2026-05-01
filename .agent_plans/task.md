# Synaptic Cinema — Polish & Features Task Checklist

- [x] **Phase 1: Details Page Polish**
  - [x] Update `app/(main)/details/page.jsx` to show full-color poster (remove `mix-blend-luminosity`, set opacity-80).
  - [x] Add `overflow-hidden min-w-0` to the left column parent div to fix Cast section scrolling.
- [x] **Phase 2: Uniform Movie Card Layout**
  - [x] Update `components/MovieSliderSection.jsx` to enforce `max-w` for cards.
  - [x] Update `components/MovieCard.jsx` to enforce `h-full`.
  - [x] Update `components/MovieGrid.css` to use `repeat(auto-fill, minmax(200px, 240px))` with center alignment.
- [x] **Phase 3: Analysis Page Multi-Genre Dropdown**
  - [x] Update `app/(main)/analysis/page.jsx` to render genre pills when multiple genres are available instead of a single text block.
- [x] **Phase 4: Global Accent Color**
  - [x] Update `app/globals.css` to change `--accent` from `#C8FF00` to `#FF2D2D`.
  - [x] Update scanline hardcoded color in `app/globals.css`.
- [x] **Phase 5: Minimum 100 Content Items & Strict IMDB Filter**
  - [x] Update `lib/server/tmdb.js` `fetchHomeContent`, `fetchRecommendations`, `fetchSimilar`, and `searchTmdb` to fetch more pages.
  - [x] Update `lib/server/tmdb.js` to fix the `minVoteAverage - 0.7` bug in `fetchBroadGenreFallback`.
  - [x] Ensure all `vote_average.gte` queries in `lib/server/tmdb.js` enforce a minimum of 6.0.
- [x] **Phase 6: Glitch Transition Duration**
  - [x] Update `components/GlitchOverlay.jsx` to hold the transition for 1 full second.
