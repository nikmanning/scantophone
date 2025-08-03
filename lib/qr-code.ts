/**
 * Utility functions for QR code generation
 */

/**
 * Generate a QR code URL using the GoQR.me API
 *
 * @param data The data to encode in the QR code (URL, text, etc.)
 * @param size The size of the QR code in pixels
 * @param color The color of the QR code (hex without #)
 * @param backgroundColor The background color (hex without #)
 * @returns URL to the generated QR code image
 */
export function generateQRCodeUrl(data: string, size = 150, color = "000000", backgroundColor = "ffffff"): string {
  // Remove # from hex colors if present
  color = color.replace("#", "")
  backgroundColor = backgroundColor.replace("#", "")

  // Encode the data for URL
  const encodedData = encodeURIComponent(data)

  // Generate the QR code URL
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=${size}x${size}&color=${color}&bgcolor=${backgroundColor}`
}

/**
 * Get the current page URL
 *
 * @returns The current page URL or a placeholder if not available
 */
export function getCurrentPageUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.href
  }
  return "https://example.com"
}
