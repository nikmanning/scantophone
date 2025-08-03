-- Add button_icon column to qr_codes table
ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS button_icon TEXT DEFAULT 'qr-code';
