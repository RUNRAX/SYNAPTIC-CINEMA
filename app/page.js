'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@/entities/User'
import { Rocket, LogIn, UserPlus, Sparkles } from 'lucide-react'

export default function Welcome() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [entering, setEntering] = useState(false)

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
    setEntering(true)
    setTimeout(() => {
      router.push('/Home')
    }, 700)
  }

  return (
    <div className={`welcome-container ${entering ? 'entering' : ''}`}>
      <div className="welcome-backdrop" aria-hidden="true">
        <div className="welcome-orb orb-a" />
        <div className="welcome-orb orb-b" />
        <div className="welcome-orb orb-c" />
        <div className="welcome-grid" />
      </div>

      <div className="welcome-content">
        <div className="content-card">
          <div className="welcome-chip">
            <Sparkles size={15} />
            Mood-powered cinema
          </div>
          <h1 className="welcome-title">SYNAPTIC</h1>
          <p className="welcome-subtitle">A glass-frost home for movies, series, and emotion-based discovery.</p>

          {loading ? (
            <div className="loading-spinner" />
          ) : (
            <>
              {user ? (
                <>
                  <div className="user-info">
                    <div className="user-detail">
                      <span className="user-detail-label">User</span>
                      <span>{user.full_name || 'User'}</span>
                    </div>
                    <div className="user-detail">
                      <span className="user-detail-label">Email</span>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="button-group">
                    <button className="enter-button primary" onClick={enterApp}>
                      <Rocket size={20} />
                      Launch Experience
                    </button>
                  </div>
                </>
              ) : (
                <div className="button-group">
                  <Link href="/Login" className="enter-button primary">
                    <LogIn size={20} />
                    Log In
                  </Link>
                  <Link href="/SignUp" className="enter-button secondary">
                    <UserPlus size={20} />
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .welcome-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          padding: 1.5rem;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .welcome-container.entering {
          opacity: 0;
          transform: scale(1.03);
        }
        .welcome-backdrop {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 16%, rgba(111, 180, 255, 0.28), transparent 28%),
            radial-gradient(circle at 82% 20%, rgba(255, 145, 198, 0.22), transparent 25%),
            radial-gradient(circle at 72% 78%, rgba(255, 197, 115, 0.18), transparent 26%),
            linear-gradient(180deg, rgba(250, 246, 255, 0.98) 0%, rgba(238, 244, 255, 0.98) 100%);
        }
        .welcome-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(75px);
          opacity: 0.72;
          animation: drift 16s ease-in-out infinite;
        }
        .orb-a {
          width: 28rem;
          height: 28rem;
          top: -8rem;
          right: -8rem;
          background: rgba(111, 180, 255, 0.28);
        }
        .orb-b {
          width: 20rem;
          height: 20rem;
          left: -4rem;
          bottom: 4rem;
          background: rgba(255, 145, 198, 0.24);
          animation-delay: -6s;
        }
        .orb-c {
          width: 18rem;
          height: 18rem;
          left: 50%;
          top: 18%;
          background: rgba(121, 255, 213, 0.18);
          animation-delay: -11s;
        }
        .welcome-grid {
          position: absolute;
          inset: 0;
          opacity: 0.24;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 92%);
        }
        @keyframes drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(1.5rem, -1rem, 0) scale(1.05); }
        }
        .welcome-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 40rem;
        }
        .content-card {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.42));
          backdrop-filter: blur(30px) saturate(170%);
          border: 1px solid rgba(255, 255, 255, 0.64);
          border-radius: 36px;
          padding: 3rem;
          box-shadow: 0 30px 80px rgba(82, 97, 153, 0.18);
          text-align: center;
        }
        .welcome-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.9rem;
          margin-bottom: 1rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.58);
          border: 1px solid rgba(255, 255, 255, 0.62);
          color: var(--text-soft);
          font-size: 0.88rem;
          font-weight: 700;
        }
        .welcome-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          background: linear-gradient(135deg, var(--text-strong) 0%, #5f6de3 46%, var(--text-strong) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 0.8rem;
          letter-spacing: -0.06em;
        }
        .welcome-subtitle {
          font-size: 1.08rem;
          color: var(--text-soft);
          margin: 0 auto 2rem;
          max-width: 28rem;
          line-height: 1.7;
        }
        .user-info {
          text-align: left;
          display: grid;
          gap: 0.9rem;
          padding: 1.2rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.48);
          border: 1px solid rgba(255, 255, 255, 0.58);
        }
        .user-detail {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          color: var(--text-strong);
          font-size: 0.95rem;
        }
        .user-detail-label {
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.78rem;
        }
        .button-group {
          margin-top: 1.6rem;
          display: grid;
          gap: 0.9rem;
        }
        .enter-button {
          padding: 1rem 1.25rem;
          border-radius: 20px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          text-decoration: none;
          border: 1px solid transparent;
        }
        .enter-button.primary {
          background: linear-gradient(135deg, #7f8cff, #5f6de3);
          color: white;
          box-shadow: 0 18px 34px rgba(95, 109, 227, 0.22);
        }
        .enter-button.secondary {
          background: rgba(255, 255, 255, 0.64);
          color: var(--text-strong);
          border-color: rgba(255, 255, 255, 0.62);
        }
        .enter-button:hover {
          transform: translateY(-2px);
        }
        .loading-spinner {
          width: 54px;
          height: 54px;
          border: 4px solid rgba(127, 140, 255, 0.18);
          border-top-color: #5f6de3;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
          margin: 2rem auto 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .content-card {
            padding: 2rem 1.25rem;
            border-radius: 28px;
          }
          .user-detail {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
