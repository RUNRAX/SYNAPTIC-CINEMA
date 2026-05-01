'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@/entities/User'
import NoiseOverlay from '@/components/NoiseOverlay'
import MagneticButton from '@/components/MagneticButton'

export default function Splash() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const currentUser = await User.me()
      setUser(currentUser)
    } catch (error) {
      console.log('No user logged in')
    } finally {
      setLoading(false)
    }
  }

  const enterApp = () => {
    // Add a quick flash or glitch effect if possible
    document.body.style.backgroundColor = '#C8FF00'
    setTimeout(() => {
      document.body.style.backgroundColor = ''
      router.push('/home')
    }, 150)
  }

  return (
    <div className="relative min-h-screen w-full bg-cream text-black overflow-hidden flex items-center justify-center">
      <NoiseOverlay />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <h1 className="font-display text-[30vw] leading-none whitespace-nowrap">SYNAPTIC</h1>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-8xl tracking-tight leading-[0.85] mb-4">SYNAPTIC<br/>CINEMA</h2>
          <p className="font-body text-[11px] tracking-widest uppercase text-mid max-w-xs mx-auto">
            Mood-first movie discovery. Explore the surface of cinema.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {user ? (
              <div className="flex flex-col gap-6">
                <div className="text-center border border-[rgba(0,0,0,0.1)] p-4 bg-cream-2">
                  <p className="font-body text-[11px] tracking-widest text-mid mb-1">WELCOME BACK</p>
                  <p className="font-body font-bold text-sm uppercase">{user.full_name || user.email}</p>
                </div>
                <MagneticButton
                  onClick={enterApp}
                  className="w-full bg-black text-cream hover:bg-accent hover:text-black font-body text-[11px] tracking-widest h-14 transition-colors uppercase"
                >
                  ENTER SYSTEM →
                </MagneticButton>
              </div>
            ) : (
              <>
                <MagneticButton
                  onClick={enterApp}
                  className="w-full bg-black text-cream hover:bg-accent hover:text-black font-body text-[11px] tracking-widest h-14 transition-colors uppercase"
                >
                  ENTER AS GUEST →
                </MagneticButton>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/login" className="flex items-center justify-center border border-[rgba(0,0,0,0.1)] text-black hover:bg-black hover:text-cream font-body text-[10px] tracking-widest h-12 transition-colors uppercase">
                    LOG IN
                  </Link>
                  <Link href="/signup" className="flex items-center justify-center border border-[rgba(0,0,0,0.1)] text-black hover:bg-black hover:text-cream font-body text-[10px] tracking-widest h-12 transition-colors uppercase">
                    SIGN UP
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
