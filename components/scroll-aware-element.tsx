"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { cn } from "@/lib/utils"

interface ScrollAwareElementProps {
  children: ReactNode
  showOnScroll?: boolean
  hideOnScroll?: boolean
  threshold?: number
  className?: string
  animationDuration?: number
}

export function ScrollAwareElement({
  children,
  showOnScroll = false,
  hideOnScroll = false,
  threshold = 100,
  className,
  animationDuration = 300,
}: ScrollAwareElementProps) {
  const { scrollY, direction, isAtTop } = useScrollPosition(threshold)
  const [isVisible, setIsVisible] = useState(!showOnScroll)

  useEffect(() => {
    if (showOnScroll && direction === "down" && !isAtTop && !isVisible) {
      setIsVisible(true)
    } else if (showOnScroll && direction === "up" && isAtTop && isVisible) {
      setIsVisible(false)
    } else if (hideOnScroll && direction === "down" && !isAtTop && isVisible) {
      setIsVisible(false)
    } else if (hideOnScroll && direction === "up" && !isAtTop && !isVisible) {
      setIsVisible(true)
    }
  }, [scrollY, direction, isAtTop, showOnScroll, hideOnScroll, threshold, isVisible])

  return (
    <div
      className={cn(
        "fixed transition-all",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none",
        className,
      )}
      style={{ transitionDuration: `${animationDuration}ms` }}
    >
      {children}
    </div>
  )
}
