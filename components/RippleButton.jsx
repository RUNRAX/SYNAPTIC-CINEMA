'use client'

import { useRef } from 'react'
import { ripple } from '@/lib/utils'

export default function RippleButton({ children, className = '', onClick, ...props }) {
  const btnRef = useRef(null)

  const handleClick = (e) => {
    if (btnRef.current) {
      ripple(btnRef.current, e)
    }
    if (onClick) onClick(e)
  }

  return (
    <button
      ref={btnRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
