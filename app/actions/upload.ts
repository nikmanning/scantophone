"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function uploadAvatar(formData: FormData) {
  try {
    const supabase = createServerClient()

    // Get the current session
    const cookieStore = cookies()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Not authenticated" }
    }

    // Get the file from the form data
    const file = formData.get("avatar") as File
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
    const fileName = `${session.user.id}-${Date.now()}.${fileExt}`

    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError)
      return { success: false, error: uploadError.message }
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(fileName)

    if (!publicUrlData) {
      return { success: false, error: "Failed to get public URL" }
    }

    // Update the user's profile with the new avatar URL
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: publicUrlData.publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id)

    if (updateError) {
      console.error("Error updating profile with avatar URL:", updateError)
      return { success: false, error: updateError.message }
    }

    // Revalidate the profile page to show the updated avatar
    revalidatePath("/profile")

    return { success: true, avatarUrl: publicUrlData.publicUrl }
  } catch (error) {
    console.error("Error in uploadAvatar:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
