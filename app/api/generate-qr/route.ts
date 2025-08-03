import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get parameters from the URL
    const searchParams = request.nextUrl.searchParams
    const data = searchParams.get("data") || "https://example.com"
    const color = searchParams.get("color") || "000000"
    const backgroundColor = searchParams.get("backgroundColor") || "ffffff"
    const size = searchParams.get("size") || "1000"
    const fileName = searchParams.get("fileName") || "qr-code"

    // Build the QR code API URL with simplified parameters
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${size}x${size}&color=${color}&bgcolor=${backgroundColor}&format=png&qzone=1`

    console.log("Fetching QR code from:", apiUrl)

    // Fetch the QR code from the API
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    // Get the image data
    const imageData = await response.arrayBuffer()

    // Return the image with appropriate headers
    return new NextResponse(imageData, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${fileName}.png"`,
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return NextResponse.json({ error: `Failed to generate QR code: ${error.message}` }, { status: 500 })
  }
}
