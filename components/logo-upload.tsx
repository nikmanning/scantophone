"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { uploadQRLogo } from "@/app/actions/upload-qr-logo"
import { Loader2 } from "lucide-react"

interface LogoUploadProps {
  onUploadComplete: (url: string) => void
}

export function LogoUpload({ onUploadComplete }: LogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadQRLogo(formData)

      if (result.error) {
        setError(result.error)
        return
      }

      if (result.url) {
        onUploadComplete(result.url)
      }
    } catch (err) {
      setError("Failed to upload logo")
      console.error("Upload error:", err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="relative"
          disabled={isUploading}
          onClick={() => document.getElementById("logo-upload")?.click()}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Choose File"
          )}
        </Button>
        <input
          id="logo-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
