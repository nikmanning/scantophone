import QRCodeStyling, { Options } from "qr-code-styling"

// This file provides utility functions for working with the qr-code-styling library

// Function to generate a QR code data URL
export async function generateQRCodeDataURL(options: Options): Promise<string> {
  const qrCode = new QRCodeStyling(options)
  const blob = await qrCode.getRawData("png")
  if (blob instanceof Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
  throw new Error("Failed to generate QR code blob.")
}

// Function to download a QR code
export function downloadQRCode(options: Options & { fileName: string }): void {
  const qrCode = new QRCodeStyling(options)
  qrCode.download({ name: options.fileName, extension: "png" })
}

