import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

// Helper to create a JSON response with CORS headers
const createCorsResponse = (body: any, status: number) => {
  return NextResponse.json(body, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export async function OPTIONS() {
    return createCorsResponse(null, 204) // No content response for preflight
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient()
  const { id } = params

  if (!id) {
    return createCorsResponse({ error: "QR code ID is required" }, 400)
  }

  try {
    const { data: qrCode, error } = await supabase
      .from("qr_codes")
      .select(
        "custom_url, qr_code_color, background_color, logo_url, dots_type, corners_square_type, corners_dot_type, active"
      )
      .eq("id", id)
      .single()

    if (error || !qrCode) {
      if (error && error.code !== 'PGRST116') {
         console.error("Error fetching QR code from Supabase:", error)
      }
      return createCorsResponse({ error: "QR code not found" }, 404)
    }

    if (!qrCode.active) {
        return createCorsResponse({ error: "This QR code is not active" }, 403)
    }
    
    const { active, ...config } = qrCode

    return createCorsResponse(config, 200)

  } catch (error) {
    console.error("An unexpected error occurred:", error)
    const errorMessage = error instanceof Error ? error.message : "An internal server error occurred"
    return createCorsResponse({ error: errorMessage }, 500)
  }
}
