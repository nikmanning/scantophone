"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Loader2 } from "lucide-react"
import { uploadAvatar } from "@/app/actions/upload"
import { toast } from "@/components/ui/use-toast"

interface AvatarUploadProps {
  avatarUrl?: string
  full_name?: string
  disabled?: boolean
  onAvatarChange?: (url: string) => void
}

export function AvatarUpload({ avatarUrl, full_name, disabled, onAvatarChange }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Create a FormData object and append the file
      const formData = new FormData()
      formData.append("avatar", file)

      // Call the server action to upload the avatar
      const result = await uploadAvatar(formData)

      if (result.success) {
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated successfully",
        })

        // Call the onAvatarChange callback if provided
        if (onAvatarChange && result.avatarUrl) {
          onAvatarChange(result.avatarUrl)
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to upload avatar",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={full_name || "User"} />
        <AvatarFallback className="bg-[#e4ff54] text-black text-2xl">{full_name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled || isUploading}
      />

      <Button
        variant="outline"
        className="text-sm rounded-full border-2 border-gray-200"
        size="sm"
        onClick={handleUploadClick}
        disabled={disabled || isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-3 w-3" />
            Upload Photo
          </>
        )}
      </Button>
    </div>
  )
}
