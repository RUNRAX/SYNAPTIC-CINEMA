'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GalaxySystem from '@/components/GalaxySystem'
import FloatingAstronaut from '@/components/FloatingAstronaut'
import { Camera, AlertTriangle } from 'lucide-react'
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
        <div className="synaptic-background">
          <GalaxySystem />
          <FloatingAstronaut />
        </div>

        <div className="synaptic-foreground">
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
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }
        .synaptic-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .synaptic-foreground {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          z-index: 1;
          background: transparent;
          backdrop-filter: blur(0px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 3rem;
          max-width: 1200px;
          box-shadow: 0 25px 50px var(--shadow-medium);
        }
        .synaptic-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--grey-800) 0%, var(--silver) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }
        .synaptic-subtitle {
          font-size: 1.2rem;
          color: var(--grey-600);
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
          background: var(--glass-bg);
          border: 2px solid var(--glass-border);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
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
          color: var(--grey-500);
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
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .camera-button.start {
          background: var(--silver);
          border: none;
          color: var(--grey-800);
        }
        .camera-button.start:hover {
          background: var(--silver-dark);
        }
        .camera-button.stop {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--grey-700);
        }
        .camera-button.analyze {
          background: var(--grey-800);
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
          background: var(--glass-bg);
          border-radius: 16px;
          text-align: center;
          display: grid;
          gap: 0.5rem;
        }
        .emotion-result strong {
          color: var(--silver);
        }
      `}</style>
    </>
  )
}
