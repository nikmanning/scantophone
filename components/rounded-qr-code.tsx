"use client"

import { useEffect, useState } from "react"
import { ensureUrlProtocol } from "@/lib/qr-code-generator"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface RoundedQRCodeProps {
  value: string
  size?: number
  color?: string
  backgroundColor?: string
  cornerRadius?: number
  className?: string
  showLogo?: boolean
  logoSize?: number
}

export default function RoundedQRCode({
  value,
  size = 200,
  color = "#000000",
  backgroundColor = "#ffffff",
  cornerRadius = 15,
  className,
  showLogo = true,
  logoSize = 25,
}: RoundedQRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const formattedValue = value ? ensureUrlProtocol(value) : "https://example.com"

    // Remove # from color codes if present
    const cleanColor = color.startsWith("#") ? color.substring(1) : color
    const cleanBgColor = backgroundColor.startsWith("#") ? backgroundColor.substring(1) : backgroundColor

    // Calculate corner radius percentage (QR Code Monkey uses 0-50 range)
    // Convert our pixel-based radius to a percentage-based value (0-50)
    const cornerRadiusPercent = Math.min(Math.max(Math.round((cornerRadius / size) * 300), 0), 50)

    // Build QR Code Monkey API URL
    const config = {
      body: "square",
      eye: "frame2", // Using frame2 for rounded outer corners on position markers
      eyeBall: "ball0",
      erf1: ["fh"], // Rounded corners on position markers
      erf2: ["fh"],
      erf3: ["fh"],
      brf1: ["fh"],
      brf2: ["fh"],
      brf3: ["fh"],
      bodyColor: `#${cleanColor}`,
      bgColor: `#${cleanBgColor}`,
      eye1Color: `#${cleanColor}`,
      eye2Color: `#${cleanColor}`,
      eye3Color: `#${cleanColor}`,
      eyeBall1Color: `#${cleanColor}`,
      eyeBall2Color: `#${cleanColor}`,
      eyeBall3Color: `#${cleanColor}`,
      gradientColor1: "",
      gradientColor2: "",
      gradientType: "linear",
      gradientOnEyes: "true",
      logoMode: "clean", // This creates a clear background around the logo
      logoSize: logoSize, // Size of the logo (0-30)
      cornerRadius: cornerRadiusPercent,
    }

    // For development/testing, we can use a direct URL to the logo
    // In production, we should use a relative URL or a full URL to our hosted logo
    const logoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g4-s0dhAcVHxC8N72zTDF3QlxoSb7jJVj.png"

    // Use the direct logo URL for the API call
    const apiConfig = {
      ...config,
      logo: showLogo ? logoUrl : "",
    }

    const apiUrl = `https://api.qrcode-monkey.com/qr/custom?data=${encodeURIComponent(formattedValue)}&size=${size}&config=${encodeURIComponent(JSON.stringify(apiConfig))}`

    setQrCodeUrl(apiUrl)
    setIsLoading(false)
  }, [value, size, color, backgroundColor, cornerRadius, showLogo, logoSize])

  if (isLoading) {
    return <Skeleton style={{ width: size, height: size }} className={className} />
  }

  return (
    <div className={className}>
      {qrCodeUrl && (
        <Image
          src={qrCodeUrl || "/placeholder.svg"}
          alt="QR Code"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      )}
    </div>
  )
}
