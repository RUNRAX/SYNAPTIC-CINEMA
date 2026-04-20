'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import MovieGrid from '@/components/MovieGrid'
import './EmotionResults.css'

import { API_URL } from '@/lib/config'
const CACHE_DURATION = 3600 * 1000

export default function EmotionResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [emotion, setEmotion] = useState('')
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const detectedEmotion = searchParams.get('emotion') || 'neutral'
    setEmotion(detectedEmotion)

    const loadEmotionBasedContent = async (emotionToLoad) => {
      setLoading(true)
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
          setLoading(false)
          return
        }
      }

      try {
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setContent([...(data.movies || []), ...(data.series || [])])
        sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }))
      } catch (error) {
        console.error('Error loading emotion-based content:', error)
        setContent([])
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
    const descriptions = {}
    return descriptions[emo] || "Curated content based on your current mood"
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

      <div className="content-section">
        <MovieGrid movies={content} onMovieClick={handleMovieClick} loading={loading} />
      </div>
    </div>
  )
}
