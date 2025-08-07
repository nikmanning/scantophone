require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use the SERVICE_ROLE_KEY to bypass RLS for this admin check
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listQrCodes() {
  console.log('Connecting to Supabase to list all QR codes...');
  try {
    const { data, error } = await supabase
      .from('qr_codes')
      .select('id, name, active, created_at, logo_url');

    if (error) {
      console.error('Error fetching QR codes:', error.message);
      return;
    }

    if (data && data.length > 0) {
      console.log('Found the following QR codes in the database:');
      console.table(data);
    } else {
      console.log('No QR codes found in the database.');
    }
  } catch (e) {
    console.error('An unexpected error occurred:', e.message);
  }
}

listQrCodes();
