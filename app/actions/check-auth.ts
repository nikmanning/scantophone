import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function checkUserAuthentication(email: string) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Error checking user authentication:', error)
      return { isAuthenticated: false, error: error.message }
    }

    return { isAuthenticated: !!user, user }
  } catch (error) {
    console.error('Error in checkUserAuthentication:', error)
    return { isAuthenticated: false, error: 'Internal server error' }
  }
}
