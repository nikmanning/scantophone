import Link from "next/link"

import { MainNav } from "@/components/main-nav"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    fetchUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/my-qr-codes"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      My QR Codes
                    </Link>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button>Log In</Button>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
