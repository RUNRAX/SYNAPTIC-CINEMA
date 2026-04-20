'use client'

import { useState, useEffect, useMemo, memo } from 'react'
import { useRouter } from 'next/navigation'
import MovieSlider from '@/components/MovieSlider'
import MovieGrid from '@/components/MovieGrid'
import { Star } from 'lucide-react'
import GalaxySystem from '@/components/GalaxySystem'
import FloatingAstronaut from '@/components/FloatingAstronaut'
import ShootingStars from '@/components/ShootingStars'
import './Home.css'

const MemoizedGalaxy = memo(GalaxySystem)
const MemoizedAstronaut = memo(FloatingAstronaut)
const MemoizedStars = memo(ShootingStars)

import { API_URL } from '@/lib/config'
const CACHE_DURATION = 3600 * 1000

export default function Home() {
  const router = useRouter()
  const [trending, setTrending] = useState([])
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [popularSeries, setPopularSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true)
      const cacheKey = 'homeContentCache'
      const cachedData = sessionStorage.getItem(cacheKey)

      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData)
        if (Date.now() - timestamp < CACHE_DURATION) {
          setTrending(data.trending || [])
          setFeaturedMovies(data.featuredMovies || [])
          setPopularSeries(data.popularSeries || [])
          setLoading(false)
          return
        }
      }

      try {
        const response = await fetch(`${API_URL}/home_content`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setTrending(data.trending || [])
        setFeaturedMovies(data.featuredMovies || [])
        setPopularSeries(data.popularSeries || [])
        sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }))
      } catch (err) {
        console.error('Error loading home content:', err)
        setError('Unable to load content. Please check your connection and try again.')
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [])

  const handleMovieClick = (movie) => {
    if (movie?.id) {
      router.push(`/MovieDetails?id=${movie.id}&type=${movie.type}`)
    }
  }

  const uniqueContent = useMemo(() => {
    const allContent = [...trending, ...featuredMovies, ...popularSeries]
    return Array.from(new Map(allContent.map(item => [item.id, item])).values())
  }, [trending, featuredMovies, popularSeries])

  return (
    <div className="home-container">
      <MemoizedStars />
      <MemoizedGalaxy />
      <MemoizedAstronaut />

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Cinematic Experience</h1>
          <p className="hero-subtitle">Discover thousands of movies and series with stunning visuals and immersive storytelling.</p>
        </div>
      </section>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">Retry</button>
        </div>
      )}

      <section className="content-section">
        <MovieSlider
          movies={trending}
          title="Trending Now"
          onMovieClick={handleMovieClick}
          loading={loading}
        />
      </section>

      <section className="content-section">
        <MovieSlider
          movies={featuredMovies}
          title="Featured Movies"
          onMovieClick={handleMovieClick}
          loading={loading}
        />
      </section>

      <section className="content-section">
        <MovieSlider
          movies={popularSeries}
          title="Popular Series"
          onMovieClick={handleMovieClick}
          loading={loading}
        />
      </section>

      <section className="content-section">
        <div className="section-header">
          <Star className="section-icon" />
          <h2 className="section-title">All Content</h2>
        </div>
        <MovieGrid
          movies={uniqueContent}
          onMovieClick={handleMovieClick}
          loading={loading}
        />
      </section>
    </div>
  )
}
