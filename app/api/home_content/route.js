import { NextResponse } from 'next/server'
import { fetchHomeContent } from '@/lib/server/tmdb'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await fetchHomeContent()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to load home content:', error)
    return NextResponse.json(
      { error: 'Failed to load home content', trending: [], featuredMovies: [], popularSeries: [] },
      { status: 500 }
    )
  }
}
