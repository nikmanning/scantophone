import { type NextRequest, NextResponse } from "next/server"
import QRCode from "qrcode"
import { createCanvas, loadImage } from "canvas"

export async function POST(req: NextRequest) {
  try {
    const { url, color, backgroundColor, cornerRadius, size, logoUrl } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: size || 1000,
      margin: 1,
      color: {
        dark: color || "#000000",
        light: backgroundColor || "#ffffff",
      },
    })

    // Create canvas
    const canvas = createCanvas(size || 1000, size || 1000)
    const ctx = canvas.getContext("2d")

    // Load QR code onto canvas
    const qrImage = await loadImage(qrCodeDataURL)
    ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height)

    // Add logo if provided
    if (logoUrl) {
      try {
        const logoSize = (size || 1000) * 0.25 // Logo size is 25% of QR code size
        const logoX = ((size || 1000) - logoSize) / 2
        const logoY = ((size || 1000) - logoSize) / 2

        // Create background for logo
        ctx.fillStyle = backgroundColor || "#ffffff"
        ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10)

        // Load and draw logo
        const logo = await loadImage(logoUrl)
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize)
      } catch (logoError) {
        console.error("Error adding logo to QR code:", logoError)
        // Continue without logo if there's an error
      }
    }

    // Convert canvas to buffer
    const buffer = canvas.toBuffer("image/png")

    // Return the QR code as an image
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="qr-code.png"`,
      },
    })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return NextResponse.json(
      { error: "Failed to generate QR code: " + (error.message || "Unknown error") },
      { status: 500 },
    )
  }
}
