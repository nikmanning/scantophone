import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Return demo QR codes for testing
    const demoQRCodes = [
      {
        id: "bd790426-38b5-4b83-b5cc-732ec3cec848",
        name: "Demo QR Code 1",
        url_type: "current",
        custom_url: null,
        active: true,
        background_color: "#ffffff",
        foreground_color: "#000000",
        button_color: "#3b82f6",
        button_text: "View QR",
        button_shape: "rounded",
        button_icon: "qr",
        show_button: true,
        position: "bottom-right",
        created_at: new Date().toISOString()
      },
      {
        id: "demo-qr-2",
        name: "Demo QR Code 2 - Custom URL",
        url_type: "custom",
        custom_url: "https://example.com",
        active: true,
        background_color: "#f0f0f0",
        foreground_color: "#333333",
        button_color: "#10b981",
        button_text: "Scan Me",
        button_shape: "square",
        button_icon: "link",
        show_button: false,
        position: "top-left",
        created_at: new Date().toISOString()
      },
      {
        id: "demo-qr-3",
        name: "Demo QR Code 3 - Hidden Button",
        url_type: "current",
        custom_url: null,
        active: true,
        background_color: "#fef3c7",
        foreground_color: "#92400e",
        button_color: "#f59e0b",
        button_text: "Show QR",
        button_shape: "pill",
        button_icon: "qr",
        show_button: true,
        position: "bottom-left",
        created_at: new Date().toISOString()
      }
    ]

    return NextResponse.json(demoQRCodes)
  } catch (error) {
    console.error("Error fetching QR codes:", error)
    return NextResponse.json(
      { error: "Failed to fetch QR codes" },
      { status: 500 }
    )
  }
}
