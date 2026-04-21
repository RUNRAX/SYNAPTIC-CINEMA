'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, AlertTriangle, Sparkles } from 'lucide-react'
import { detectDominantEmotion, loadFaceApiModels } from '@/lib/faceApi'

export default function Synaptic() {
  const router = useRouter()
  const videoRef = useRef(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [detectedEmotion, setDetectedEmotion] = useState(null)
  const [analysisConfidence, setAnalysisConfidence] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [modelStatus, setModelStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    loadFaceApiModels()
      .then(() => {
        if (!cancelled) {
          setModelStatus('ready')
        }
      })
      .catch((error) => {
        console.error('Failed to load face-api models:', error)
        if (!cancelled) {
          setModelStatus('error')
          setCameraError('Emotion models could not be loaded. Please refresh and try again.')
        }
      })

    return () => {
      cancelled = true

      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
    }
  }, [])

  const startCamera = async () => {
    setCameraError(null)
    setDetectedEmotion(null)
    setAnalysisConfidence(0)

    if (modelStatus === 'error') {
      setCameraError('Emotion models are unavailable. Refresh the page to retry loading them.')
      return
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Your browser does not support camera access.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.oncanplay = () => {
          videoRef.current.play()
          setIsStreaming(true)
        }
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      if (error.name === 'NotAllowedError') {
        setCameraError('Camera access denied. Please enable it in your browser settings.')
      } else {
        setCameraError('Could not access the camera. It may be in use by another app.')
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
      setDetectedEmotion(null)
      setAnalysisConfidence(0)
      setCameraError(null)
    }
  }

  const analyzeEmotion = async () => {
    if (!videoRef.current || !isStreaming || modelStatus !== 'ready') {
      return
    }

    setIsAnalyzing(true)
    setDetectedEmotion(null)
    setAnalysisConfidence(0)
    setCameraError(null)

    try {
      const result = await detectDominantEmotion(videoRef.current)

      if (!result.hasFace) {
        setCameraError('No face detected. Center your face in the frame and try again.')
        return
      }

      const emotion = result.emotion
      setDetectedEmotion(emotion)
      setAnalysisConfidence(result.confidence)

      setTimeout(() => {
        router.push(`/EmotionResults?emotion=${emotion}`)
      }, 1500)
    } catch (error) {
      console.error('Emotion detection failed:', error)
      setCameraError('Could not analyze emotion in the browser. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <>
      <div className="synaptic-container">
        <div className="synaptic-background" aria-hidden="true">
          <div className="synaptic-orb orb-one" />
          <div className="synaptic-orb orb-two" />
          <div className="synaptic-orb orb-three" />
        </div>

        <div className="synaptic-foreground">
          <div className="synaptic-badge">
            <Sparkles size={16} />
            Camera analysis
          </div>
          <h1 className="synaptic-title">Synaptic Analysis</h1>
          <p className="synaptic-subtitle">Detect your emotional state through facial recognition</p>
          <div className={`model-status ${modelStatus}`}>
            {modelStatus === 'loading' && 'Loading face-api.js models...'}
            {modelStatus === 'ready' && 'Face detection is running locally in your browser'}
            {modelStatus === 'error' && 'Model loading failed'}
          </div>

          <div className="camera-section">
            <div className="camera-container">
              <video ref={videoRef} className="camera-video" playsInline muted />
              {!isStreaming && (
                <div className="camera-placeholder">
                  <Camera size={64} />
                  <p>Camera is off</p>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="camera-error">
                <AlertTriangle size={20} />
                {cameraError}
              </div>
            )}

            <div className="camera-controls">
              {!isStreaming ? (
                <button className="camera-button start" onClick={startCamera}>
                  <Camera size={24} />
                  Start Camera
                </button>
              ) : (
                <>
                  <button className="camera-button stop" onClick={stopCamera}>
                    Stop Camera
                  </button>
                  <button
                    className="camera-button analyze"
                    onClick={analyzeEmotion}
                    disabled={isAnalyzing || modelStatus !== 'ready'}
                  >
                    {isAnalyzing ? 'Analyzing...' : modelStatus === 'ready' ? 'Analyze Emotion' : 'Preparing AI...'}
                  </button>
                </>
              )}
            </div>

            {detectedEmotion && (
              <div className="emotion-result">
                <p>
                  Detected emotion: <strong>{detectedEmotion}</strong>
                </p>
                <p>
                  Confidence: <strong>{Math.round(analysisConfidence * 100)}%</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .synaptic-container {
          min-height: calc(100vh - 4rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }
        .synaptic-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .synaptic-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          opacity: 0.68;
          animation: drift 18s ease-in-out infinite;
        }
        .synaptic-orb.orb-one {
          width: 22rem;
          height: 22rem;
          top: 10%;
          left: 8%;
          background: rgba(120, 183, 255, 0.32);
        }
        .synaptic-orb.orb-two {
          width: 18rem;
          height: 18rem;
          right: 14%;
          top: 16%;
          background: rgba(255, 151, 206, 0.28);
          animation-delay: -6s;
        }
        .synaptic-orb.orb-three {
          width: 20rem;
          height: 20rem;
          right: 18%;
          bottom: 10%;
          background: rgba(255, 200, 112, 0.24);
          animation-delay: -11s;
        }
        @keyframes drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(1.4rem, -1rem, 0) scale(1.06); }
        }
        .synaptic-foreground {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          z-index: 2;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0.32));
          backdrop-filter: blur(28px) saturate(170%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 38px;
          padding: 3rem;
          max-width: 1200px;
          box-shadow: var(--panel-shadow);
        }
        .synaptic-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.58);
          border: 1px solid rgba(255, 255, 255, 0.62);
          color: var(--text-soft);
          font-size: 0.88rem;
          font-weight: 700;
        }
        .synaptic-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--text-strong) 0%, #5f6de3 46%, var(--text-strong) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }
        .synaptic-subtitle {
          font-size: 1.2rem;
          color: var(--text-soft);
          margin-bottom: 1rem;
        }
        .model-status {
          margin-bottom: 2rem;
          padding: 0.75rem 1rem;
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 600;
        }
        .model-status.loading {
          background: rgba(59, 130, 246, 0.12);
          color: #1d4ed8;
        }
        .model-status.ready {
          background: rgba(34, 197, 94, 0.12);
          color: #15803d;
        }
        .model-status.error {
          background: rgba(220, 38, 38, 0.12);
          color: #b91c1c;
        }
        .camera-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .camera-container {
          width: 100%;
          max-width: 640px;
          aspect-ratio: 4/3;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.62);
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 44px rgba(86, 100, 151, 0.12);
        }
        .camera-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .camera-placeholder {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: var(--text-muted);
        }
        .camera-placeholder p {
          margin-top: 1rem;
        }
        .camera-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #dc2626;
          background: rgba(220, 38, 38, 0.1);
          padding: 1rem 1.5rem;
          border-radius: 12px;
        }
        .camera-controls {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .camera-button {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .camera-button.start {
          background: linear-gradient(135deg, #7f8cff, #5f6de3);
          border: none;
          color: white;
          box-shadow: 0 14px 28px rgba(95, 109, 227, 0.22);
        }
        .camera-button.start:hover {
          transform: translateY(-2px);
        }
        .camera-button.stop {
          background: rgba(255, 255, 255, 0.54);
          border: 1px solid rgba(255, 255, 255, 0.64);
          color: var(--text-strong);
        }
        .camera-button.analyze {
          background: var(--text-strong);
          border: none;
          color: white;
        }
        .camera-button.analyze:hover:not(:disabled) {
          background: var(--grey-700);
        }
        .camera-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .emotion-result {
          margin-top: 2rem;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.48);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          text-align: center;
          display: grid;
          gap: 0.5rem;
        }
        .emotion-result strong {
          color: var(--silver-dark);
        }
        @media (max-width: 768px) {
          .synaptic-container {
            min-height: auto;
            padding: 0.25rem 0 2rem;
          }
          .synaptic-foreground {
            padding: 1.5rem;
            border-radius: 28px;
          }
          .synaptic-title {
            font-size: 2.35rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}
