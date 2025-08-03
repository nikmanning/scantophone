"use client"

import { useState, useEffect } from "react"

interface ScrollPosition {
  scrollY: number
  direction: "up" | "down" | null
  isAtTop: boolean
  isScrolling: boolean
}

export function useScrollPosition(threshold = 100): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    direction: null,
    isAtTop: true,
    isScrolling: false,
  })

  useEffect(() => {
    let lastScrollY = 0
    let scrollTimeout: NodeJS.Timeout | null = null

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? "down" : "up"
      const isAtTop = currentScrollY < threshold

      setScrollPosition({
        scrollY: currentScrollY,
        direction,
        isAtTop,
        isScrolling: true,
      })

      lastScrollY = currentScrollY

      // Reset isScrolling after scrolling stops
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      scrollTimeout = setTimeout(() => {
        setScrollPosition((prev) => ({
          ...prev,
          isScrolling: false,
        }))
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [threshold])

  return scrollPosition
}
