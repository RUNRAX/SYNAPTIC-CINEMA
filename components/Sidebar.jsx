'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { triggerGlitch } from '@/hooks/useGlitch'
import { Home, Search, Eye, User, Settings } from 'lucide-react'

const navItems = [
  { label: 'HOME', href: '/home', icon: Home },
  { label: 'SEARCH', href: '/search', icon: Search },
  { label: 'ANALYSIS', href: '/analysis', icon: Eye },
  { label: 'PROFILE', href: '/profile', icon: User },
  { label: 'SETTINGS', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNav = (e, href) => {
    e.preventDefault()
    if (pathname === href) return

    triggerGlitch(() => {
      router.push(href)
    })
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[200px] bg-black border-r border-[rgba(255,255,255,0.1)] flex flex-col z-50 hidden lg:flex">
      {/* Brand Block */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.1)] flex flex-col gap-8">
        <div className="flex justify-between items-center text-gray font-body text-[11px] tracking-widest">
          <span>MENU ≡</span>
          <span>©2026</span>
        </div>
        
        <div>
          <h1 className="font-display text-4xl text-cream tracking-tight leading-none mb-2">SYNAPTIC</h1>
          <p className="font-body text-[10px] text-mid leading-relaxed pr-4">
            Mood-first movie discovery. Discover trending worlds, featured films...
          </p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="mt-auto border-t border-[rgba(255,255,255,0.1)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              className={`
                sidebar-nav-item
                group relative flex items-center gap-4 px-6 py-4 
                font-body text-[11px] tracking-widest transition-colors duration-300
                border-b border-[#1A1A1A]
                ${isActive ? 'text-white' : 'text-gray hover:text-white'}
              `}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"></div>
              )}
              
              {/* Hover Background */}
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"></div>
              
              <div className="relative z-10 flex items-center gap-4">
                <item.icon size={16} strokeWidth={1.5} className={isActive ? 'stroke-white' : 'stroke-gray group-hover:stroke-white transition-colors'} />
                {item.label}
              </div>
            </a>
          )
        })}
      </nav>

      {/* Explore Button */}
      <a 
        href="/collection"
        onClick={(e) => handleNav(e, '/collection')}
        className="sidebar-explore block p-6 text-center border-t border-[#1A1A1A] text-gray hover:text-white font-body text-[11px] tracking-widest transition-colors relative group"
      >
        <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <span className="relative z-10">⊞ EXPLORE</span>
      </a>
    </aside>
  )
}
