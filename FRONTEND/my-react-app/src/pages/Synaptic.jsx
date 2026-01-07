import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/index.js';
import GalaxySystem from '../components/GalaxySystem.jsx';
import FloatingAstronaut from '../components/FloatingAstronaut.jsx';
import { Eye, Camera, Activity, Zap, AlertTriangle } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000';

export default function Synaptic() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  

  // This effect is now only for cleaning up the camera stream on unmount.
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Use an event listener to wait for the video to be ready to play
          videoRef.current.oncanplay = () => {
            videoRef.current.play();
            setIsStreaming(true);
          };
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        if (error.name === "NotAllowedError") {
          setCameraError("Camera access denied. Please enable it in your browser settings.");
        } else {
          setCameraError("Could not access the camera. It may be in use by another app.");
        }
      }
    } else {
      setCameraError("Your browser does not support camera access.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setDetectedEmotion(null);
      setCameraError(null);
    }
  };

  // This function now captures a frame and sends it to the backend.
  const analyzeEmotion = async () => {
    if (!videoRef.current || !isStreaming) return;

    setIsAnalyzing(true);
    setDetectedEmotion(null);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);

    try {
      const response = await fetch(`${API_URL}/detect_emotion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      const emotion = data.emotion;
      setDetectedEmotion(emotion);

      setTimeout(() => {
        navigate(createPageUrl(`EmotionResults?emotion=${emotion}`));
      }, 1500);

    } catch (error) {
      console.error("Emotion detection failed:", error);
      setCameraError("Could not analyze emotion. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <style>{`
        /* Styles remain unchanged */
        .synaptic-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }
        .synaptic-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
          animation: header-appear 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes header-appear {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSmooth {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .synaptic-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--grey-800) 0%, var(--silver) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .synaptic-subtitle {
          font-size: 1.25rem;
          color: var(--grey-600);
          line-height: 1.6;
        }
        .video-container {
          position: relative;
          width: 600px;
          max-width: 100%;
          height: 450px;
          border-radius: 24px;
          overflow: hidden;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          margin-bottom: 3rem;
          box-shadow: 0 25px 50px var(--shadow-medium);
          z-index: 1;
          animation: video-appear 2.5s ease-in-out 0.3s both;
        }
        @keyframes video-appear {
          from { opacity: 0; transform: scale(0.9) rotateY(-15deg); }
          to { opacity: 1; transform: scale(1) rotateY(0deg); }
        }
        .video-feed {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scaleX(-1); /* Mirror the camera feed */
        }
        .video-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--silver-light), var(--silver));
          color: var(--grey-500);
          padding: 2rem;
          text-align: center;
        }
        .emotion-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.75rem 1.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          color: var(--grey-800);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 5;
          text-transform: capitalize;
        }
        .analyzing-indicator {
          background: var(--silver-light);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .control-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
          animation: buttons-appear 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
        }
        @keyframes buttons-appear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .synaptic-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          color: var(--grey-800);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .synaptic-button:hover:not(:disabled) {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 20px 40px var(--shadow-medium);
          background: var(--silver-light);
        }
        .synaptic-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          max-width: 800px;
          width: 100%;
          position: relative;
          z-index: 1;
          animation: stats-appear 1s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
        }
        @keyframes stats-appear {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stat-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px var(--shadow-light);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          color: var(--silver);
        }
        .stat-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--grey-800);
          margin-bottom: 0.5rem;
        }
        .stat-description {
          color: var(--grey-600);
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .error-message-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 600px;
            width: 100%;
            padding: 0 1rem; /* Padding horizontal only */
            border-radius: 12px;
            color: #d9534f;
            background: rgba(217, 83, 79, 0.1);
            border: 1px solid rgba(217, 83, 79, 0.3);
            
            /* --- Styles for the hidden state --- */
            overflow: hidden;
            height: 0;
            opacity: 0;
            margin: 0;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .error-message-container.visible {
            /* --- Styles for the visible state --- */
            height: auto; /* Or a fixed height like 60px */
            opacity: 1;
            padding: 1rem; /* Restore vertical padding */
            margin-top: -1.5rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .video-container { height: 300px; }
          .synaptic-title { font-size: 2rem; }
          .control-buttons { flex-direction: column; width: 100%; }
        }
      `}</style>

      <div className="synaptic-container">
        {/* The dedicated background layer */}
        <div className="synaptic-background">
          <GalaxySystem />
          <FloatingAstronaut />
        </div>

        <div className="synaptic-foreground">
        <div className="synaptic-header">
          <h1 className="synaptic-title">Synaptic Detection</h1>
          <p className="synaptic-subtitle">Let AI analyze your emotions and discover content that matches your mood</p>
        </div>
        <div className="video-container">
          <video ref={videoRef} playsInline muted className="video-feed" style={{ display: isStreaming ? 'block' : 'none' }} />
          {!isStreaming && (
            <div className="video-placeholder">
              <Camera size={64} color="var(--grey-400)" />
              <p style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: '500' }}>Camera Feed</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Click start to begin emotion detection</p>
            </div>
          )}
          {(isAnalyzing || detectedEmotion) && (
            <div className={`emotion-indicator ${isAnalyzing ? 'analyzing-indicator' : ''}`}>
              <Activity size={16} /> {isAnalyzing ? 'Analyzing...' : `Detected: ${detectedEmotion}`}
            </div>
          )}
        </div>
        
       <div className={`error-message-container ${cameraError ? 'visible' : ''}`}>
            <AlertTriangle size={24} />
            {/* Using a non-breaking space ensures the div doesn't collapse when empty */}
            <span>{cameraError || '&nbsp;'}</span>
        </div>

        <div className="control-buttons">
          {!isStreaming ? (
            <button className="synaptic-button" onClick={startCamera} disabled={!!cameraError}>
                <Eye size={24} /> Start Detection
            </button>
          ) : (
            <>
              <button className="synaptic-button" onClick={analyzeEmotion} disabled={isAnalyzing}>
                <Zap size={24} /> {isAnalyzing ? 'Analyzing...' : 'Analyze Emotion'}
              </button>
              <button className="synaptic-button" onClick={stopCamera}><Camera size={24} /> Stop Camera</button>
            </>
          )}
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <Eye className="stat-icon" />
            <h3 className="stat-title">Real-time Analysis</h3>
            <p className="stat-description">Advanced AI algorithms analyze facial expressions in real-time. (Currently simulated)</p>
          </div>
          <div className="stat-card">
            <Activity className="stat-icon" />
            <h3 className="stat-title">Emotion Mapping</h3>
            <p className="stat-description">Precise emotion detection with 95% accuracy rate</p>
          </div>
          <div className="stat-card">
            <Zap className="stat-icon" />
            <h3 className="stat-title">Smart Recommendations</h3>
            <p className="stat-description">Personalized content suggestions based on your mood</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
