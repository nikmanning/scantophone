-- Create QR codes table if it doesn't exist
CREATE TABLE IF NOT EXISTS qr_codes (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  custom_url TEXT,
  url_type TEXT DEFAULT 'current',
  display_text TEXT DEFAULT 'Send To Phone',
  show_on_desktop BOOLEAN DEFAULT true,
  show_on_mobile BOOLEAN DEFAULT false,
  qr_code_color TEXT DEFAULT '#000000',
  background_color TEXT DEFAULT '#ffffff',
  button_color TEXT DEFAULT '#000000',
  logo_url TEXT,
  position TEXT DEFAULT 'bottom-right',
  active BOOLEAN DEFAULT true,
  scans INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Policy for users to select their own QR codes
CREATE POLICY select_own_qr_codes ON qr_codes
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to insert their own QR codes
CREATE POLICY insert_own_qr_codes ON qr_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own QR codes
CREATE POLICY update_own_qr_codes ON qr_codes
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for users to delete their own QR codes
CREATE POLICY delete_own_qr_codes ON qr_codes
  FOR DELETE USING (auth.uid() = user_id);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS qr_codes_user_id_idx ON qr_codes (user_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_qr_codes_updated_at
BEFORE UPDATE ON qr_codes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
