'use client'

import { useRouter } from 'next/navigation'
import RippleButton from '@/components/RippleButton'

export default function Exhibition() {
  const router = useRouter()

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
      <div className="flex-1 flex flex-col lg:flex-row mt-[32px]">
        {/* Panel 1: Noir Classics */}
        <RippleButton 
          onClick={() => router.push('/collection?genre=THRILLER')}
          className="flex-1 relative group overflow-hidden exhibition-panel border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.1)] text-left"
        >
          {/* Inner scalable background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] transform transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-105 z-0">
            {/* Geometric SVG Overlay */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-15">
              <defs>
                <pattern id="concentric" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#concentric)" />
              <line x1="15%" y1="0" x2="15%" y2="100%" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
              <line x1="0" y1="85%" x2="100%" y2="85%" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
            </svg>
          </div>

          <div className="relative z-10 h-full p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-display text-2xl text-white/10">01</span>
              <div className="opacity-0 translate-y-[-8px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/20 px-3 py-1 text-white font-body text-[10px] tracking-widest uppercase">
                VIEW ALL →
              </div>
            </div>
            
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] text-gray uppercase mb-2">NOIR CLASSICS</p>
              <h2 className="font-display text-6xl text-cream leading-[0.9] mb-4">Dark /<br/>Cinema</h2>
              <p className="font-body text-[12px] text-gray">24 Films</p>
            </div>
          </div>
        </RippleButton>

        {/* Panel 2: Sci-Fi Visions */}
        <RippleButton 
          onClick={() => router.push('/collection?genre=SCI-FI')}
          className="flex-1 relative group overflow-hidden exhibition-panel text-left"
        >
          {/* Inner scalable background */}
          <div className="absolute inset-0 bg-cream-2 transform transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-105 z-0">
             {/* Geometric SVG Overlay */}
             <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
              <defs>
                <pattern id="squares" width="60" height="60" patternUnits="userSpaceOnUse">
                  <rect x="10" y="10" width="40" height="40" fill="none" stroke="black" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#squares)" />
            </svg>
          </div>

          <div className="relative z-10 h-full p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-display text-2xl text-black/10">02</span>
              <div className="opacity-0 translate-y-[-8px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-black/20 px-3 py-1 text-black font-body text-[10px] tracking-widest uppercase">
                VIEW ALL →
              </div>
            </div>
            
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] text-mid uppercase mb-2">SCI-FI VISIONS</p>
              <h2 className="font-display text-6xl text-black leading-[0.9] mb-4">Future /<br/>Worlds</h2>
              <p className="font-body text-[12px] text-mid">18 Films</p>
            </div>
          </div>
        </RippleButton>
      </div>
    </div>
  )
}
