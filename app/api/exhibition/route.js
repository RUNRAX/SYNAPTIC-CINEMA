import { NextResponse } from 'next/server'
import { fetchExhibitionGenres } from '@/lib/server/tmdb'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await fetchExhibitionGenres()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to load exhibition genres:', error)
    return NextResponse.json({ error: 'Failed to load exhibition genres' }, { status: 500 })
  }
}
