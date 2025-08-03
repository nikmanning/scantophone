"use server"

import { createClient } from '@/utils/supabase/server'

export async function uploadLogo(formData: FormData) {
  try {
    // Create a server client with service role key
    const supabase = createClient()

    // Get the file from the form data
    const file = formData.get("logo") as File
    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" }
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return { success: false, error: "File size must be less than 2MB" }
    }

    // Generate a unique file name
    const fileExt = file.name.split(".").pop()
    const fileName = `qr-logo-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`

    // Convert the file to an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload the file to Supabase Storage
    const { error: uploadError, data: uploadData } = await supabase.storage.from("qr-logos").upload(fileName, buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    })

    if (uploadError) {
      console.error("Error uploading logo:", uploadError)
      return { success: false, error: uploadError.message }
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage.from("qr-logos").getPublicUrl(fileName)

    if (!publicUrlData) {
      return { success: false, error: "Failed to get public URL" }
    }

    return { success: true, logoUrl: publicUrlData.publicUrl }
  } catch (error) {
    console.error("Error in uploadLogo:", error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "An unexpected error occurred" }
  }
}
