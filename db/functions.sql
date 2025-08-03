-- Create a function to increment the scan count for a QR code
CREATE OR REPLACE FUNCTION increment_scan_count(qr_code_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE qr_codes
  SET scans = scans + 1
  WHERE id = qr_code_id;
END;
$$ LANGUAGE plpgsql;
