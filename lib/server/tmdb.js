const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY_FALLBACK = 'e16728764eeafcf3bc42279f1d444aff'
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280'
const DEFAULT_REVALIDATE_SECONDS = 3600

export const GENRE_MAP = {
  movie: {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    'Sci-Fi': 878,
    'TV Movie': 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
  },
  tv: {
    'Action & Adventure': 10759,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Kids: 10762,
    Mystery: 9648,
    News: 10763,
    Reality: 10764,
    'Sci-Fi & Fantasy': 10765,
    Soap: 10766,
    Talk: 10767,
    'War & Politics': 10768,
    Western: 37,
  },
}

const EMOTION_GENRE_MAP = {
  happy: { movie: [35, 16, 12, 10751], tv: [35, 16, 10751] },
  sad: { movie: [18, 99, 10402], tv: [18, 99] },
  angry: { movie: [28, 53, 80], tv: [10759, 80, 10768] },
  fear: { movie: [27, 9648, 53], tv: [9648, 10765] },
  surprise: { movie: [12, 14, 878, 9648], tv: [10765, 12, 9648] },
  neutral: { movie: [18, 99, 36, 10752], tv: [99, 10763, 10767] },
}

const MOVIE_TO_TV_GENRE_MAP = {
  27: [9648],
  36: [10768],
  53: [80],
  878: [10765],
  10749: [18],
  10752: [10768],
}

function getTmdbApiKey() {
  return process.env.TMDB_API_KEY || TMDB_API_KEY_FALLBACK
}

function addParams(url, params) {
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    url.searchParams.set(key, String(value))
  })
}

async function tmdbFetch(path, params = {}, options = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`)

  addParams(url, {
    api_key: getTmdbApiKey(),
    language: 'en-US',
    include_adult: 'false',
    ...params,
  })

  const response = await fetch(url.toString(), {
    next: {
      revalidate: options.revalidate ?? DEFAULT_REVALIDATE_SECONDS,
    },
  })

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status}) for ${path}`)
  }

  return response.json()
}

function getGenreName(item, contentType) {
  if (item?.genres?.length) {
    return item.genres[0]?.name ?? 'N/A'
  }

  const firstGenreId = item?.genre_ids?.[0]
  if (!firstGenreId) {
    return 'N/A'
  }

  const entry = Object.entries(GENRE_MAP[contentType] || {}).find(([, value]) => value === firstGenreId)
  return entry?.[0] ?? 'N/A'
}

export function formatContent(item, contentType, options = {}) {
  const requirePoster = options.requirePoster ?? true

  if (!item || (requirePoster && !item.poster_path)) {
    return null
  }

  return {
    id: item.id,
    title: contentType === 'movie' ? item.title : item.name,
    poster: item.poster_path ? `${POSTER_BASE_URL}${item.poster_path}` : null,
    vote_average: item.vote_average ?? 0,
    overview: item.overview ?? '',
    description: item.overview ?? '',
    year: ((contentType === 'movie' ? item.release_date : item.first_air_date) || '').slice(0, 4),
    type: contentType,
    genre: getGenreName(item, contentType),
  }
}

export async function fetchFromDiscover(contentType, params, numPages = 1, revalidate = DEFAULT_REVALIDATE_SECONDS) {
  const allResults = []

  for (let page = 1; page <= numPages; page += 1) {
    const data = await tmdbFetch(`/discover/${contentType}`, { ...params, page }, { revalidate })
    const results = data?.results ?? []

    if (!results.length) {
      break
    }

    allResults.push(...results)
  }

  return allResults
}

export async function fetchHomeContent() {
  const trendingParams = { sort_by: 'popularity.desc', 'vote_count.gte': 500 }
  const featuredParams = { sort_by: 'vote_average.desc', 'vote_count.gte': 1500 }
  const popularSeriesParams = { sort_by: 'popularity.desc', 'vote_count.gte': 500 }

  const [trendingMovies, trendingSeries, featuredMovies, popularSeries] = await Promise.all([
    fetchFromDiscover('movie', trendingParams),
    fetchFromDiscover('tv', trendingParams),
    fetchFromDiscover('movie', featuredParams, 2),
    fetchFromDiscover('tv', popularSeriesParams, 2),
  ])

  return {
    trending: [
      ...trendingMovies.map((item) => formatContent(item, 'movie')).filter(Boolean),
      ...trendingSeries.map((item) => formatContent(item, 'tv')).filter(Boolean),
    ],
    featuredMovies: featuredMovies.map((item) => formatContent(item, 'movie')).filter(Boolean),
    popularSeries: popularSeries.map((item) => formatContent(item, 'tv')).filter(Boolean),
  }
}

export async function searchTmdb(searchParams) {
  const query = (searchParams.get('query') || '').trim().toLowerCase()

  if (query) {
    const data = await tmdbFetch('/search/multi', { query }, { revalidate: 300 })

    return {
      movies: (data?.results ?? [])
        .filter((item) => item.media_type === 'movie')
        .map((item) => formatContent(item, 'movie'))
        .filter(Boolean),
      series: (data?.results ?? [])
        .filter((item) => item.media_type === 'tv')
        .map((item) => formatContent(item, 'tv'))
        .filter(Boolean),
    }
  }

  const contentTypeFilter = searchParams.get('type') || 'all'
  const genreFilter = searchParams.get('genre') || 'all'
  const yearFilter = searchParams.get('year') || 'all'
  const ratingFilter = searchParams.get('rating') || 'all'

  let minRating = 6
  if (ratingFilter !== 'all') {
    minRating = Math.max(minRating, Number(ratingFilter))
  }

  const baseParams = {
    sort_by: 'popularity.desc',
    without_keywords: '9711,236775,1304,210024,14916,1828',
    'vote_average.gte': Number.isFinite(minRating) ? minRating : 6,
  }

  const requests = []

  if (contentTypeFilter === 'all' || contentTypeFilter === 'movie') {
    const movieParams = { ...baseParams }

    if (genreFilter !== 'all' && GENRE_MAP.movie[genreFilter]) {
      movieParams.with_genres = GENRE_MAP.movie[genreFilter]
    }

    if (yearFilter !== 'all') {
      movieParams.primary_release_year = yearFilter
    }

    if (genreFilter === 'Romance') {
      movieParams.certification_country = 'US'
      movieParams['certification.lte'] = 'PG-13'
    }

    requests.push(fetchFromDiscover('movie', movieParams, 1, 600))
  } else {
    requests.push(Promise.resolve([]))
  }

  if (contentTypeFilter === 'all' || contentTypeFilter === 'tv') {
    const tvParams = { ...baseParams }

    if (genreFilter !== 'all' && GENRE_MAP.tv[genreFilter]) {
      tvParams.with_genres = GENRE_MAP.tv[genreFilter]
    }

    if (yearFilter !== 'all') {
      tvParams.first_air_date_year = yearFilter
    }

    requests.push(fetchFromDiscover('tv', tvParams, 1, 600))
  } else {
    requests.push(Promise.resolve([]))
  }

  const [moviesRaw, seriesRaw] = await Promise.all(requests)

  return {
    movies: moviesRaw.map((item) => formatContent(item, 'movie')).filter(Boolean),
    series: seriesRaw.map((item) => formatContent(item, 'tv')).filter(Boolean),
  }
}

function scoreItem(item) {
  return (item.vote_average || 0) * 10 + (item.popularity || 0) * 0.15 + (item.vote_count || 0) * 0.002
}

async function fetchSingleGenre(contentType, genreId, minVoteAverage) {
  const voteCount = contentType === 'movie' ? 180 : 80

  const primary = await tmdbFetch(
    `/discover/${contentType}`,
    {
      with_genres: String(genreId),
      sort_by: 'popularity.desc',
      'vote_count.gte': voteCount,
      'vote_average.gte': minVoteAverage,
      page: 1,
    },
    { revalidate: 1800 }
  )

  return primary?.results ?? []
}

async function fetchBroadGenreFallback(contentType, genreIds, minVoteAverage) {
  const fallback = await tmdbFetch(
    `/discover/${contentType}`,
    {
      with_genres: genreIds.join('|'),
      sort_by: 'popularity.desc',
      'vote_count.gte': contentType === 'movie' ? 100 : 40,
      'vote_average.gte': Math.max(6, minVoteAverage - 0.7),
      page: 1,
    },
    { revalidate: 1800 }
  )

  return fallback?.results ?? []
}

async function fetchBalancedContent(contentType, genreIds, totalItemsTarget, minVoteAverage) {
  if (!genreIds.length) {
    return []
  }

  const uniqueGenreIds = [...new Set(genreIds)]
  const genreBuckets = await Promise.all(
    uniqueGenreIds.map(async (genreId) => ({
      genreId,
      items: await fetchSingleGenre(contentType, genreId, minVoteAverage),
    }))
  )

  const rawItems = []
  const seenIds = new Set()
  let round = 0

  while (rawItems.length < totalItemsTarget && round < 8) {
    let addedInRound = 0

    for (const bucket of genreBuckets) {
      const candidate = bucket.items[round]

      if (!candidate || seenIds.has(candidate.id)) {
        continue
      }

      seenIds.add(candidate.id)
      rawItems.push(candidate)
      addedInRound += 1

      if (rawItems.length >= totalItemsTarget) {
        break
      }
    }

    if (addedInRound === 0) {
      break
    }

    round += 1
  }

  if (rawItems.length < Math.ceil(totalItemsTarget * 0.6)) {
    const fallbackItems = await fetchBroadGenreFallback(contentType, uniqueGenreIds, minVoteAverage)

    for (const item of fallbackItems) {
      if (seenIds.has(item.id)) {
        continue
      }

      seenIds.add(item.id)
      rawItems.push(item)

      if (rawItems.length >= totalItemsTarget) {
        break
      }
    }
  }

  return rawItems
    .sort((left, right) => scoreItem(right) - scoreItem(left))
    .map((item) => formatContent(item, contentType))
    .filter(Boolean)
    .slice(0, totalItemsTarget)
}

export async function fetchRecommendations(searchParams) {
  const emotion = (searchParams.get('emotion') || 'neutral').toLowerCase()
  const minRatingOverride = Number(searchParams.get('minImdbRating'))
  const genreOverrideIds = (searchParams.get('genreOverrideIds') || '')
    .split(',')
    .map((value) => Number(value.trim()))
    .filter(Number.isFinite)

  const emotionGenres = EMOTION_GENRE_MAP[emotion] || EMOTION_GENRE_MAP.neutral
  const movieGenres = genreOverrideIds.length ? genreOverrideIds : emotionGenres.movie
  const seriesGenres = genreOverrideIds.length
    ? [...new Set(genreOverrideIds.flatMap((id) => MOVIE_TO_TV_GENRE_MAP[id] || [id]))]
    : emotionGenres.tv
  const minVoteAverage = Number.isFinite(minRatingOverride) ? Math.min(Math.max(minRatingOverride, 6), 8.8) : 7

  const [movies, series] = await Promise.all([
    fetchBalancedContent('movie', movieGenres, 30, minVoteAverage),
    fetchBalancedContent('tv', seriesGenres, 24, minVoteAverage),
  ])

  return { movies, series }
}

export async function fetchDetails(id, contentType) {
  const details = await tmdbFetch(`/${contentType}/${id}`, {}, { revalidate: 1800 })
  const videos = await tmdbFetch(`/${contentType}/${id}/videos`, {}, { revalidate: 1800 })
  const trailer = (videos?.results ?? []).find((video) => video.site === 'YouTube' && video.type === 'Trailer')
  const baseInfo = formatContent(details, contentType, { requirePoster: false })

  if (!baseInfo) {
    return null
  }

  const runtime = contentType === 'movie' ? details.runtime : details.episode_run_time?.[0]

  return {
    ...baseInfo,
    backdrop_url: details.backdrop_path ? `${BACKDROP_BASE_URL}${details.backdrop_path}` : baseInfo.poster,
    genre: details.genres?.[0]?.name ?? baseInfo.genre,
    duration: runtime ? `${runtime} min` : 'N/A',
    trailerKey: trailer?.key ?? null,
  }
}
