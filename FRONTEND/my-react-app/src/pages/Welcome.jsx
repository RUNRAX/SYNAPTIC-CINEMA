import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/index.js';
import { User } from '../entities/User.js';
import { Rocket, LogIn, UserPlus } from 'lucide-react';
import Starfield from '../components/Starfield';

export default function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log('No user logged in');
    } finally {
      setLoading(false);
    }
  };

  const enterApp = () => {
    setEntering(true);
    setTimeout(() => {
      navigate(createPageUrl('Home'));
    }, 1500);
  };
  
  const goTo = (path) => {
    setEntering(true);
    setTimeout(() => {
      // Assuming you have routes for Login and SignUp
      navigate(createPageUrl(path)); 
    }, 1500);
  };

  return (
    <>
      <style>{`
      .welcome-container {
      height: 100vh;
      width: 100vw;
      background: transparent; /* This is the black background */
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      overflow: hidden;
      position: relative;
      transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
        .welcome-container.entering {
          transform: scale(1.2);
          opacity: 0;
          filter: blur(20px);
        }
        .asteroid-belt {
          position: absolute;
          top: 50%;
          left: 50%;
          border-style: dotted;
          border-color: rgba(100, 100, 100, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotateX(75deg);
          animation: spin-belt 150s linear infinite;
        }
        @keyframes spin-belt {
          from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); }
          to { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
        }
        .welcome-content {
          text-align: center;
          z-index: 10;
          position: relative;
        }
        .content-card {
          background: rgba(40, 40, 40, 0.4);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 3rem 4rem;
          max-width: 500px;
          width: 100%;
        }
        .welcome-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #c0c0c0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        .welcome-subtitle {
          font-size: 1.2rem;
          color: #a3a3a3;
          margin-bottom: 2rem;
          font-weight: 300;
        }
        .user-info {
          text-align: left;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }
        .user-detail {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
          color: #e5e5e5;
          font-size: 0.9rem;
        }
        .user-detail span { font-weight: 600; }
        .user-detail-label { font-weight: 300; color: #a3a3a3; width: 60px; }
        .button-group {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .enter-button {
          padding: 1rem 2rem;
          border: 1px solid rgba(192, 192, 192, 0.5);
          border-radius: 50px;
          background: transparent;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          letter-spacing: 0.05em;
        }
        .enter-button:hover {
          background: rgba(192, 192, 192, 0.2);
          border-color: rgba(192, 192, 192, 0.8);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(192, 192, 192, 0.2);
        }
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 2rem auto 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className={`welcome-container ${entering ? 'entering' : ''}`}>
        <Starfield />
        <div className="asteroid-belt one"></div>
        <div className="asteroid-belt two"></div>

        <div className="welcome-content">
          <div className="content-card">
            <h1 className="welcome-title">SYNAPTIC</h1>
            <p className="welcome-subtitle">PORTAL TO ENTER INFINITE WORLDS</p>

            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                {user ? (
                  <>
                    <div className="user-info">
                      <div className="user-detail">
                        <span className="user-detail-label">USER:</span>
                        <span>{user.full_name || 'User'}</span>
                      </div>
                      <div className="user-detail">
                        <span className="user-detail-label">EMAIL:</span>
                        <span>{user.email}</span>
                      </div>
                    </div>
                    <div className="button-group">
                      <button className="enter-button" onClick={enterApp}>
                        <Rocket size={20} />
                        Launch Experience
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="button-group">
                    <button className="enter-button" onClick={() => goTo('Login')}>
                      <LogIn size={20} />
                      Log In
                    </button>
                    <button className="enter-button" onClick={() => goTo('SignUp')}>
                      <UserPlus size={20} />
                      Sign Up
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}