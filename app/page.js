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
        <div className="welcome-aurora a1" />
        <div className="welcome-aurora a2" />
        <div className="welcome-aurora a3" />
        <div className="welcome-aurora a4" />
        <div className="welcome-vignette" />
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

        /* ── Aurora Background ── */
        .welcome-backdrop {
          position: absolute;
          inset: 0;
          background: #0a0e1a;
        }
        .welcome-aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(10px);
          mix-blend-mode: screen;
          will-change: transform;
          opacity: 0.7;
        }
        .welcome-aurora.a1 {
          width: 120vw; height: 50vh;
          top: -10%; left: -20%;
          background: radial-gradient(ellipse at center, rgba(120, 40, 200, 0.50) 0%, rgba(80, 20, 160, 0.25) 40%, transparent 70%);
          animation: aurora-w1 20s ease-in-out infinite alternate;
        }
        .welcome-aurora.a2 {
          width: 100vw; height: 40vh;
          top: 5%; right: -15%;
          background: radial-gradient(ellipse at center, rgba(0, 200, 170, 0.40) 0%, rgba(0, 150, 130, 0.18) 45%, transparent 70%);
          animation: aurora-w2 16s ease-in-out infinite alternate;
        }
        .welcome-aurora.a3 {
          width: 90vw; height: 45vh;
          bottom: 5%; left: -10%;
          background: radial-gradient(ellipse at center, rgba(200, 50, 180, 0.45) 0%, rgba(160, 30, 140, 0.20) 40%, transparent 70%);
          animation: aurora-w3 14s ease-in-out infinite alternate;
        }
        .welcome-aurora.a4 {
          width: 110vw; height: 35vh;
          top: 30%; left: 10%;
          background: radial-gradient(ellipse at center, rgba(80, 180, 255, 0.30) 0%, rgba(60, 130, 220, 0.12) 45%, transparent 70%);
          animation: aurora-w4 22s ease-in-out infinite alternate;
        }
        .welcome-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(8, 10, 22, 0.55) 100%);
        }

        @keyframes aurora-w1 {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(12vw, 8vh, 0) rotate(8deg) scale(1.15); }
        }
        @keyframes aurora-w2 {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(-15vw, 5vh, 0) rotate(-6deg) scale(1.10); }
        }
        @keyframes aurora-w3 {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(10vw, -10vh, 0) rotate(10deg) scale(1.12); }
        }
        @keyframes aurora-w4 {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(-8vw, 6vh, 0) rotate(-5deg) scale(1.08); }
        }

        /* ── Content Card — Dark Frosted Glass ── */
        .welcome-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 40rem;
        }
        .content-card {
          background: rgba(12, 16, 35, 0.55);
          backdrop-filter: blur(40px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 36px;
          padding: 3rem;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.50);
          text-align: center;
        }
        .welcome-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.9rem;
          margin-bottom: 1rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          color: #b0bde0;
          font-size: 0.88rem;
          font-weight: 700;
        }
        .welcome-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          background: linear-gradient(135deg, #eef2ff 0%, #a0b4ff 46%, #c090ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 0.8rem;
          letter-spacing: -0.06em;
        }
        .welcome-subtitle {
          font-size: 1.08rem;
          color: #8494c0;
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
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .user-detail {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          color: #eef2ff;
          font-size: 0.95rem;
        }
        .user-detail-label {
          color: #6e7da8;
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
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
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
          box-shadow: 0 18px 34px rgba(95, 109, 227, 0.30);
        }
        .enter-button.secondary {
          background: rgba(255, 255, 255, 0.06);
          color: #eef2ff;
          border-color: rgba(255, 255, 255, 0.10);
        }
        .enter-button:hover {
          transform: translateY(-2px);
        }
        .loading-spinner {
          width: 54px;
          height: 54px;
          border: 4px solid rgba(140, 160, 255, 0.15);
          border-top-color: #7f8cff;
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
