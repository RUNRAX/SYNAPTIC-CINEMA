'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, Search, Eye, User, Settings, Grid, Bookmark } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { triggerGlitch } from '@/hooks/useGlitch'

const mobileNavItems = [
  { label: 'HOME', href: '/home', icon: Home },
  { label: 'SEARCH', href: '/search', icon: Search },
  { label: 'EXHIBITION', href: '/exhibition', icon: Grid },
  { label: 'COLLECTION', href: '/collection', icon: Bookmark },
  { label: 'ANALYSIS', href: '/analysis', icon: Eye },
  { label: 'PROFILE', href: '/profile', icon: User },
  { label: 'SETTINGS', href: '/settings', icon: Settings },
]

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleNav = (e, href) => {
    e.preventDefault()
    onClose() // Close menu before navigating
    
    if (pathname === href) return

    // Allow a tiny delay for menu closing animation to start
    setTimeout(() => {
      triggerGlitch(() => {
        router.push(href)
      })
    }, 150)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] glass-frost-dark border-l border-[rgba(255,255,255,0.1)] z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[rgba(255,255,255,0.1)] flex justify-between items-center">
              <span className="font-display text-xl text-cream tracking-tight">MENU</span>
              <button onClick={onClose} className="p-2 text-gray hover:text-white transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2">
              {mobileNavItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNav(e, item.href)}
                    className={`
                      relative flex items-center gap-4 px-8 py-4 
                      font-body text-[12px] tracking-widest transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-gray hover:text-white bg-transparent'}
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"></div>
                    )}
                    <item.icon size={18} strokeWidth={1.5} className={isActive ? 'stroke-white' : 'stroke-gray transition-colors'} />
                    {item.label}
                  </a>
                )
              })}
            </div>

            {/* Footer Brand */}
            <div className="p-6 border-t border-[rgba(255,255,255,0.1)] text-center">
              <span className="font-display text-sm text-gray tracking-wider">SYNAPTIC CINEMA</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
