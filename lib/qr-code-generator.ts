/**
 * QR Code Generator utility
 * Uses the GoQR.me API to generate QR codes
 */

// Base URL for the GoQR.me API
const QR_API_BASE_URL = "https://api.qrserver.com/v1/create-qr-code/"

// Interface for QR code options
export interface QRCodeOptions {
  data: string
  size?: number
  color?: string
  backgroundColor?: string
  format?: "png" | "gif" | "jpeg" | "jpg" | "svg" | "eps"
  margin?: number
  qrZone?: number
}

/**
 * Gets a default URL for QR code generation when no URL is provided
 * @returns A default URL for QR code generation
 */
export function getDefaultQrUrl(): string {
  return "https://example.com"
}

/**
 * Generates a QR code URL based on the provided options
 * @param options QR code generation options
 * @returns URL to the generated QR code
 */
export function generateQRCodeUrl(options: QRCodeOptions): string {
  const {
    data,
    size = 200,
    color = "000000",
    backgroundColor = "ffffff",
    format = "png",
    margin = 1,
    qrZone = 0,
  } = options

  // Ensure we have valid data to generate a QR code
  const qrData = data || "https://example.com"

  // Remove the # from color codes if present
  const cleanColor = color.startsWith("#") ? color.substring(1) : color
  const cleanBgColor = backgroundColor.startsWith("#") ? backgroundColor.substring(1) : backgroundColor

  // Build the query parameters
  const params = new URLSearchParams({
    data: qrData,
    size: `${size}x${size}`,
    color: cleanColor,
    bgcolor: cleanBgColor,
    format,
    margin: margin.toString(),
    qzone: qrZone.toString(),
  })

  // Return the full URL
  return `${QR_API_BASE_URL}?${params.toString()}`
}

/**
 * Validates a URL for QR code generation
 * @param url URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Ensures a URL has a protocol
 * @param url URL to check
 * @returns URL with protocol
 */
export function ensureUrlProtocol(url: string): string {
  if (!url) return ""

  // If the URL doesn't start with http:// or https://, add https://
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`
  }

  return url
}
