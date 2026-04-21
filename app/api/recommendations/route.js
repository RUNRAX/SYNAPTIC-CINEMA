import { NextResponse } from 'next/server'
import { fetchRecommendations } from '@/lib/server/tmdb'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const data = await fetchRecommendations(searchParams)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to load recommendations:', error)
    return NextResponse.json({ error: 'Failed to load recommendations', movies: [], series: [] }, { status: 500 })
  }
}
