# Graph Report - .  (2026-04-21)

## Corpus Check
- 37 files · ~11,485,086 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 113 nodes · 101 edges · 33 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]

## God Nodes (most connected - your core abstractions)
1. `tmdbFetch()` - 8 edges
2. `GET()` - 5 edges
3. `is_cache_valid()` - 5 edges
4. `format_content()` - 4 edges
5. `fetch_tmdb_details_async()` - 4 edges
6. `format_details()` - 4 edges
7. `fetchFromDiscover()` - 4 edges
8. `get_details()` - 3 edges
9. `Movie` - 3 edges
10. `Review` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (12): fetch_tmdb_details_async(), format_content(), format_details(), get_details(), get_home_content(), is_cache_valid(), load_all_models(), Loads the face detector and emotion recognizer into memory. (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.26
Nodes (13): addParams(), fetchBalancedContent(), fetchBroadGenreFallback(), fetchDetails(), fetchFromDiscover(), fetchHomeContent(), fetchRecommendations(), fetchSingleGenre() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.25
Nodes (0): 

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (1): GET()

### Community 4 - "Community 4"
Cohesion: 0.4
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 0.5
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 0.5
Nodes (1): Movie

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (1): Review

### Community 8 - "Community 8"
Cohesion: 0.67
Nodes (2): detectDominantEmotion(), loadFaceApiModels()

### Community 9 - "Community 9"
Cohesion: 0.67
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (1): CastMember

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **4 isolated node(s):** `Checks if a cache entry exists and is not expired.`, `Asynchronously fetches details, now with caching.`, `Loads the face detector and emotion recognizer into memory.`, `A more detailed formatter for the MovieDetails page.`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 11`** (2 nodes): `layout.js`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (2 nodes): `page.js`, `Welcome()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `layout.js`, `MainLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `page.js`, `Home()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (2 nodes): `page.js`, `Profile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (2 nodes): `page.js`, `Search()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `page.js`, `Settings()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `page.js`, `Synaptic()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `FloatingAstronaut.jsx`, `FloatingAstronaut()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `GalaxySystem.jsx`, `GalaxySystem()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `layout.jsx`, `Layout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `MovieCard.jsx`, `MovieCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `MovieCardSkeleton.jsx`, `MovieCardSkeleton()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `MovieGrid.jsx`, `MovieGrid()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `MovieSlider.jsx`, `MovieSlider()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `PersistentBackground.jsx`, `PersistentBackground()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `ShootingStars.jsx`, `ShootingStars()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `Starfield.jsx`, `Starfield()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `createPageUrl()`, `createPageUrl.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `next.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `User.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Checks if a cache entry exists and is not expired.`, `Asynchronously fetches details, now with caching.`, `Loads the face detector and emotion recognizer into memory.` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._