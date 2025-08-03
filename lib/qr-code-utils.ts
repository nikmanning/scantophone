import QRCode from "qrcode"

/**
 * Generates a QR code as a data URL
 * @param url The URL to encode in the QR code
 * @param options Options for the QR code generation
 * @returns A Promise that resolves to a data URL string
 */
export async function generateQRCodeDataURL(
  url: string,
  options: {
    width?: number
    color?: string
    backgroundColor?: string
    margin?: number
  } = {},
): Promise<string> {
  const { width = 300, color = "#000000", backgroundColor = "#ffffff", margin = 1 } = options

  // Remove # from color codes if present
  const darkColor = color.startsWith("#") ? color.substring(1) : color
  const lightColor = backgroundColor.startsWith("#") ? backgroundColor.substring(1) : backgroundColor

  try {
    return await QRCode.toDataURL(url, {
      width,
      margin,
      color: {
        dark: `#${darkColor}`,
        light: `#${lightColor}`,
      },
    })
  } catch (error) {
    console.error("Error generating QR code data URL:", error)
    throw error
  }
}
