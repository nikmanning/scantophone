"use client"

import type React from "react"
import SidebarNav from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import LivePreview from "@/components/live-preview"

interface CreateQRLayoutProps {
  children: React.ReactNode
  title: string
  url?: string
  displayText?: string
  qrCodeColor?: string
  backgroundColor?: string
  position?: string
  additionalInfo?: Record<string, string>
  startCollapsed?: boolean
  autoHideOnScroll?: boolean
  animation?: string
  onSave?: () => void
  isSaving?: boolean
  showSidebar?: boolean
  logoUrl?: string | null
}

export default function CreateQRLayout({
  children,
  title,
  url,
  displayText,
  qrCodeColor,
  backgroundColor,
  position,
  additionalInfo,
  startCollapsed,
  autoHideOnScroll,
  animation,
  onSave,
  isSaving,
  showSidebar = true,
  logoUrl = null,
}: CreateQRLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#e9ede7] relative">
      {/* Sidebar Navigation */}
      {showSidebar && <SidebarNav />}

      {/* Main Content */}
      <div className="flex-1 p-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 border-2 border-black font-medium"
              onClick={onSave}
              disabled={isSaving}
            >
              Save & Quit
            </Button>
          </div>

          {children}
        </div>
      </div>

      {/* Preview Panel */}
      {url !== undefined && (
        <LivePreview
          url={url}
          displayText={displayText || "Scan With Your Phone"}
          qrCodeColor={qrCodeColor}
          backgroundColor={backgroundColor}
          position={position || "Bottom Right"}
          additionalInfo={additionalInfo}
          startCollapsed={startCollapsed}
          autoShowOnScroll={autoHideOnScroll}
          animation={animation}
          logoUrl={logoUrl}
        />
      )}
    </div>
  )
}
