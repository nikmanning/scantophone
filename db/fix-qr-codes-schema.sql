-- Check if the qr_codes table exists, if not create it
CREATE TABLE IF NOT EXISTS qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  custom_url TEXT,
  url_type TEXT DEFAULT 'current',
  display_text TEXT DEFAULT 'Scan to visit our website',
  qr_code_color TEXT DEFAULT '#000000',
  background_color TEXT DEFAULT '#ffffff',
  button_color TEXT DEFAULT '#000000',
  position TEXT DEFAULT 'bottom-right',
  margin_x INTEGER DEFAULT 20,
  margin_y INTEGER DEFAULT 20,
  size INTEGER DEFAULT 150,
  show_on_desktop BOOLEAN DEFAULT true,
  show_on_mobile BOOLEAN DEFAULT false,
  start_collapsed BOOLEAN DEFAULT true,
  auto_hide_on_scroll BOOLEAN DEFAULT false,
  animation TEXT DEFAULT 'fade',
  active BOOLEAN DEFAULT true,
  scans INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist
DO $$
BEGIN
  -- Check and add custom_url column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'qr_codes' AND column_name = 'custom_url') THEN
    ALTER TABLE qr_codes ADD COLUMN custom_url TEXT;
  END IF;

  -- Check and add url_type column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'qr_codes' AND column_name = 'url_type') THEN
    ALTER TABLE qr_codes ADD COLUMN url_type TEXT DEFAULT 'current';
  END IF;

  -- Check and add qr_code_color column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'qr_codes' AND column_name = 'qr_code_color') THEN
    ALTER TABLE qr_codes ADD COLUMN qr_code_color TEXT DEFAULT '#000000';
  END IF;

  -- Check and add background_color column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'qr_codes' AND column_name = 'background_color') THEN
    ALTER TABLE qr_codes ADD COLUMN background_color TEXT DEFAULT '#ffffff';
  END IF;
END $$;

-- Create or update indexes
CREATE INDEX IF NOT EXISTS qr_codes_user_id_idx ON qr_codes (user_id);
