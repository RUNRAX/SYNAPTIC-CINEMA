import React, { useState, useEffect } from 'react';
import { User } from '../entities/User.js';
import { Edit3, Mail, Calendar, Award, Heart, Eye } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setEditForm({
        full_name: currentUser.full_name || '',
        favorite_genres: currentUser.favorite_genres || [],
        bio: currentUser.bio || ''
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const updatedUser = await User.updateMyUserData(editForm);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--shimmer)', borderRadius: '50%' }} />
      </div>
    );
  }

  return (
    <>
      <style>{`
        .profile-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-white) 0%, var(--secondary-white) 100%);
          padding: 2rem;
        }
        .profile-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .profile-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--grey-800) 0%, var(--silver) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .profile-content {
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
        }
        .profile-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .profile-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px var(--shadow-medium);
        }
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--silver) 0%, var(--silver-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary-white);
          box-shadow: 0 15px 30px var(--shadow-light);
        }
        .profile-info { text-align: center; }
        .profile-name {
          font-size: 2rem;
          font-weight: 700;
          color: var(--grey-800);
          margin-bottom: 0.5rem;
        }
        .profile-email {
          color: var(--grey-600);
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        .profile-bio {
          color: var(--grey-700);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .profile-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .stat-item {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px var(--shadow-light);
        }
        .stat-icon {
          width: 32px;
          height: 32px;
          color: var(--silver);
          margin: 0 auto 0.75rem;
        }
        .stat-number {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--grey-800);
          margin-bottom: 0.25rem;
        }
        .stat-label {
          color: var(--grey-600);
          font-weight: 500;
          font-size: 0.9rem;
        }
        .edit-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-700);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 0 auto;
        }
        .edit-button:hover {
          background: var(--silver-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-light);
        }
        .edit-form { display: grid; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-label { font-weight: 600; color: var(--grey-700); }
        .form-input {
          padding: 0.75rem 1rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-800);
          outline: none;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          border-color: var(--silver);
          box-shadow: 0 0 0 3px var(--glass-bg);
        }
        .form-textarea { min-height: 100px; resize: vertical; }
        .form-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .save-button {
          padding: 0.75rem 2rem;
          background: var(--silver);
          border: none;
          border-radius: 12px;
          color: var(--primary-white);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .save-button:hover {
          background: var(--silver-dark);
          transform: translateY(-2px);
        }
        .cancel-button {
          padding: 0.75rem 2rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-700);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cancel-button:hover { background: var(--glass-bg); }
        @media (max-width: 768px) {
          .profile-title { font-size: 2rem; }
          .profile-stats { grid-template-columns: 1fr; }
          .form-buttons { flex-direction: column; }
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Your Profile</h1>
        </div>
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">{user?.full_name?.[0]?.toUpperCase() || 'U'}</div>
            <div className="profile-info">
              {!isEditing ? (
                <>
                  <h2 className="profile-name">{user?.full_name || 'User'}</h2>
                  <p className="profile-email">
                    <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    {user?.email}
                  </p>
                  {user?.bio && (<p className="profile-bio">{user.bio}</p>)}
                  <button className="edit-button" onClick={() => setIsEditing(true)}>
                    <Edit3 size={16} /> Edit Profile
                  </button>
                </>
              ) : (
                <div className="edit-form">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" value={editForm.full_name} onChange={(e) => setEditForm({...editForm, full_name: e.target.value})} placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea className="form-input form-textarea" value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} placeholder="Tell us about yourself..." />
                  </div>
                  <div className="form-buttons">
                    <button className="save-button" onClick={handleSaveProfile}>Save Changes</button>
                    <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <Heart className="stat-icon" />
              <div className="stat-number">42</div>
              <div className="stat-label">Favorites</div>
            </div>
            <div className="stat-item">
              <Eye className="stat-icon" />
              <div className="stat-number">128</div>
              <div className="stat-label">Watched</div>
            </div>
            <div className="stat-item">
              <Award className="stat-icon" />
              <div className="stat-number">5</div>
              <div className="stat-label">Reviews</div>
            </div>
            <div className="stat-item">
              <Calendar className="stat-icon" />
              <div className="stat-number">{user?.created_date ? new Date(user.created_date).getFullYear() : '2024'}</div>
              <div className="stat-label">Member Since</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}