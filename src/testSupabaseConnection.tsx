import { supabase } from '@/integrations/supabase/client';

async function testConnection() {
  const { data, error } = await supabase.from('resumes').select('*');
  if (error) console.error('Error:', error);
  else console.log('Data:', data);
}

testConnection();