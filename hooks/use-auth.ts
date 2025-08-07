"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { getBrowserClient } from "@/lib/supabase"

export function useAuth() {
  const supabase = getBrowserClient()
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        const { data } = await supabase.auth.getUser()
        if (!isMounted) return
        setUser(data.user ?? null)
      } finally {
        if (isMounted) setIsLoaded(true)
      }
    }

    load()

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      isMounted = false
      sub.subscription.unsubscribe()
    }
  }, [supabase])

  return {
    user,
    isLoaded,
    isSignedIn: !!user,
  }
}
