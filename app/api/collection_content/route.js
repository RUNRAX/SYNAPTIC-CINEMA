import { NextResponse } from 'next/server'
import { fetchFromDiscover, formatContent } from '@/lib/server/tmdb'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const trendingParams = { sort_by: 'popularity.desc', 'vote_count.gte': 100, 'vote_average.gte': 6 }
    
    // Fetch 5 pages of movies and 5 pages of series (~100 each)
    const [moviesRaw, seriesRaw] = await Promise.all([
      fetchFromDiscover('movie', trendingParams, 5),
      fetchFromDiscover('tv', trendingParams, 5),
    ])

    return NextResponse.json({
      movies: moviesRaw.map(item => formatContent(item, 'movie')).filter(Boolean),
      series: seriesRaw.map(item => formatContent(item, 'tv')).filter(Boolean)
    })
  } catch (error) {
    console.error('Failed to load collection content:', error)
    return NextResponse.json(
      { error: 'Failed to load collection content', movies: [], series: [] },
      { status: 500 }
    )
  }
}
