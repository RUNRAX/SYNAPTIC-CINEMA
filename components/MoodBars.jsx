'use client'

import { useEffect, useState } from 'react'

export default function MoodBars({ moods = {} }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Slight delay to allow component to mount before triggering transition
    const timer = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Map incoming moods to array for easier rendering
  const moodData = [
    { label: 'Happy', value: moods.happy || 0 },
    { label: 'Neutral', value: moods.neutral || 0 },
    { label: 'Surprised', value: moods.surprised || 0 },
    { label: 'Sad', value: moods.sad || 0 },
    { label: 'Angry', value: moods.angry || 0 },
    { label: 'Fear', value: moods.fear || 0 },
    { label: 'Disgust', value: moods.disgust || 0 },
  ]

  return (
    <div className="w-full mt-6">
      <h4 className="font-body text-[11px] tracking-[0.12em] text-mid mb-4">DETECTED MOOD STATE</h4>
      <div className="flex flex-col gap-3">
        {moodData.map((mood, index) => (
          <div key={mood.label} className="w-full">
            <div className="flex justify-between items-center mb-1 font-body text-[11px] tracking-[0.08em] uppercase">
              <span className="text-black">{mood.label}</span>
              <span className="text-mid">{mood.value}%</span>
            </div>
            <div className="w-full h-[2px] bg-[rgba(0,0,0,0.1)] overflow-hidden">
              <div 
                className="h-full bg-black origin-left transition-transform duration-1000 ease-out"
                style={{ 
                  transform: show ? `scaleX(${mood.value / 100})` : 'scaleX(0)',
                  transitionDelay: `${index * 150}ms`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
