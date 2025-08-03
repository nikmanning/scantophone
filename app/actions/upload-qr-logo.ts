"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function uploadQRLogo(formData: FormData) {
  try {
    const supabase = createClient()

    // Get the file from the form data
    const file = formData.get("file") as File

    if (!file) {
      return { error: "No file provided" }
    }

    // Generate a unique file name
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage.from("qr-logos").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading logo:", error)
      return { error: error.message }
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage.from("qr-logos").getPublicUrl(fileName)

    revalidatePath("/monkey")

    return {
      success: true,
      url: publicUrlData.publicUrl,
    }
  } catch (error) {
    console.error("Error in uploadQRLogo:", error)
    return { error: "Failed to upload logo" }
  }
}
