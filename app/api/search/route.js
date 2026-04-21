import { NextResponse } from 'next/server'
import { searchTmdb } from '@/lib/server/tmdb'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const data = await searchTmdb(searchParams)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to search TMDB:', error)
    return NextResponse.json({ error: 'Failed to search TMDB', movies: [], series: [] }, { status: 500 })
  }
}
