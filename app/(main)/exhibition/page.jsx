'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import RippleButton from '@/components/RippleButton'
import { triggerGlitch } from '@/hooks/useGlitch'

export default function Exhibition() {
  const router = useRouter()
  const [panels, setPanels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const res = await fetch('/api/exhibition')
        const data = await res.json()
        setPanels(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPanels()
  }, [])

  const handleNav = (genre) => {
    triggerGlitch(() => {
      router.push(`/collection?genre=${genre}`)
    })
  }

  return (
    <div className="w-full h-[calc(100vh-104px)] flex flex-col relative overflow-hidden">
      {/* Secondary Ticker - Absolute top */}
      <div className="absolute top-0 left-0 right-0 h-[32px] bg-black z-20 flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap text-[9px] tracking-[0.2em] font-body text-gray uppercase animate-[ticker_16s_linear_infinite] will-change-transform">
          {Array(6).fill('NOIR CLASSICS ◆ SCI-FI VISIONS ◆ WORLD CINEMA ◆ HORROR COLLECTION ◆ DOCUMENTARY SERIES ◆ ').map((text, i) => (
            <span key={i} className="pr-1">{text}</span>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div className="flex-1 flex flex-col lg:flex-row mt-[32px] overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center bg-cream">
            <span className="font-body text-[11px] tracking-widest uppercase animate-pulse">Loading Collections...</span>
          </div>
        ) : (
          panels.map((panel, index) => {
            const isDark = index % 2 === 0
            const numberString = String(index + 1).padStart(2, '0')
            
            return (
              <RippleButton 
                key={panel.name}
                onClick={() => handleNav(panel.name)}
                className={`flex-1 relative group overflow-hidden exhibition-panel border-b lg:border-b-0 lg:border-r ${isDark ? 'border-[rgba(255,255,255,0.1)]' : 'border-[rgba(0,0,0,0.1)]'} text-left`}
              >
                {/* Background Poster (Darkened/Tinted) */}
                <div className="absolute inset-0 z-0">
                  {panel.posterUrl && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity transform transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-105"
                      style={{ backgroundImage: `url(${panel.posterUrl})` }}
                    />
                  )}
                  {/* Overlay gradient */}
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black via-black/80 to-black/50' : 'bg-gradient-to-t from-cream via-cream/90 to-cream/70'} transform transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-105`} />
                  
                  {/* Geometric SVG Overlay */}
                  <svg width="100%" height="100%" className={`absolute inset-0 ${isDark ? 'opacity-15' : 'opacity-10'}`}>
                    {isDark ? (
                      <>
                        <defs>
                          <pattern id="concentric" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#concentric)" />
                      </>
                    ) : (
                      <>
                        <defs>
                          <pattern id="squares" width="60" height="60" patternUnits="userSpaceOnUse">
                            <rect x="10" y="10" width="40" height="40" fill="none" stroke="black" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#squares)" />
                      </>
                    )}
                  </svg>
                </div>

                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className={`font-display text-2xl ${isDark ? 'text-white/20' : 'text-black/20'}`}>{numberString}</span>
                    <div className={`opacity-0 translate-y-[-8px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border px-3 py-1 font-body text-[10px] tracking-widest uppercase ${isDark ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}>
                      VIEW ALL →
                    </div>
                  </div>
                  
                  <div>
                    <p className={`font-body text-[10px] tracking-[0.2em] uppercase mb-2 ${isDark ? 'text-gray' : 'text-mid'}`}>{panel.label}</p>
                    <h2 
                      className={`font-display text-4xl lg:text-5xl leading-[0.9] mb-4 ${isDark ? 'text-cream' : 'text-black'}`}
                      dangerouslySetInnerHTML={{ __html: panel.title }}
                    />
                    <p className={`font-body text-[12px] ${isDark ? 'text-gray' : 'text-mid'}`}>{panel.count}+ Films</p>
                  </div>
                </div>
              </RippleButton>
            )
          })
        )}
      </div>
    </div>
  )
}
