import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    // Validate the payload
    if (!payload.data) {
      return NextResponse.json({ error: "Missing data field" }, { status: 400 })
    }

    // Process the logo URL if it's a relative path or not a supported format
    if (payload.config?.logo) {
      const logoUrl = payload.config.logo

      // If it's a relative URL (starts with / or doesn't have http), we need to handle it differently
      if (logoUrl.startsWith("/") || !logoUrl.startsWith("http")) {
        // For relative URLs, we can't use them directly with QR Monkey API
        // Instead, use a known working logo URL from Supabase storage
        console.log("Converting relative logo URL to absolute URL:", logoUrl)
        payload.config.logo =
          "https://isvpyeyfwgpqtnlpykqu.supabase.co/storage/v1/object/public/qr-logos/1746640077052-g4.png"
      } else {
        // Check if the URL ends with a supported image format
        const supportedFormats = [".png", ".jpg", ".jpeg", ".gif"]
        const hasValidExtension = supportedFormats.some((ext) => logoUrl.toLowerCase().endsWith(ext))

        if (!hasValidExtension) {
          console.log("Logo URL doesn't have a supported image extension:", logoUrl)
          // Use a default logo URL
          payload.config.logo =
            "https://isvpyeyfwgpqtnlpykqu.supabase.co/storage/v1/object/public/qr-logos/1746640077052-g4.png"
        }

        console.log("Using external logo URL:", payload.config.logo)
      }
    } else {
      // If no logo is provided, use the default logo
      payload.config.logo =
        "https://isvpyeyfwgpqtnlpykqu.supabase.co/storage/v1/object/public/qr-logos/1746640077052-g4.png"
    }

    // Log the request for debugging
    console.log("QR Monkey API request:", JSON.stringify(payload, null, 2))

    // Forward the request to QRCode Monkey API
    const response = await fetch("https://api.qrcode-monkey.com/qr/custom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      // Try to get error details
      let errorText = "Unknown error"
      try {
        const errorData = await response.json()
        errorText = JSON.stringify(errorData)
      } catch (e) {
        errorText = await response.text()
      }

      console.error(`QR Monkey API error (${response.status}):`, errorText)
      return NextResponse.json(
        { error: `QR Monkey API error: ${response.status} - ${errorText}` },
        { status: response.status },
      )
    }

    // Get the response content type
    const contentType = response.headers.get("content-type") || "image/png"

    // Get the response as a blob
    const blob = await response.blob()

    // Return the response with the appropriate content type
    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
      },
    })
  } catch (error) {
    console.error("Error in QR Monkey API route:", error)
    return NextResponse.json({ error: `Internal server error: ${error.message}` }, { status: 500 })
  }
}
