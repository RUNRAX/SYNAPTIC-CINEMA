'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GalaxySystem from '@/components/GalaxySystem'
import FloatingAstronaut from '@/components/FloatingAstronaut'
import { Camera, AlertTriangle } from 'lucide-react'

const API_URL = 'http://127.0.0.1:5000'

export default function Synaptic() {
  const router = useRouter()
  const videoRef = useRef(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [detectedEmotion, setDetectedEmotion] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cameraError, setCameraError] = useState(null)

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject
        const tracks = stream.getTracks()
        tracks.forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
    }
  }, [])

  const startCamera = async () => {
    setCameraError(null)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
        console.error("Error accessing camera:", error)
        if (error.name === "NotAllowedError") {
          setCameraError("Camera access denied. Please enable it in your browser settings.")
        } else {
          setCameraError("Could not access the camera. It may be in use by another app.")
        }
      }
    } else {
      setCameraError("Your browser does not support camera access.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
      setDetectedEmotion(null)
      setCameraError(null)
    }
  }

  const analyzeEmotion = async () => {
    if (!videoRef.current || !isStreaming) return

    setIsAnalyzing(true)
    setDetectedEmotion(null)

    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    const imageData = canvas.toDataURL('image/jpeg', 0.8)

    try {
      const response = await fetch(`${API_URL}/detect_emotion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`)
      }

      const data = await response.json()
      const emotion = data.emotion
      setDetectedEmotion(emotion)

      setTimeout(() => {
        router.push(`/EmotionResults?emotion=${emotion}`)
      }, 1500)

    } catch (error) {
      console.error("Emotion detection failed:", error)
      setCameraError("Could not analyze emotion. Please try again.")
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

          <div className="camera-section">
            <div className="camera-container">
              <video
                ref={videoRef}
                className="camera-video"
                playsInline
                muted
              />
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
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Emotion'}
                  </button>
                </>
              )}
            </div>

            {detectedEmotion && (
              <div className="emotion-result">
                <p>Detected emotion: <strong>{detectedEmotion}</strong></p>
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
          margin-bottom: 3rem;
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
        }
        .emotion-result strong {
          color: var(--silver);
        }
      `}</style>
    </>
  )
}
