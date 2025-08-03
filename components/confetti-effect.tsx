"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ConfettiEffectProps {
  active: boolean
  onComplete: () => void
}

export function ConfettiEffect({ active, onComplete }: ConfettiEffectProps) {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; color: string; size: number; speed: number; angle: number }>
  >([])
  const router = useRouter()

  useEffect(() => {
    if (!active) return

    // Create confetti particles
    const colors = ["#e4ff54", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"]
    const newParticles = []

    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        speed: Math.random() * 6 + 2,
        angle: Math.random() * Math.PI * 2,
      })
    }

    setParticles(newParticles)

    // Animate particles
    let animationFrame: number
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime

      if (elapsed > 2000) {
        cancelAnimationFrame(animationFrame)
        onComplete()
        return
      }

      setParticles((prevParticles) =>
        prevParticles.map((p) => ({
          ...p,
          x: p.x + Math.cos(p.angle) * p.speed,
          y: p.y + Math.sin(p.angle) * p.speed + 0.5, // Add gravity
        })),
      )

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [active, onComplete])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  )
}
