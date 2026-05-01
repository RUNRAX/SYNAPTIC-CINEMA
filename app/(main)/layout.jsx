'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import CustomCursor from '@/components/CustomCursor'
import GlitchOverlay from '@/components/GlitchOverlay'
import NoiseOverlay from '@/components/NoiseOverlay'
import ScanLine from '@/components/ScanLine'
import GridLines from '@/components/GridLines'
import BottomTicker from '@/components/BottomTicker'
import CinematicBackgroundText from '@/components/CinematicBackgroundText'
import { useEffect, useState } from 'react'
import { triggerGlitch } from '@/hooks/useGlitch'

// We define basic ticker items here, though pages could override them if we made context
const DEFAULT_TICKER_ITEMS = [
  'SYNAPTIC CINEMA',
  'MOOD-FIRST DISCOVERY',
  '40+ TRENDING FILMS',
  'FACIAL RECOGNITION',
  'CURATED WORLDS',
  '©2026 SYNAPTIC'
]

export default function MainLayout({ children }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cream text-black">
      <NoiseOverlay />
      <ScanLine />
      <GridLines />
      <CustomCursor />
      <GlitchOverlay />
      
      <CinematicBackgroundText />

      <Sidebar />
      <Topbar />

      <main className="relative z-10 lg:pl-[200px] pt-[48px] pb-[56px] min-h-screen w-full">
        <AnimatePresence mode="wait">
          {mounted && (
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
              onAnimationStart={() => {
                // The glitch logic is mostly handled by link clicks, but this ensures Framer Motion
                // can also participate if needed, though we don't double-trigger it.
              }}
              className="w-full h-full"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomTicker items={DEFAULT_TICKER_ITEMS} />
    </div>
  )
}
