"use client"

import { useEffect, useRef, useState } from "react"

interface StyledQRCodeProps {
  url: string
  size?: number
  color?: string
  backgroundColor?: string
  logoUrl?: string | null
  className?: string
}

// Use a dynamic import for QRCodeStyling to ensure it's client-side only
import type QRCodeStyling from 'qr-code-styling';

export default function StyledQRCode({
  url,
  size = 200,
  color = "#000000",
  backgroundColor = "#ffffff",
  logoUrl = "/images/g4.png",
  className = "",
}: StyledQRCodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Effect for initializing the QR code instance
  useEffect(() => {
    if (!ref.current) return;

    // Use dynamic import to ensure this only runs on the client
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      if (!ref.current) return; // Check ref again inside promise

      qrCodeRef.current = new QRCodeStyling({
        width: size,
        height: size,
        type: 'canvas',
        data: url.startsWith('http') ? url : `https://${url}`,
        image: logoUrl || undefined,
        dotsOptions: { color, type: 'square' },
        backgroundOptions: { color: backgroundColor },
        cornersSquareOptions: { type: 'square', color },
        cornersDotOptions: { type: 'square', color },
        imageOptions: { crossOrigin: 'anonymous', margin: 10, imageSize: 0.25 },
      });

      // Clear previous content and append the new QR code
      ref.current.innerHTML = '';
      qrCodeRef.current.append(ref.current);
    }).catch(err => {
      console.error("Failed to load QR code library", err);
      setError("Could not load QR code library.");
    });

    // Cleanup function to run on unmount
    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
      // Dispose of the QR code instance to prevent memory leaks
      qrCodeRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect for updating the QR code when props change
  useEffect(() => {
    if (!qrCodeRef.current) return;

    qrCodeRef.current.update({
      width: size,
      height: size,
      data: url.startsWith('http') ? url : `https://${url}`,
      image: logoUrl || undefined,
      dotsOptions: { color, type: 'square' },
      backgroundOptions: { color: backgroundColor },
      cornersSquareOptions: { type: 'square', color },
      cornersDotOptions: { type: 'square', color },
    });
  }, [url, size, color, backgroundColor, logoUrl]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <div ref={ref} className="w-full h-full flex items-center justify-center" />
      )}
    </div>
  )
}
