'use client'

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
  const activeItem = navigationItems.find((item) => pathname?.startsWith(item.href)) || navigationItems[0]

  return (
    <div className="app-shell">
      <PersistentBackground />

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">S</div>
          <div>
            <h1 className="brand-text">Synaptic</h1>
            <p className="brand-subtitle">Mood-first movie discovery</p>
          </div>
        </div>

        <div className="nav-menu">
          {navigationItems.map((item) => (
            <Link key={item.title} href={item.href} className={`nav-link ${pathname === item.href ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <item.icon className="nav-icon" />
              </span>
              <span className="nav-copy">
                <span className="nav-title">{item.title}</span>
                <span className="nav-caption">Open {item.title.toLowerCase()}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          <p>Glass-frost cinematic shell inspired by modern iOS surfaces.</p>
        </div>
      </aside>

      <div className="content-shell">
        <header className="mobile-header">
          <div className="mobile-brand">
            <span className="mobile-brand-mark">S</span>
            <div>
              <strong>Synaptic</strong>
              <span>{activeItem.title}</span>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="page-container">{children}</div>
        </main>
      </div>

      <nav className="mobile-dock">
        {navigationItems.map((item) => (
          <Link key={item.title} href={item.href} className={`mobile-link ${pathname === item.href ? 'active' : ''}`}>
            <item.icon className="mobile-icon" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <style jsx>{`
        .app-shell {
          min-height: 100vh;
          display: flex;
          position: relative;
        }

        /* ═══ SIDEBAR — Dark Frosted Glass ═══ */
        .sidebar {
          width: 304px;
          margin: 1.25rem;
          padding: 1.1rem;
          position: fixed;
          top: 0;
          bottom: 0;
          z-index: 20;
          border-radius: 32px;
          background: rgba(12, 16, 35, 0.60);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(40px) saturate(140%);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.50);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.6rem;
        }
        .brand-mark,
        .mobile-brand-mark {
          width: 3rem;
          height: 3rem;
          border-radius: 18px;
          display: grid;
          place-items: center;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, rgba(140, 100, 255, 0.5), rgba(80, 60, 200, 0.35));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 12px 28px rgba(0, 0, 0, 0.30);
        }
        .brand-text {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #eef2ff;
        }
        .brand-subtitle {
          margin: 0.2rem 0 0;
          color: #8494c0;
          font-size: 0.94rem;
        }

        /* ═══ NAV LINKS ═══ */
        .nav-menu {
          display: grid;
          gap: 0.65rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.95rem;
          padding: 0.85rem 1.1rem;
          color: #8494c0;
          text-decoration: none;
          border-radius: 99px;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .nav-link:hover {
          color: #eef2ff;
          transform: translateY(-2px) scale(1.01);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
          border-color: rgba(255, 255, 255, 0.15);
        }
        .nav-link.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(140, 100, 255, 0.25), rgba(80, 60, 200, 0.15));
          border-color: rgba(140, 100, 255, 0.4);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .nav-icon-wrap {
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }
        .nav-icon {
          width: 1.15rem;
          height: 1.15rem;
        }
        .nav-copy {
          display: grid;
          gap: 0.16rem;
        }
        .nav-title {
          font-weight: 650;
        }
        .nav-caption {
          font-size: 0.82rem;
          color: #6e7da8;
        }
        .sidebar-footer {
          margin-top: auto;
          padding: 1rem 0.4rem 0.3rem;
          color: #6e7da8;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* ═══ CONTENT SHELL ═══ */
        .content-shell {
          flex: 1;
          margin-left: 336px;
          position: relative;
          z-index: 2;
        }
        .mobile-header {
          display: none;
        }
        .main-content {
          min-height: 100vh;
        }
        .page-container {
          padding: 2rem 2rem 3rem;
          max-width: 1500px;
          margin: 0 auto;
        }
        .mobile-dock {
          display: none;
        }

        /* ═══ MOBILE ═══ */
        @media (max-width: 1024px) {
          .sidebar {
            display: none;
          }
          .content-shell {
            margin-left: 0;
          }
          .mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: calc(1rem + env(safe-area-inset-top, 0px)) 1rem 0;
            position: sticky;
            top: 0;
            z-index: 12;
          }
          .mobile-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 0.95rem;
            border-radius: 24px;
            background: rgba(12, 16, 35, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(40px) saturate(140%);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.40);
          }
          .mobile-brand strong {
            display: block;
            color: #eef2ff;
            font-size: 1rem;
          }
          .mobile-brand span {
            display: block;
            color: #6e7da8;
            font-size: 0.78rem;
            margin-top: 0.1rem;
          }
          .page-container {
            padding: 0.5rem 1rem calc(7rem + env(safe-area-inset-bottom, 0px));
          }
          .mobile-dock {
            position: fixed;
            left: 50%;
            bottom: calc(0.9rem + env(safe-area-inset-bottom, 0px));
            transform: translateX(-50%);
            width: min(94vw, 32rem);
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 0.35rem;
            padding: 0.55rem;
            z-index: 25;
            border-radius: 28px;
            background: rgba(12, 16, 35, 0.70);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(40px) saturate(140%);
            box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45);
          }
          .mobile-link {
            display: grid;
            place-items: center;
            gap: 0.25rem;
            padding: 0.7rem 0.35rem;
            border-radius: 20px;
            text-decoration: none;
            color: #8494c0;
            font-size: 0.7rem;
            font-weight: 600;
          }
          .mobile-link.active {
            color: #eef2ff;
            background: rgba(255, 255, 255, 0.08);
          }
          .mobile-icon {
            width: 1.1rem;
            height: 1.1rem;
          }
        }
      `}</style>
    </div>
  )
}
