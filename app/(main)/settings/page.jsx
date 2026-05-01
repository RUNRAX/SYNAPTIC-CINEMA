'use client'

import { useState, useEffect } from 'react'
import RippleButton from '@/components/RippleButton'
import { useFlickerIn } from '@/hooks/useFlickerIn'

const EMOTIONS = ['happy', 'sad', 'angry', 'fear', 'surprise', 'neutral']
const GENRES = ['ACTION', 'DRAMA', 'SCI-FI', 'HORROR', 'COMEDY', 'THRILLER', 'DOCUMENTARY', 'ROMANCE']

const DEFAULT_MOOD_GENRES = {
  happy: ['COMEDY', 'ROMANCE'],
  sad: ['DRAMA', 'DOCUMENTARY'],
  angry: ['ACTION', 'THRILLER'],
  fear: ['HORROR', 'THRILLER'],
  surprise: ['SCI-FI', 'THRILLER'],
  neutral: ['DOCUMENTARY', 'DRAMA']
}

export default function Settings() {
  useFlickerIn()
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState({
    theme: 'dark',
    minImdbRating: 6.0,
    customMoodGenres: DEFAULT_MOOD_GENRES,
    highPerformance: true,
    haptics: true,
    dataSaver: false,
    autoPlay: true,
    cameraAccess: true
  })
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') || 'dark'
      const savedMinRating = parseFloat(localStorage.getItem('minImdbRating')) || 6.0
      const savedMoodGenres = JSON.parse(localStorage.getItem('customMoodGenres')) || DEFAULT_MOOD_GENRES
      
      setSettings(prev => ({
        ...prev,
        theme: savedTheme,
        minImdbRating: savedMinRating,
        customMoodGenres: savedMoodGenres
      }))
    } catch (e) {}
    setMounted(true)
  }, [])

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark'
    setSettings(prev => ({ ...prev, theme: newTheme }))
    
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', newTheme)
  }

  const updateRating = (e) => {
    setSettings(prev => ({ ...prev, minImdbRating: parseFloat(e.target.value) }))
  }

  const toggleMoodGenre = (emotion, genre) => {
    setSettings(prev => {
      const current = prev.customMoodGenres[emotion] || []
      const updated = current.includes(genre)
        ? current.filter(g => g !== genre)
        : [...current, genre]
      
      return {
        ...prev,
        customMoodGenres: {
          ...prev.customMoodGenres,
          [emotion]: updated
        }
      }
    })
  }

  const handleSave = () => {
    localStorage.setItem('minImdbRating', settings.minImdbRating)
    localStorage.setItem('customMoodGenres', JSON.stringify(settings.customMoodGenres))
    // The theme is saved immediately on toggle, so no need to save here
    
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  if (!mounted) return null

  return (
    <div className="w-full min-h-full flex flex-col relative pb-8">
      {/* Header */}
      <div className="px-6 lg:px-12 py-12 relative z-10 border-b border-[rgba(0,0,0,0.1)] glass-frost animate-enter">
        <h1 className="font-display text-7xl text-black leading-none mb-4">Settings</h1>
        <p className="font-body text-[12px] text-mid tracking-[0.08em] uppercase max-w-md">
          Configure system parameters and preferences
        </p>
      </div>

      <div className="p-6 lg:p-12 relative z-10 max-w-3xl">
        <div className="flex flex-col gap-12">
          
          {/* Section: Appearance */}
          <div className="animate-enter">
            <h2 className="font-body text-[11px] tracking-widest text-mid uppercase mb-6">Appearance</h2>
            <div className="flex flex-col gap-2">
              <SettingToggle 
                label="Dark Mode" 
                description="Invert colors for low-light environments"
                value={settings.theme === 'dark'}
                onToggle={toggleTheme}
              />
            </div>
          </div>

          {/* Section: Content Filters */}
          <div className="animate-enter">
            <h2 className="font-body text-[11px] tracking-widest text-mid uppercase mb-6">Content Filters</h2>
            <div className="p-6 glass-frost border border-[rgba(0,0,0,0.1)] flex flex-col gap-4 rounded-3xl">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-body text-[13px] uppercase tracking-wide mb-1 text-black">Minimum IMDB Rating</h3>
                  <p className="font-body text-[10px] text-mid tracking-widest uppercase">Filter recommendations below this score</p>
                </div>
                <span className="font-display text-3xl text-black">{settings.minImdbRating.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="6.0" max="9.0" step="0.1" 
                value={settings.minImdbRating} 
                onChange={updateRating}
                className="w-full h-1 bg-[rgba(0,0,0,0.1)] appearance-none cursor-pointer accent-black"
              />
            </div>
          </div>

          {/* Section: Mood Mapping */}
          <div className="animate-enter">
            <h2 className="font-body text-[11px] tracking-widest text-mid uppercase mb-6">Mood & Genre Mapping</h2>
            <div className="flex flex-col gap-2">
              {EMOTIONS.map(emotion => (
                <div key={emotion} className="p-6 glass-frost rounded-3xl">
                  <h3 className="font-body text-[13px] uppercase tracking-wide mb-4 text-black">When I am {emotion}...</h3>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map(genre => {
                      const isActive = (settings.customMoodGenres[emotion] || []).includes(genre)
                      return (
                        <button
                          key={genre}
                          onClick={() => toggleMoodGenre(emotion, genre)}
                          className={`px-3 py-1 font-body text-[10px] tracking-widest uppercase border transition-all duration-300 rounded-full ${
                            isActive 
                              ? 'glass-frost-dark text-cream border-[rgba(255,255,255,0.15)]' 
                              : 'glass-frost-light text-mid border-[rgba(0,0,0,0.1)] hover:border-black hover:text-black'
                          }`}
                        >
                          {genre}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Privacy & Media */}
          <div className="animate-enter">
            <h2 className="font-body text-[11px] tracking-widest text-mid uppercase mb-6">Privacy & Media</h2>
            <div className="flex flex-col gap-2">
              <SettingToggle 
                label="Auto-Play Trailers" 
                description="Automatically play video content on focus"
                value={settings.autoPlay}
                onToggle={() => toggleSetting('autoPlay')}
              />
              <SettingToggle 
                label="Camera Access" 
                description="Allow facial scanning for mood detection"
                value={settings.cameraAccess}
                onToggle={() => toggleSetting('cameraAccess')}
              />
            </div>
          </div>

          <RippleButton 
            onClick={handleSave}
            className="self-start px-8 py-3 bg-black/80 backdrop-blur-md text-cream hover:bg-accent hover:text-black font-body text-[10px] tracking-widest transition-all duration-300 uppercase mt-4 rounded-full border border-[rgba(255,255,255,0.1)]"
          >
            Save Configuration
          </RippleButton>
        </div>
      </div>
      
      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="glass-frost-dark text-cream px-6 py-3 border border-[rgba(255,255,255,0.2)] font-body text-[10px] tracking-widest uppercase shadow-2xl flex items-center gap-3 rounded-full">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          Configuration Saved Successfully
        </div>
      </div>
    </div>
  )
}

function SettingToggle({ label, description, value, onToggle }) {
  return (
    <div className="flex justify-between items-center p-6 glass-frost hover:bg-[rgba(242,237,227,0.7)] transition-all duration-300 cursor-pointer group rounded-3xl" onClick={onToggle}>
      <div>
        <h3 className="font-body text-[13px] uppercase tracking-wide mb-1 text-black">{label}</h3>
        <p className="font-body text-[10px] text-mid tracking-widest uppercase">{description}</p>
      </div>
      <div className={`w-12 h-6 border transition-all duration-300 flex items-center px-1 rounded-full backdrop-blur-sm ${value ? 'bg-black/80 border-black' : 'bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.15)]'}`}>
        <div className={`w-4 h-4 rounded-full bg-current transition-transform duration-300 ${value ? 'translate-x-[24px] text-accent' : 'translate-x-0 text-mid'}`}></div>
      </div>
    </div>
  )
}
