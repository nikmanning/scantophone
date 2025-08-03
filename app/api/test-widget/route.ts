import { NextResponse } from 'next/server'

export async function GET() {
  // Return hardcoded data for testing
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
    show_button: true
  }

  return NextResponse.json(mockData)
}
