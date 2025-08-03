import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'QR code ID is required' }, { status: 400 })
  }
  
  console.log('Widget API endpoint called with ID:', id)
  
  try {
    // Initialize Supabase client directly
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )
    
    // Try to fetch the QR code from the database
    const { data, error } = await supabase
      .from('qr_codes')
      .select(`
        display_text,
        show_on_desktop,
        show_on_mobile,
        custom_url,
        url_type,
        qr_code_color,
        background_color,
        button_color,
        size,
        button_shape,
        button_icon,
        logo_url,
        position,
        margin,
        margin_x,
        margin_y,
        start_collapsed,
        auto_show_on_scroll,
        animation,
        qr_image_url,
        active
      `)
      .eq('id', id)
      .single()
    
    // If there's an error or no data, use fallback mock data
    if (error || !data) {
      console.error('Error fetching QR code or not found, using fallback data:', error)
      
      // Fallback mock data
      const mockData = {
        display_text: 'Scan this QR code',
        show_on_desktop: true,
        show_on_mobile: true,
        custom_url: 'https://example.com',
        url_type: 'custom',
        qr_code_color: '#000000',
        background_color: '#ffffff',
        button_color: '#4f46e5',
        size: 150,
        button_shape: 'rounded',
        button_icon: 'qr-code',
        logo_url: null,
        position: 'bottom-right',
        margin: 20,
        margin_x: 20,
        margin_y: 20,
        start_collapsed: true,
        auto_show_on_scroll: false,
        animation: 'fade',
        qr_image_url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com',
        show_button: true,
        active: true
      }
      
      // Remove the active property before sending it to the client
      const { active, ...config } = mockData
      return NextResponse.json(config)
    }
    
    // Check if the QR code is active
    if (!data.active) {
      return NextResponse.json({ error: 'This QR code is not active' }, { status: 403 })
    }
    
    // Remove the active property before sending it to the client
    const { active, ...config } = data
    return NextResponse.json(config)
    
  } catch (e) {
    console.error('Unexpected error in widget API:', e)
    
    // Return a simple error response that won't cause JSON parsing issues
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
