"use client"

import { useState, useEffect } from "react"
import { ensureUrlProtocol } from "@/lib/qr-code-generator"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import the RoundedQRCode component to avoid SSR issues
const RoundedQRCode = dynamic(() => import("../rounded-qr-code"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full aspect-square" />,
})

interface QRCodeDisplayProps {
  url: string
  size?: number
  color?: string
  backgroundColor?: string
  className?: string
  showBorder?: boolean
  displayText?: string
  showLogo?: boolean
  logoSize?: number
  cornerRadius?: number
}

export default function QRCodeDisplay({
  url,
  size = 200,
  color = "#000000",
  backgroundColor = "#ffffff",
  className,
  showBorder = true,
  displayText,
  showLogo = true,
  logoSize = 25,
  cornerRadius = 15,
}: QRCodeDisplayProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn("relative flex items-center justify-center p-1 bg-white", showBorder && "rounded-xl shadow-sm")}
      >
        {isLoading ? (
          <Skeleton className="w-full h-full aspect-square" />
        ) : (
          <RoundedQRCode
            value={url ? ensureUrlProtocol(url) : "https://example.com"}
            size={size}
            color={color}
            backgroundColor={backgroundColor}
            cornerRadius={cornerRadius}
            showLogo={showLogo}
            logoSize={logoSize}
            className="w-full h-full"
          />
        )}
      </div>
      {displayText && <p className="text-center mt-3 text-base">{displayText}</p>}
    </div>
  )
}
