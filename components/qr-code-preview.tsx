"use client"

import { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"

interface QRCodeDisplayProps {
  url: string
  color: string
  backgroundColor: string
  size: number
  showBorder: boolean
  logoUrl: string
}

function QRCodeDisplay({ url, color, backgroundColor, size, showBorder, logoUrl }: QRCodeDisplayProps) {
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    if (!qrCodeRef.current) return;
    
    // Clear previous QR code if it exists
    if (qrCodeInstance.current) {
      qrCodeRef.current.innerHTML = "";
    }

    console.log('[QRCodePreview] Creating QR code with settings:', {
      url: url === "https://example.com" ? 'Example Placeholder' : url,
      color,
      backgroundColor,
      size,
      hasLogo: !!logoUrl,
      eyeStyle: 'extra-rounded',
      imageSize: 0.2,
      isExamplePlaceholder: url === "https://example.com"
    });

    // Create new QR code with the same styling as the widget
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data: url,
      image: logoUrl,
      dotsOptions: { 
        color: color,
        type: "dots" // Match the widget implementation exactly
      },
      backgroundOptions: { 
        color: backgroundColor 
      },
      imageOptions: { 
        crossOrigin: "anonymous",
        margin: 4,
        imageSize: 0.2,
        hideBackgroundDots: true
      },
      cornersSquareOptions: { 
        color: color,
        type: "extra-rounded"
      },
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q"
      },
      cornersDotOptions: { 
        color: color,
        type: "dot"
      },
      dotsOptionsHelper: {
        colorType: { single: true },
        gradient: null
      },
      cornersSquareOptionsHelper: {
        colorType: { single: true },
        gradient: null
      },
      cornersDotOptionsHelper: {
        colorType: { single: true },
        gradient: null
      }
    } as any); // Using 'as any' to bypass TypeScript errors for advanced options

    qrCodeInstance.current = qrCode;
    qrCode.append(qrCodeRef.current);
    
    console.log('[QRCodePreview] QR code rendered with settings:', {
      size,
      color,
      backgroundColor,
      eyeStyle: 'extra-rounded',
      hasLogo: !!logoUrl,
      isExamplePlaceholder: url === "https://example.com"
    });

    return () => {
      // Clean up on unmount
      if (qrCodeInstance.current) {
        qrCodeInstance.current = null
      }
    }
  }, [url, color, backgroundColor, size, logoUrl])

  return <div ref={qrCodeRef} style={{ width: size, height: size }} />
}

interface QRCodePreviewProps {
  qrCode: any
  size?: number
  logoUrl?: string
}

export function QRCodePreview({ qrCode, size = 200, logoUrl = "/images/g4.png" }: QRCodePreviewProps) {
  // Ensure we have a valid logo URL with fallback
  const finalLogoUrl = qrCode.logo_url || logoUrl || '/images/g4.png';
  
  console.log('[QRCodePreview] Rendering preview with settings:', {
    url: qrCode.url === "Current Page" ? 'Current Page' : qrCode.url,
    color: qrCode.qr_code_color || "#000000",
    backgroundColor: qrCode.background_color || "#ffffff",
    logoUrl: finalLogoUrl,
    size
  });

  return (
    <QRCodeDisplay
      url={qrCode.url === "Current Page" ? "https://example.com" : qrCode.url}
      color={qrCode.qr_code_color || "#000000"}
      backgroundColor={qrCode.background_color || "#ffffff"}
      size={size}
      showBorder={false}
      logoUrl={finalLogoUrl}
    />
  )
}
