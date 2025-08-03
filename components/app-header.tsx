"use client"

import Link from "next/link"
import { QrCode, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { LogOut } from "lucide-react"

interface AppHeaderProps {
  activePage?: "my-qr-codes" | "profile"
}

export function AppHeader({ activePage }: AppHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="bg-black text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/my-qr-codes" className="flex items-center">
            <QrCode className="h-6 w-6 mr-2 text-[#e4ff54]" />
            <span className="text-xl font-bold">Viral QR Code</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/my-qr-codes"
              className={`transition-colors ${
                activePage === "my-qr-codes" ? "text-[#e4ff54]" : "hover:text-[#e4ff54]"
              }`}
            >
              My QR Codes
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-[#e4ff54] hover:bg-black relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-[#e4ff54] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          <Button onClick={handleSignOut} variant="ghost" size="icon" className="text-white hover:text-[#e4ff54] hover:bg-black">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
