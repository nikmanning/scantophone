"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

interface QRCodeDisplayProps {
  url: string
  color: string
  backgroundColor: string
  size: number
  showBorder: boolean
  logoUrl: string
}

function QRCodeDisplay({ url, color, backgroundColor, size, showBorder, logoUrl }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCodeDataURL = await QRCode.toDataURL(url, {
          width: size,
          color: {
            dark: color,
            light: backgroundColor,
          },
        })

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const img = new Image()
        img.onload = () => {
          // Calculate the position to center the logo
          const logoSize = size * 0.2 // Adjust the logo size as needed
          const x = (size - logoSize) / 2
          const y = (size - logoSize) / 2

          // Draw the QR code
          ctx.clearRect(0, 0, size, size) // Clear the canvas
          ctx.drawImage(img, 0, 0, size, size)

          // Load and draw the logo
          const logo = new Image()
          logo.onload = () => {
            ctx.drawImage(logo, x, y, logoSize, logoSize)
          }
          logo.src = logoUrl
        }
        img.src = qrCodeDataURL
      } catch (error) {
        console.error("Error generating QR code:", error)
      }
    }

    generateQRCode()
  }, [url, color, backgroundColor, size, logoUrl])

  return <canvas ref={canvasRef} width={size} height={size} />
}

interface QRCodePreviewProps {
  qrCode: any
  size?: number
  logoUrl?: string
}

export function QRCodePreview({ qrCode, size = 200, logoUrl = "/images/g4.png" }: QRCodePreviewProps) {
  return (
    <QRCodeDisplay
      url={qrCode.url === "Current Page" ? "https://example.com" : qrCode.url}
      color={qrCode.qr_code_color || "#000000"}
      backgroundColor={qrCode.background_color || "#ffffff"}
      size={size}
      showBorder={false}
      logoUrl={qrCode.logo_url || logoUrl}
    />
  )
}
