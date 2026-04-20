'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Eye, Search, User, Settings } from 'lucide-react'
import PersistentBackground from '@/components/PersistentBackground'

const navigationItems = [
  { title: 'Home', href: '/Home', icon: Home },
  { title: 'Synaptic', href: '/Synaptic', icon: Eye },
  { title: 'Search', href: '/Search', icon: Search },
  { title: 'Profile', href: '/Profile', icon: User },
  { title: 'Settings', href: '/Settings', icon: Settings },
]

export default function MainLayout({ children }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const showBackground = !pathname?.includes('Synaptic')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setTransitioning(true)
      const timer = setTimeout(() => setTransitioning(false), 800)
      return () => clearTimeout(timer)
    }
  }, [pathname, mounted])

  if (!mounted) return null

  return (
    <div className="app-container">
      {showBackground && <PersistentBackground />}
      <nav className="sidebar">
        <div className="sidebar-brand">
          <h1 className="brand-text">Synaptic</h1>
        </div>

        <div className="nav-menu">
          {navigationItems.map((item) => (
            <div key={item.title} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                <item.icon className="nav-icon" />
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      <main className={`main-content ${transitioning ? 'transitioning' : ''}`}>
        <div className="page-container">
          {children}
        </div>
      </main>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          background: linear-gradient(135deg, var(--primary-white) 0%, var(--secondary-white) 100%);
          position: relative;
        }
        .app-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 80%, var(--glass-bg) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--glass-bg) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }
        .sidebar {
          width: 280px;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-right: 1px solid var(--glass-border);
          padding: 2rem 0;
          position: fixed;
          height: 100vh;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar-brand {
          padding: 0 2rem 3rem;
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 2rem;
        }
        .brand-text {
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--grey-800) 0%, var(--silver) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        .nav-menu { padding: 0 1rem; }
        .nav-item { margin-bottom: 0.5rem; }
        .nav-link {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          color: var(--grey-600);
          text-decoration: none;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          font-weight: 500;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--glass-bg), transparent);
          transition: left 0.5s ease;
        }
        .nav-link:hover::before { left: 100%; }
        .nav-link:hover, .nav-link.active {
          color: var(--grey-800);
          background: var(--glass-bg);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px var(--shadow-light);
        }
        .nav-icon {
          width: 24px;
          height: 24px;
          margin-right: 1rem;
        }
        .main-content {
          flex: 1;
          margin-left: 280px;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }
        .main-content.transitioning {
          animation: page-transition 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes page-transition {
          0% {
            clip-path: circle(0% at 50% 50%);
            opacity: 0.8;
            transform: scale(1.05);
          }
          100% {
            clip-path: circle(150% at 50% 50%);
            opacity: 1;
            transform: scale(1);
          }
        }
        .page-container {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .sidebar { transform: translateX(-100%); }
          .main-content { margin-left: 0; }
          .page-container { padding: 1rem; }
        }
      `}</style>
    </div>
  )
}
