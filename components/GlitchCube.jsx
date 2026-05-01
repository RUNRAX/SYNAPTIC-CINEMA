'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlitchCube() {
  const cubeRef = useRef(null)

  useEffect(() => {
    if (!cubeRef.current) return

    const cube = cubeRef.current

    // Base continuous rotation
    const rotateAnim = gsap.to(cube, {
      rotateX: "+=360",
      rotateY: "+=360",
      duration: 20,
      repeat: -1,
      ease: "none"
    })

    // Occasional glitch interruptions
    const glitchAnim = gsap.delayedCall(gsap.utils.random(4, 8), function triggerCubeGlitch() {
      // Pause normal rotation
      rotateAnim.pause()

      // Perform a rapid jitter sequence
      const tl = gsap.timeline({
        onComplete: () => {
          // Resume normal rotation
          rotateAnim.play()
          glitchAnim.restart(true, gsap.utils.random(4, 8))
        }
      })

      // 4-5 rapid chaotic movements
      for (let i = 0; i < 5; i++) {
        tl.to(cube, {
          rotateX: `+=${gsap.utils.random(-15, 15)}`,
          rotateY: `+=${gsap.utils.random(-15, 15)}`,
          rotateZ: `+=${gsap.utils.random(-10, 10)}`,
          duration: 0.05,
          ease: "steps(1)"
        })
      }
    })

    return () => {
      rotateAnim.kill()
      glitchAnim.kill()
    }
  }, [])

  return (
    <div className="glitch-cube-scene absolute right-20 top-20 pointer-events-none opacity-[0.08] z-[1]">
      <div ref={cubeRef} className="glitch-cube">
        <div className="glitch-cube-face" style={{ transform: 'translateZ(100px)' }}><span>SECTOR 01</span></div>
        <div className="glitch-cube-face" style={{ transform: 'rotateY(180deg) translateZ(100px)' }}><span>NODE 02</span></div>
        <div className="glitch-cube-face" style={{ transform: 'rotateY(90deg) translateZ(100px)' }}><span>CORE 03</span></div>
        <div className="glitch-cube-face" style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}><span>LINK 04</span></div>
        <div className="glitch-cube-face" style={{ transform: 'rotateX(90deg) translateZ(100px)' }}><span>SYS 05</span></div>
        <div className="glitch-cube-face" style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}><span>DATA 06</span></div>
      </div>
    </div>
  )
}
