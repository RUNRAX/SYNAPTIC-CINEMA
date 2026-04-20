'use client'

import React, { useState, useEffect } from 'react'
import { User } from '@/entities/User'
import { Settings as SettingsIcon, Moon, Sun, Shield, Globe, Palette, LogOut, Save, Code, X, RotateCcw } from 'lucide-react'

// NEW: A single, comprehensive map of all available genres.
const ALL_GENRES_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759: 'Action & Adventure',
  10762: 'Kids', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy',
  10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
};

const initialDevSettings = {
  minImdbRating: 7.5,
  genreOverrides: {
    happy: [], sad: [], angry: [],
    fearful: [], surprised: [], neutral: []
  }
};

export default function Settings() {
  // Original settings state - UNCHANGED
  const [settings, setSettings] = useState({
    darkMode: false, notifications: true, language: 'en', autoplay: true,
    quality: 'hd', privacy: 'friends', newsletter: false
  });

  // NEW: State for developer options, now with array for genres
  const [devSettings, setDevSettings] = useState(initialDevSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadSettings(); }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const currentUser = await User.me();
      const savedSettings = {
        darkMode: localStorage.getItem('theme') === 'dark',
        notifications: currentUser.notifications !== false, language: currentUser.language || 'en',
        autoplay: currentUser.autoplay !== false, quality: currentUser.quality || 'hd',
        privacy: currentUser.privacy || 'friends', newsletter: currentUser.newsletter || false
      };
      setSettings(savedSettings);

      const savedDevSettings = localStorage.getItem('devSettings');
      if (savedDevSettings) {
        setDevSettings(JSON.parse(savedDevSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Original handler - UNCHANGED
  const handleSettingChange = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  // NEW: Handlers for developer settings
  const handleDevSettingChange = (key, value) => setDevSettings(prev => ({ ...prev, [key]: value }));

  const handleAddGenre = (emotion, genreId) => {
    if (!genreId || genreId === 'default') return;
    const numericId = parseInt(genreId, 10);
    setDevSettings(prev => {
      const currentGenres = prev.genreOverrides[emotion] || [];
      if (currentGenres.includes(numericId)) return prev; // Avoid duplicates
      return {
        ...prev,
        genreOverrides: { ...prev.genreOverrides, [emotion]: [...currentGenres, numericId] }
      };
    });
  };

  const handleRemoveGenre = (emotion, genreId) => {
    setDevSettings(prev => ({
      ...prev,
      genreOverrides: {
        ...prev.genreOverrides,
        [emotion]: prev.genreOverrides[emotion].filter(id => id !== genreId)
      }
    }));
  };

  const handleResetDevSettings = () => {
    setDevSettings(initialDevSettings);
    localStorage.removeItem('devSettings');
    alert('Developer options have been reset to default.');
  };

  const saveSettings = async () => {
    try {
      await User.updateMyUserData({
        notifications: settings.notifications, language: settings.language,
        autoplay: settings.autoplay, quality: settings.quality,
        privacy: settings.privacy, newsletter: settings.newsletter
      });
      localStorage.setItem('devSettings', JSON.stringify(devSettings));
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    }
  };

  // Original theme and logout handlers - UNCHANGED
  const handleThemeToggle = () => {
    const newDarkMode = !settings.darkMode;
    setSettings(prev => ({ ...prev, darkMode: newDarkMode }));
    document.documentElement.className = newDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };
  const handleLogout = async () => { try { await User.logout(); } catch (e) { console.error(e); } };
  
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <style>{`
        /* All existing styles remain unchanged */
        .settings-container { min-height: 100vh; background: linear-gradient(135deg, var(--primary-white) 0%, var(--secondary-white) 100%); padding: 2rem; }
        .settings-header { text-align: center; margin-bottom: 3rem; }
        .settings-title { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, var(--grey-800) 0%, var(--silver) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .settings-content { max-width: 800px; margin: 0 auto; display: grid; gap: 2rem; }
        .settings-section { background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: 24px; padding: 2rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .settings-section:hover { transform: translateY(-4px); box-shadow: 0 20px 40px var(--shadow-medium); }
        .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--glass-border); }
        .section-icon { width: 24px; height: 24px; color: var(--silver); }
        .section-title { font-size: 1.5rem; font-weight: 700; color: var(--grey-800); }
        .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--glass-border); }
        .setting-item:last-child { border-bottom: none; }
        .setting-info { flex: 1; }
        .setting-label { font-size: 1.1rem; font-weight: 600; color: var(--grey-800); margin-bottom: 0.25rem; }
        .setting-description { color: var(--grey-600); font-size: 0.9rem; }
        .setting-control { margin-left: 1rem; }
        .toggle-switch { width: 60px; height: 32px; background: var(--grey-300); border-radius: 16px; position: relative; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; }
        .toggle-switch.active { background: var(--silver); }
        .toggle-switch::after { content: ''; width: 28px; height: 28px; background: var(--primary-white); border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: transform 0.3s ease; box-shadow: 0 2px 8px var(--shadow-light); }
        .toggle-switch.active::after { transform: translateX(28px); }
        .setting-select { padding: 0.5rem 1rem; background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: 12px; color: var(--grey-800); outline: none; cursor: pointer; transition: all 0.3s ease; }
        .setting-select:hover, .setting-select:focus { background: var(--silver-light); border-color: var(--silver); }
        .action-button { display: flex; align-items: center; justify-content: center; gap: 0.75rem; width: 100%; padding: 1rem 2rem; border-radius: 16px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .save-button { background: var(--silver); border: none; color: var(--primary-white); margin-top: 1rem; }
        .save-button:hover { background: var(--silver-dark); transform: translateY(-4px); box-shadow: 0 15px 30px var(--shadow-medium); }
        .logout-button { background: transparent; border: 1px solid var(--glass-border); color: var(--grey-700); margin-top: 1rem; }
        .logout-button:hover { background: var(--glass-bg); transform: translateY(-2px); box-shadow: 0 10px 25px var(--shadow-light); }
        
        /* --- STYLES FOR DEV OPTIONS --- */
        .slider-container { display: flex; align-items: center; gap: 1rem; width: 250px; }
        .slider { flex: 1; -webkit-appearance: none; appearance: none; width: 100%; height: 8px; background: var(--grey-300); border-radius: 4px; outline: none; }
        .slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; background: var(--silver); cursor: pointer; border-radius: 50%; }
        .slider-value { font-weight: 600; color: var(--grey-800); min-width: 40px; text-align: right; }
        .genre-override-container { padding-top: 1rem; }
        .genre-item { padding: 1rem 0; border-bottom: 1px solid var(--glass-border); }
        .genre-item:last-child { border-bottom: none; }
        .genre-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .emotion-label { font-weight: 600; color: var(--grey-800); text-transform: capitalize; font-size: 1.1rem; min-width: 120px; }
        .genre-header .setting-select { width: 200px; }
        .genre-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .genre-tag { display: flex; align-items: center; gap: 0.5rem; background: var(--silver-light); color: var(--grey-700); padding: 0.25rem 0.75rem; border-radius: 8px; font-size: 0.9rem; font-weight: 500; }
        .remove-genre-btn { cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .reset-button { background: var(--grey-200); border: 1px solid var(--glass-border); color: var(--grey-700); margin-top: 1rem; }
        .reset-button:hover { background: var(--grey-300); }
      `}</style>

      <div className="settings-container">
        <div className="settings-header"><h1 className="settings-title">Settings</h1></div>
        <div className="settings-content">
          {/* --- ORIGINAL SECTIONS - UNCHANGED --- */}
          <div className="settings-section">
            <div className="section-header"><Palette className="section-icon" /><h2 className="section-title">Appearance</h2></div>
            <div className="setting-item">
              <div className="setting-info"><div className="setting-label">Dark Mode</div><div className="setting-description">Switch between light and dark themes</div></div>
              <div className="setting-control"><div className={`toggle-switch ${settings.darkMode ? 'active' : ''}`} onClick={handleThemeToggle}>{settings.darkMode ? <Moon size={16} /> : <Sun size={16} />}</div></div>
            </div>
          </div>
          <div className="settings-section">
            <div className="section-header"><Globe className="section-icon" /><h2 className="section-title">Playback</h2></div>
            <div className="setting-item">
              <div className="setting-info"><div className="setting-label">Autoplay</div><div className="setting-description">Automatically play next episode</div></div>
              <div className="setting-control"><div className={`toggle-switch ${settings.autoplay ? 'active' : ''}`} onClick={() => handleSettingChange('autoplay', !settings.autoplay)} /></div>
            </div>
            <div className="setting-item">
              <div className="setting-info"><div className="setting-label">Video Quality</div><div className="setting-description">Default playback quality</div></div>
              <div className="setting-control"><select className="setting-select" value={settings.quality} onChange={(e) => handleSettingChange('quality', e.target.value)}><option value="auto">Auto</option><option value="hd">HD (1080p)</option><option value="md">Standard (720p)</option><option value="sd">Basic (480p)</option></select></div>
            </div>
          </div>
          <div className="settings-section">
            <div className="section-header"><Shield className="section-icon" /><h2 className="section-title">Privacy</h2></div>
            <div className="setting-item">
              <div className="setting-info"><div className="setting-label">Notifications</div><div className="setting-description">Receive updates and recommendations</div></div>
              <div className="setting-control"><div className={`toggle-switch ${settings.notifications ? 'active' : ''}`} onClick={() => handleSettingChange('notifications', !settings.notifications)} /></div>
            </div>
            <div className="setting-item">
              <div className="setting-info"><div className="setting-label">Profile Visibility</div><div className="setting-description">Who can see your profile</div></div>
              <div className="setting-control"><select className="setting-select" value={settings.privacy} onChange={(e) => handleSettingChange('privacy', e.target.value)}><option value="public">Public</option><option value="friends">Friends Only</option><option value="private">Private</option></select></div>
            </div>
            <div className="setting-item">
              <div className="setting-info"><div className="setting-label">Newsletter</div><div className="setting-description">Receive weekly content updates</div></div>
              <div className="setting-control"><div className={`toggle-switch ${settings.newsletter ? 'active' : ''}`} onClick={() => handleSettingChange('newsletter', !settings.newsletter)} /></div>
            </div>
          </div>

          {/* --- NEW DEVELOPER OPTIONS SECTION --- */}
          <div className="settings-section">
            <div className="section-header"><Code className="section-icon" /><h2 className="section-title">Developer Options</h2></div>
            <div className="setting-item">
              <div className="setting-info"><div className="setting-label">Minimum IMDb Rating</div><div className="setting-description">Set the minimum rating for recommendations</div></div>
              <div className="setting-control slider-container">
                <input type="range" min="1" max="10" step="0.1" value={devSettings.minImdbRating} onChange={(e) => handleDevSettingChange('minImdbRating', parseFloat(e.target.value))} className="slider" />
                <span className="slider-value">{devSettings.minImdbRating.toFixed(1)}</span>
              </div>
            </div>
            <div className="genre-override-container">
              {Object.keys(devSettings.genreOverrides).map((emotion) => (
                <div className="genre-item" key={emotion}>
                  <div className="genre-header">
                    <span className="emotion-label">{emotion}</span>
                    <select className="setting-select" onChange={(e) => handleAddGenre(emotion, e.target.value)} value="default">
                      <option value="default">Add Genre...</option>
                      {/* MODIFIED: Use the new unified ALL_GENRES_MAP */}
                      {Object.entries(ALL_GENRES_MAP).map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="genre-tags">
                    {devSettings.genreOverrides[emotion].length === 0 ? (
                      <span className="setting-description">Using default dynamic genres</span>
                    ) : (
                      devSettings.genreOverrides[emotion].map(genreId => (
                        <div key={genreId} className="genre-tag">
                          {/* MODIFIED: Use the new unified ALL_GENRES_MAP for lookup */}
                          {ALL_GENRES_MAP[genreId]}
                          <span className="remove-genre-btn" onClick={() => handleRemoveGenre(emotion, genreId)}><X size={14} style={{ marginLeft: '4px' }}/></span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="action-button reset-button" onClick={handleResetDevSettings}><RotateCcw size={20} /> Reset to Default</button>
          </div>

          {/* --- ORIGINAL ACCOUNT SECTION - UNCHANGED --- */}
          <div className="settings-section">
            <div className="section-header"><SettingsIcon className="section-icon" /><h2 className="section-title">Account</h2></div>
            <button className="action-button save-button" onClick={saveSettings}><Save size={20} /> Save All Settings</button>
            <button className="action-button logout-button" onClick={handleLogout}><LogOut size={20} /> Sign Out</button>
          </div>
        </div>
      </div>
    </>
  );
}
