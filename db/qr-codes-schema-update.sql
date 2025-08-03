-- Update the QR codes table schema to fix column names
ALTER TABLE IF EXISTS qr_codes 
  ADD COLUMN IF NOT EXISTS custom_url TEXT,
  ADD COLUMN IF NOT EXISTS button_color TEXT DEFAULT '#000000',
  ADD COLUMN IF NOT EXISTS qr_code_color TEXT DEFAULT '#000000';

-- If the 'url' column exists, migrate data to 'custom_url'
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'qr_codes' AND column_name = 'url'
  ) THEN
    -- Copy data from url to custom_url if custom_url is null
    UPDATE qr_codes
    SET custom_url = url
    WHERE custom_url IS NULL AND url IS NOT NULL;
    
    -- Optionally drop the url column if no longer needed
    -- ALTER TABLE qr_codes DROP COLUMN url;
  END IF;
END $$;

-- Create or update indexes
CREATE INDEX IF NOT EXISTS qr_codes_user_id_idx ON qr_codes (user_id);
CREATE INDEX IF NOT EXISTS qr_codes_active_idx ON qr_codes (active);
