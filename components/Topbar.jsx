'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { triggerGlitch } from '@/hooks/useGlitch'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const topLinks = [
  { label: 'EXHIBITION', href: '/exhibition' },
  { label: 'COLLECTION', href: '/collection' },
  { label: 'PROFILE', href: '/profile' },
]

const mobileLinks = [
  { label: 'HOME', href: '/home' },
  { label: 'SEARCH', href: '/search' },
  { label: 'EXHIBITION', href: '/exhibition' },
  { label: 'COLLECTION', href: '/collection' },
  { label: 'ANALYSIS', href: '/analysis' },
  { label: 'PROFILE', href: '/profile' },
  { label: 'SETTINGS', href: '/settings' },
]

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (pathname === href) return

    triggerGlitch(() => {
      router.push(href)
    })
  }

  return (
    <>
      <header className="fixed top-[10px] left-[10px] lg:left-[220px] right-[10px] h-[48px] glass-frost rounded-full z-40 flex items-center justify-between px-6">
      {/* Mobile Logo / Brand */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full border-[1.5px] border-black flex items-center justify-center">
          <span className="font-display font-bold text-[10px] leading-none mt-[1px]">S</span>
        </div>
        <span className="font-display text-[14px] tracking-wider lg:hidden">SYNAPTIC</span>
        <span className="font-display text-[14px] tracking-wider hidden lg:block">SYNAPTIC</span>
      </div>

      {/* Desktop Links */}
      <nav className="hidden lg:flex items-center gap-8">
        {topLinks.map((link) => {
          const isActive = pathname === link.href
          
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="group relative font-body text-[11px] tracking-[0.1em] text-black"
            >
              {link.label}
              <span 
                className={`
                  absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                `}
              ></span>
            </a>
          )
        })}
      </nav>

      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden flex items-center gap-2 font-body text-[11px] tracking-widest text-black"
        onClick={() => setMenuOpen(true)}
      >
        MENU <Menu size={16} strokeWidth={1.5} />
      </button>
    </header>

    {/* Mobile Fullscreen Menu */}
    {menuOpen && (
      <div className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center lg:hidden">
        <button 
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-black"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
        
        <nav className="flex flex-col items-center gap-8">
          {mobileLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`font-display text-4xl tracking-widest transition-colors duration-300 ${pathname === link.href ? 'text-accent' : 'text-black hover:text-mid'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    )}
    </>
  )
}
