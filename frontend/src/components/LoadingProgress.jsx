import React, { useEffect, useState } from 'react'
import useAppStore from '../store/useAppStore'

export default function LoadingProgress() {
  const loading = useAppStore((state) => state.loading)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let interval
    if (loading) {
      setVisible(true)
      setProgress(10)
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 96
          return prev + Math.random() * 10
        })
      }, 400)
    } else {
      setProgress(100)
      const timeout = setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 500)
      return () => clearTimeout(timeout)
    }
    return () => clearInterval(interval)
  }, [loading])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
