'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import MovieGrid from '@/components/MovieGrid'
import './EmotionResults.css'

import { API_URL } from '@/lib/config'
const CACHE_DURATION = 3600 * 1000

function EmotionResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [emotion, setEmotion] = useState('')
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const detectedEmotion = searchParams.get('emotion') || 'neutral'
    setEmotion(detectedEmotion)

    const loadEmotionBasedContent = async (emotionToLoad) => {
      setLoading(true)
      setError('')
      setUsingFallback(false)
      const savedDevSettings = JSON.parse(localStorage.getItem('devSettings') || '{}')
      const minImdbRating = savedDevSettings.minImdbRating || 7.5
      const genreOverrideIds = (savedDevSettings.genreOverrides?.[emotionToLoad] || []).join(',')

      const apiUrl = `${API_URL}/recommendations?emotion=${emotionToLoad}&minImdbRating=${minImdbRating}&genreOverrideIds=${genreOverrideIds}`
      const cacheKey = `emotionContentCache_${emotionToLoad}_${minImdbRating}_${genreOverrideIds}`
      const cachedData = sessionStorage.getItem(cacheKey)

      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData)
        if (Date.now() - timestamp < CACHE_DURATION) {
          setContent([...(data.movies || []), ...(data.series || [])])
          setUsingFallback(Boolean(data.usingFallback))
          setLoading(false)
          return
        }
      }

      try {
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        const combined = [...(data.movies || []), ...(data.series || [])]

        if (combined.length > 0) {
          setContent(combined)
          sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: { ...data, usingFallback: false } }))
          return
        }

        const fallbackResponse = await fetch(`${API_URL}/home_content`)
        if (!fallbackResponse.ok) {
          throw new Error('No recommendations available')
        }

        const fallbackData = await fallbackResponse.json()
        const fallbackContent = [
          ...(fallbackData.featuredMovies || []).slice(0, 12),
          ...(fallbackData.popularSeries || []).slice(0, 12),
        ]

        setContent(fallbackContent)
        setUsingFallback(true)
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: { movies: fallbackContent, series: [], usingFallback: true },
          })
        )
      } catch (error) {
        console.error('Error loading emotion-based content:', error)
        setContent([])
        setError('We could not load mood-matched titles right now. Please try again in a moment.')
      } finally {
        setLoading(false)
      }
    }

    loadEmotionBasedContent(detectedEmotion)
  }, [searchParams])

  const handleMovieClick = (movie) => {
    if (movie?.id) {
      router.push(`/MovieDetails?id=${movie.id}&type=${movie.type}`)
    }
  }

  const getEmotionDescription = (emo) => {
    const descriptions = {
      happy: 'Bright, uplifting picks with warmth, momentum, and feel-good energy.',
      sad: 'Comforting stories, rich dramas, and emotional catharsis for a softer mood.',
      angry: 'High-impact thrillers and action-heavy worlds that channel intensity.',
      fear: 'Tense mysteries, chilling atmospheres, and dark genre escapes.',
      surprise: 'Inventive adventures, mind-benders, and visually unexpected stories.',
      neutral: 'Balanced, critically strong movies and series for any mood.',
      disgust: 'Sharp, strange, and provocative picks with a stronger edge.',
    }
    return descriptions[emo] || 'Curated content based on your current mood'
  }

  return (
    <div className="page-container emotion-results-container">
      <div className="results-header">
        <button className="back-button" onClick={() => router.push('/Synaptic')}>
          <ArrowLeft size={20} /> Back to Synaptic
        </button>
        <div className="emotion-info">
          <h1 className="emotion-title">{emotion} Mood Detected</h1>
          <p className="emotion-description">{getEmotionDescription(emotion)}</p>
        </div>
      </div>

      <div className="emotion-stats">
        <div className="stat-item">
          <div className="stat-number">{loading ? '...' : content.length}</div>
          <div className="stat-label">Curated titles</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{emotion || 'neutral'}</div>
          <div className="stat-label">Detected mood</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{usingFallback ? 'Yes' : 'No'}</div>
          <div className="stat-label">Fallback mode</div>
        </div>
      </div>

      {usingFallback && !loading && (
        <div className="fallback-banner">
          Mood-specific results were limited, so we loaded premium featured picks instead.
        </div>
      )}

      {error && !loading && <div className="error-banner">{error}</div>}

      {!loading && !error && content.length === 0 && (
        <div className="empty-state">
          <h2>No titles available yet</h2>
          <p>Try another scan or lower the minimum rating in Settings to broaden the pool.</p>
        </div>
      )}

      <div className="content-section">
        <MovieGrid movies={content} onMovieClick={handleMovieClick} loading={loading} />
      </div>
    </div>
  )
}

export default function EmotionResults() {
  return (
    <Suspense fallback={<div className="page-container emotion-results-container" />}>
      <EmotionResultsContent />
    </Suspense>
  )
}
