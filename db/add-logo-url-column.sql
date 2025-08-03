-- Add logo_url column to qr_codes table if it doesn't exist
ALTER TABLE IF EXISTS qr_codes 
ADD COLUMN IF NOT EXISTS logo_url TEXT;
