import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Initialize Supabase client for database operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request) {
  const { qrId } = await request.json()

  if (!qrId) {
    return NextResponse.json({ error: "QR code ID is required" }, { status: 400 })
  }

  try {
    // Increment the scan count for the given QR code
    const { error } = await supabase.rpc("increment_scan_count", { qr_id: qrId })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error tracking scan:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
