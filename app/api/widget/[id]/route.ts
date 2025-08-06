import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// CORS headers to allow requests from the development server
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow requests from any origin for development
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders
  })
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: 'QR code ID is required' }), 
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
  
  console.log('Widget API endpoint called with ID:', id)
  
  try {
    // Initialize Supabase client directly
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )
    
    console.log('Supabase Query - Looking for QR code with ID:', id);
    
    // First, list all QR codes to see what's available
    const { data: allCodes, error: listError } = await supabase
      .from('qr_codes')
      .select('id')
      .limit(5);
      
    if (listError) {
      console.error('Error listing QR codes:', listError);
    } else {
      console.log('Available QR code IDs (first 5):', allCodes?.map(code => code.id));
    }
    
    // Try to fetch the QR code from the database
    const { data, error } = await supabase
      .from('qr_codes')
      .select(`
        display_text,
        show_on_desktop,
        show_on_mobile,
        show_button,
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
    
    // If there's an error or no data, return a 404
    if (error || !data) {
      console.error('QR code not found:', id);
      return new NextResponse(
        JSON.stringify({ error: 'QR code not found' }), 
        { 
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
    
    // Check if the QR code is active
    if (!data.active) {
      return new NextResponse(
        JSON.stringify({ error: 'This QR code is not active' }),
        { 
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
    
    // Log the data we got from the database
    console.log('Database record:', JSON.stringify(data, null, 2));
    
    // Remove the active property before sending it to the client
    const { active, ...config } = data;
    
    // Log the config we're about to send
    console.log('Sending config with show_button:', config.show_button);
    
    // If URL type is 'current', ensure we don't use the pre-generated QR code
    if (config.url_type === 'current') {
      config.qr_image_url = ''; // Clear the pre-generated URL
    }
    
    return new NextResponse(
      JSON.stringify({
        ...config,
        success: true
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
    
  } catch (e) {
    console.error('Unexpected error in widget API:', e)
    
    // Return a simple error response that won't cause JSON parsing issues
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
