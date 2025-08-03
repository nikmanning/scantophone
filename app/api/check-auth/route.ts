import { type NextRequest, NextResponse } from "next/server"
import { checkUserAuthentication } from "@/app/actions/check-auth"

export async function POST(request: NextRequest) {
  try {
    // Get email from request body
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check authentication status
    const authResult = await checkUserAuthentication(email)

    return NextResponse.json(authResult)
  } catch (error) {
    console.error("Error in check-auth API:", error)
    return NextResponse.json({ error: "Failed to check authentication status" }, { status: 500 })
  }
}
