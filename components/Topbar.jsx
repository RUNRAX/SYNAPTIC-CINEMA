'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { triggerGlitch } from '@/hooks/useGlitch'
import { Menu } from 'lucide-react'

const topLinks = [
  { label: 'EXHIBITION', href: '/exhibition' },
  { label: 'COLLECTION', href: '/collection' },
  { label: 'PROFILE', href: '/profile' },
]

export default function Topbar() {
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
    <header className="fixed top-0 left-0 lg:left-[200px] right-0 h-[48px] bg-cream border-b border-[rgba(0,0,0,0.1)] z-40 flex items-center justify-between px-6">
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
      <button className="lg:hidden flex items-center gap-2 font-body text-[11px] tracking-widest text-black">
        MENU <Menu size={16} strokeWidth={1.5} />
      </button>
    </header>
  )
}
