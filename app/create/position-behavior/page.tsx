"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function PositionBehaviorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Redirect to the main create page with the current query parameters
    const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ""
    router.replace(`/create${queryString}`)
  }, [router, searchParams])

  return null
}
