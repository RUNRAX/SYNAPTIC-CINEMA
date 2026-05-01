'use client'

import { useState } from 'react'
import RippleButton from '@/components/RippleButton'

export default function Settings() {
  const [settings, setSettings] = useState({
    highPerformance: true,
    haptics: true,
    dataSaver: false,
    autoPlay: true,
    cameraAccess: true
  })

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="w-full min-h-full flex flex-col relative pb-8">
      {/* Header */}
      <div className="px-6 lg:px-12 py-12 relative z-10 border-b border-[rgba(0,0,0,0.1)]">
        <h1 className="font-display text-7xl text-black leading-none mb-4">Settings</h1>
        <p className="font-body text-[12px] text-mid tracking-[0.08em] uppercase max-w-md">
          Configure system parameters and preferences
        </p>
      </div>

      <div className="p-6 lg:p-12 relative z-10 max-w-3xl">
        <div className="flex flex-col gap-12">
          
          {/* Section 1 */}
          <div>
            <h2 className="font-body text-[11px] tracking-widest text-mid uppercase mb-6">System Performance</h2>
            <div className="flex flex-col gap-[1px] bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.1)]">
              <SettingToggle 
                label="High Performance Mode" 
                description="Enables complex WebGL and CSS animations"
                value={settings.highPerformance}
                onToggle={() => toggleSetting('highPerformance')}
              />
              <SettingToggle 
                label="Haptic Feedback" 
                description="Enable device vibration on interactions"
                value={settings.haptics}
                onToggle={() => toggleSetting('haptics')}
              />
              <SettingToggle 
                label="Data Saver" 
                description="Load lower resolution imagery to save bandwidth"
                value={settings.dataSaver}
                onToggle={() => toggleSetting('dataSaver')}
              />
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="font-body text-[11px] tracking-widest text-mid uppercase mb-6">Privacy & Media</h2>
            <div className="flex flex-col gap-[1px] bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.1)]">
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
            className="self-start px-8 py-3 bg-black text-cream hover:bg-accent hover:text-black font-body text-[10px] tracking-widest transition-colors uppercase mt-4"
          >
            Save Configuration
          </RippleButton>
        </div>
      </div>
    </div>
  )
}

function SettingToggle({ label, description, value, onToggle }) {
  return (
    <div className="flex justify-between items-center p-6 bg-cream hover:bg-cream-2 transition-colors cursor-pointer group" onClick={onToggle}>
      <div>
        <h3 className="font-body text-[13px] uppercase tracking-wide mb-1 text-black">{label}</h3>
        <p className="font-body text-[10px] text-mid tracking-widest uppercase">{description}</p>
      </div>
      <div className={`w-12 h-6 border transition-colors flex items-center px-1 ${value ? 'bg-black border-black' : 'bg-transparent border-[rgba(0,0,0,0.2)]'}`}>
        <div className={`w-4 h-4 bg-current transition-transform ${value ? 'translate-x-6 text-accent' : 'translate-x-0 text-mid'}`}></div>
      </div>
    </div>
  )
}
