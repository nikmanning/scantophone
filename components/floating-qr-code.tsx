"use client"

import { useState, useEffect, useRef } from "react"
import QRCode from "qrcode"
import { cn } from "@/lib/utils"

interface FloatingQRCodeProps {
  url: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right"
  buttonColor?: string
  buttonShape?: "rounded" | "square" | "circle"
  animation?: "fade" | "slide" | "bounce"
  displayText?: string
  qrCodeColor?: string
  backgroundColor?: string
  marginX?: number
  marginY?: number
  size?: number
  startCollapsed?: boolean
}

export function FloatingQRCode({
  url,
  position = "bottom-right",
  buttonColor = "#000000",
  buttonShape = "rounded",
  animation = "fade",
  displayText = "Scan QR Code",
  qrCodeColor = "#000000",
  backgroundColor = "#ffffff",
  marginX = 20,
  marginY = 20,
  size = 150,
  startCollapsed = true,
}: FloatingQRCodeProps) {
  const [isOpen, setIsOpen] = useState(!startCollapsed)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: size,
          margin: 1,
          color: {
            dark: qrCodeColor,
            light: backgroundColor,
          },
        },
        (error) => {
          if (error) console.error(error)
        },
      )
    }
  }, [url, size, qrCodeColor, backgroundColor])

  // Determine position classes
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    left: "left-0 top-1/2 -translate-y-1/2",
    right: "right-0 top-1/2 -translate-y-1/2",
  }

  // Determine button shape classes
  const buttonShapeClasses = {
    rounded: "rounded-md",
    square: "rounded-none",
    circle: "rounded-full",
  }

  // Determine animation classes
  const animationClasses = {
    fade: "transition-opacity duration-300",
    slide: "transition-transform duration-300",
    bounce: "transition-transform duration-300",
  }

  const animationStyles = {
    fade: isOpen ? "opacity-100" : "opacity-0",
    slide:
      position === "left"
        ? isOpen
          ? "translate-x-0"
          : "-translate-x-full"
        : position === "right"
          ? isOpen
            ? "translate-x-0"
            : "translate-x-full"
          : position.startsWith("top")
            ? isOpen
              ? "translate-y-0"
              : "-translate-y-full"
            : isOpen
              ? "translate-y-0"
              : "translate-y-full",
    bounce: isOpen
      ? "translate-y-0"
      : position.includes("top")
        ? "-translate-y-4"
        : position.includes("bottom")
          ? "translate-y-4"
          : position === "left"
            ? "-translate-x-4"
            : "translate-x-4",
  }

  // Track QR code scan
  const trackScan = async () => {
    try {
      // This would typically make an API call to record the scan
      console.log("QR code scanned")
    } catch (error) {
      console.error("Error tracking scan:", error)
    }
  }

  return (
    <div
      className={cn("fixed z-50 flex flex-col items-end", positionClasses[position as keyof typeof positionClasses])}
      style={{
        margin: `${marginY}px ${marginX}px`,
      }}
    >
      {/* QR Code Panel */}
      <div
        className={cn(
          "bg-white p-4 shadow-lg mb-2",
          buttonShapeClasses[buttonShape as keyof typeof buttonShapeClasses],
          animationClasses[animation as keyof typeof animationClasses],
          animationStyles[animation as keyof typeof animationStyles],
          position === "left" || position === "right" ? "mb-0 mr-2" : "mb-2",
        )}
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <div className="flex flex-col items-center">
          <canvas ref={canvasRef} onClick={trackScan} className="cursor-pointer" />
          {displayText && <p className="mt-2 text-sm text-center">{displayText}</p>}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-12 h-12 shadow-lg",
          buttonShapeClasses[buttonShape as keyof typeof buttonShapeClasses],
        )}
        style={{ backgroundColor: buttonColor }}
        aria-label={isOpen ? "Close QR Code" : "Open QR Code"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="5" height="5" x="3" y="3" rx="1" />
          <rect width="5" height="5" x="16" y="3" rx="1" />
          <rect width="5" height="5" x="3" y="16" rx="1" />
          <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
          <path d="M21 21v.01" />
          <path d="M12 7v3a2 2 0 0 1-2 2H7" />
          <path d="M3 12h.01" />
          <path d="M12 3h.01" />
          <path d="M12 16v.01" />
          <path d="M16 12h1" />
          <path d="M21 12v.01" />
          <path d="M12 21v-1" />
        </svg>
      </button>
    </div>
  )
}
