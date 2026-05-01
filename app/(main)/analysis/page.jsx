'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MoodBars from '@/components/MoodBars'
import RippleButton from '@/components/RippleButton'
import MovieSliderSection from '@/components/MovieSliderSection'
import { preloadModels, detectMixedEmotions } from '@/lib/faceApi'
import { useFlickerIn } from '@/hooks/useFlickerIn'

const MOOD_TO_GENRE = {
  happy: 'COMEDY',
  sad: 'DRAMA',
  angry: 'ACTION',
  fear: 'HORROR',
  surprise: 'SCI-FI',
  neutral: 'DOCUMENTARY',
  disgust: 'THRILLER',
  melancholy: 'SCI-FI'
}

const DEFAULT_MOOD_GENRES = {
  happy: ['COMEDY', 'ROMANCE'],
  sad: ['DRAMA', 'DOCUMENTARY'],
  angry: ['ACTION', 'THRILLER'],
  fear: ['HORROR', 'THRILLER'],
  surprise: ['SCI-FI', 'THRILLER'],
  neutral: ['DOCUMENTARY', 'DRAMA']
}

const GENRE_NAME_TO_ID = {
  ACTION: 28, DRAMA: 18, 'SCI-FI': 878, HORROR: 27, 
  COMEDY: 35, THRILLER: 53, DOCUMENTARY: 99, ROMANCE: 10749
}

export default function Analysis() {
  useFlickerIn()
  const router = useRouter()
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  
  // Recommendations state
  const [recommendations, setRecommendations] = useState([])
  const [loadingRecs, setLoadingRecs] = useState(false)
  const [availableGenres, setAvailableGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  
  const videoRef = useRef(null)
  const pollIntervalRef = useRef(null)

  useEffect(() => {
    preloadModels()
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop())
      }
    }
  }, [])

  const fetchRecs = async (emotions) => {
    setLoadingRecs(true)
    try {
      const minRating = localStorage.getItem('minImdbRating') || 6.0
      let moodGenres = DEFAULT_MOOD_GENRES
      try {
        const stored = localStorage.getItem('customMoodGenres')
        if (stored) moodGenres = JSON.parse(stored)
      } catch (e) {}
      
      // Combine genres from top 2 emotions if array is passed, otherwise just use the single emotion
      const emotionList = Array.isArray(emotions) ? emotions.slice(0, 2).map(e => e.emotion) : [emotions]
      const selectedGenres = [...new Set(emotionList.flatMap(emo => moodGenres[emo] || []))]
      
      setAvailableGenres(selectedGenres)
      setSelectedGenre(selectedGenres[0] || 'DOCUMENTARY')
      
      const genreIds = selectedGenres.map(g => GENRE_NAME_TO_ID[g]).filter(Boolean).join(',')
      
      const primaryEmotion = emotionList[0] || 'neutral'
      const res = await fetch(`/api/recommendations?emotion=${primaryEmotion}&minImdbRating=${minRating}&genreOverrideIds=${genreIds}`)
      const data = await res.json()
      
      const allContent = [...(data.movies || []), ...(data.series || [])]
      const uniqueRecs = Array.from(new Map(allContent.map(item => [item.id, item])).values())
      
      setRecommendations(uniqueRecs)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingRecs(false)
    }
  }

  const startAnalysis = async () => {
    setAnalyzing(true)
    setResults(null)
    setRecommendations([])

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        
        videoRef.current.onloadedmetadata = () => {
          let attempts = 0
          let validReadings = []

          pollIntervalRef.current = setInterval(async () => {
            if (!videoRef.current) return
            
            attempts++
            const detection = await detectMixedEmotions(videoRef.current)
            
            if (detection.hasFace) {
              validReadings.push(detection)
            }

            if (validReadings.length >= 3 || attempts >= 10) {
              clearInterval(pollIntervalRef.current)
              
              if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop())
              }
              
              if (validReadings.length === 0) {
                setAnalyzing(false)
                setResults({
                  happy: 0, neutral: 100, sad: 0, angry: 0, surprised: 0,
                  dominantMood: 'neutral', recommendedGenre: 'DOCUMENTARY'
                })
                fetchRecs('neutral')
                return
              }

              const finalReading = validReadings.reduce((prev, current) => 
                (prev.confidence > current.confidence) ? prev : current
              )
              const exps = finalReading.expressions

              setAnalyzing(false)
              setResults({
                happy: Math.round((exps.happy || 0) * 100),
                neutral: Math.round((exps.neutral || 0) * 100),
                sad: Math.round((exps.sad || 0) * 100),
                angry: Math.round((exps.angry || 0) * 100),
                surprised: Math.round((exps.surprised || 0) * 100),
                dominantMood: finalReading.emotion,
                recommendedGenre: MOOD_TO_GENRE[finalReading.emotion] || 'SCI-FI',
                mixedEmotions: finalReading.topEmotions || []
              })
              
              fetchRecs(finalReading.topEmotions || finalReading.emotion)
            }
          }, 500)
        }
      }
    } catch (err) {
      console.log('Camera error:', err)
      setAnalyzing(false)
    }
  }

  return (
    <div className="w-full flex flex-col relative pb-16">
      {/* Top Section: Scanner & Metrics */}
      <div className="w-full min-h-[calc(100vh-104px)] flex flex-col lg:flex-row relative">
        <div className="ghost-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">ANALYSIS</div>
        
        {/* LEFT: Camera / Scanner UI */}
        <div className="flex-1 border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.1)] p-6 lg:p-12 flex flex-col justify-center relative z-10 animate-enter">
          <h1 className="font-display text-5xl mb-8 uppercase">Facial <br/>Scan</h1>
          
          <div className="relative w-full aspect-video glass-frost-dark max-w-2xl mx-auto border border-black overflow-hidden flex items-center justify-center">
            {analyzing ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover opacity-50 mix-blend-screen grayscale"
                />
                <div className="absolute inset-0 bg-[rgba(255,45,45,0.1)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[60%] h-[60%] border border-accent animate-pulse relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent -translate-x-1 -translate-y-1"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent translate-x-1 -translate-y-1"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent -translate-x-1 translate-y-1"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent translate-x-1 translate-y-1"></div>
                  </div>
                </div>
                <p className="absolute bottom-4 font-body text-[10px] text-accent tracking-widest animate-pulse uppercase">
                  Analyzing surface expression...
                </p>
              </>
            ) : results ? (
              <div className="text-center">
                <p className="font-body text-[10px] text-gray tracking-widest uppercase mb-2">Scan Complete</p>
                <h2 className="font-display text-4xl text-cream mb-4">Dominant: {results.dominantMood}</h2>
                {results.mixedEmotions && results.mixedEmotions.length > 1 && (
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {results.mixedEmotions.slice(0, 3).map((emo, idx) => (
                      <span key={idx} className="font-body text-[10px] glass-frost-dark text-cream px-2 py-1 tracking-widest uppercase">
                        {emo.emotion} {Math.round(emo.confidence * 100)}%
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <RippleButton 
                onClick={startAnalysis}
                className="px-8 py-4 border border-cream text-cream hover:bg-cream hover:text-black font-body text-[11px] tracking-widest uppercase transition-colors"
              >
                Initialize Camera
              </RippleButton>
            )}
          </div>
        </div>

        {/* RIGHT: Results & Metrics */}
        <div className="w-full lg:w-[400px] shrink-0 glass-frost p-6 lg:p-12 flex flex-col relative z-10 border-l border-[rgba(0,0,0,0.1)] animate-enter">
          <h2 className="font-display text-3xl mb-8">Metrics</h2>
          
          {results ? (
            <div className="flex-1 flex flex-col justify-between animate-[fade-in_0.5s_ease-out]">
              <MoodBars moods={results} />
              
              <div className="mt-12 pt-8 border-t border-[rgba(0,0,0,0.1)]">
                <p className="font-body text-[10px] text-mid tracking-[0.1em] uppercase mb-4">RECOMMENDED WORLD</p>
                
                {availableGenres.length > 1 ? (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {availableGenres.map(genre => (
                      <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-3 py-1 font-body text-[10px] tracking-widest uppercase border transition-colors ${
                          selectedGenre === genre ? 'bg-black text-cream border-black' : 'bg-transparent text-mid border-[rgba(0,0,0,0.2)] hover:border-black hover:text-black glass-frost-light'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                ) : (
                  <h3 className="font-display text-4xl mb-6">{selectedGenre || results.recommendedGenre}</h3>
                )}

                <RippleButton 
                  onClick={() => router.push(`/collection?genre=${selectedGenre || results.recommendedGenre}`)}
                  className="w-full py-4 bg-black text-cream hover:bg-accent hover:text-black font-body text-[11px] tracking-widest transition-colors uppercase"
                >
                  ENTER {selectedGenre || results.recommendedGenre}
                </RippleButton>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="font-body text-[11px] tracking-[0.1em] text-mid uppercase">
                Awaiting scan data...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Recommendations Slider */}
      {(loadingRecs || recommendations.length > 0) && (
        <div className="relative z-10 w-full animate-[fade-in_0.8s_ease-out]">
          <MovieSliderSection 
            title={`Recommendations for your ${results?.dominantMood} mood`} 
            movies={recommendations} 
            loading={loadingRecs} 
          />
        </div>
      )}
    </div>
  )
}
