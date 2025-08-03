'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProfile() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('You must be logged in to view your profile.')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return profile
}

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('You must be logged in to update your profile.')
  }

  const profileData = {
    full_name: formData.get('fullName') as string,
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    phone: formData.get('phone') as string,
    website: formData.get('website') as string,
    bio: formData.get('bio') as string,
  }

  const { error } = await supabase.from('profiles').update(profileData).eq('id', user.id)

  if (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/profile')
  return { success: true }
}
