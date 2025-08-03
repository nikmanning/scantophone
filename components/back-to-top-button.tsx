"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAwareElement } from "@/components/scroll-aware-element"

interface BackToTopButtonProps {
  threshold?: number
  position?: "bottom-right" | "bottom-left"
}

export function BackToTopButton({ threshold = 300, position = "bottom-right" }: BackToTopButtonProps) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  }

  return (
    <ScrollAwareElement showOnScroll threshold={threshold} className={positionClasses[position]}>
      <Button
        onClick={handleClick}
        size="icon"
        className="h-12 w-12 rounded-full bg-[#e4ff54] hover:bg-[#d9f542] text-black shadow-lg"
      >
        <ArrowUp className="h-5 w-5" />
        <span className="sr-only">Back to top</span>
      </Button>
    </ScrollAwareElement>
  )
}
