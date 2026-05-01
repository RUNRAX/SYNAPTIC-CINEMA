'use client'
import { useEffect } from 'react'

export function useFlickerIn(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-enter')
    elements.forEach((el, i) => {
      el.style.opacity = '0'
      setTimeout(() => {
        const flicker = [0, 1, 0, 1, 0.5, 1, 0, 1]
        flicker.forEach((val, fi) => {
          setTimeout(() => { el.style.opacity = String(val) }, fi * 40)
        })
      }, i * 100 + 200)
    })
  }, deps)
}
