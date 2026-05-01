import { NextResponse } from 'next/server'
import { fetchCredits } from '@/lib/server/tmdb'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')

    if (!id || !type) {
      return NextResponse.json({ error: 'Missing type or id parameter' }, { status: 400 })
    }

    const data = await fetchCredits(id, type)
    return NextResponse.json({ cast: data })
  } catch (error) {
    console.error('Failed to load credits:', error)
    return NextResponse.json({ error: 'Failed to load credits', cast: [] }, { status: 500 })
  }
}
