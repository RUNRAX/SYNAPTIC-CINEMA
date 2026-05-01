'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import MoodBars from '@/components/MoodBars'
import RippleButton from '@/components/RippleButton'

export default function Analysis() {
  const router = useRouter()
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const videoRef = useRef(null)

  const startAnalysis = () => {
    setAnalyzing(true)
    
    // Simulate camera access and 2s analysis delay
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch(err => console.log('Camera error:', err))
    }

    setTimeout(() => {
      // Stop camera if active
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
      
      setAnalyzing(false)
      setResults({
        happy: 12,
        neutral: 65,
        sad: 18,
        angry: 0,
        surprised: 5,
        dominantMood: 'melancholy',
        recommendedGenre: 'SCI-FI'
      })
    }, 2500)
  }

  return (
    <div className="w-full min-h-[calc(100vh-104px)] flex flex-col lg:flex-row relative">
      <div className="ghost-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">ANALYSIS</div>
      
      {/* LEFT: Camera / Scanner UI */}
      <div className="flex-1 border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.1)] p-6 lg:p-12 flex flex-col justify-center relative z-10">
        <h1 className="font-display text-5xl mb-8 uppercase">Facial <br/>Scan</h1>
        
        <div className="relative w-full aspect-video bg-black max-w-2xl mx-auto border border-black overflow-hidden flex items-center justify-center">
          {analyzing ? (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover opacity-50 mix-blend-screen grayscale"
              />
              <div className="absolute inset-0 bg-[rgba(200,255,0,0.1)]"></div>
              {/* Scanning reticle */}
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
              <h2 className="font-display text-4xl text-cream">Mood: {results.dominantMood}</h2>
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
      <div className="w-full lg:w-[400px] shrink-0 bg-cream-2 p-6 lg:p-12 flex flex-col relative z-10 border-l border-[rgba(0,0,0,0.1)]">
        <h2 className="font-display text-3xl mb-8">Metrics</h2>
        
        {results ? (
          <div className="flex-1 flex flex-col justify-between animate-[fade-in_0.5s_ease-out]">
            <MoodBars moods={results} />
            
            <div className="mt-12 pt-8 border-t border-[rgba(0,0,0,0.1)]">
              <p className="font-body text-[10px] text-mid tracking-[0.1em] uppercase mb-4">RECOMMENDED WORLD</p>
              <h3 className="font-display text-4xl mb-6">{results.recommendedGenre}</h3>
              <RippleButton 
                onClick={() => router.push(`/collection?genre=${results.recommendedGenre}`)}
                className="w-full py-4 bg-black text-cream hover:bg-accent hover:text-black font-body text-[11px] tracking-widest transition-colors uppercase"
              >
                ENTER {results.recommendedGenre}
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
  )
}
