import { supabase } from '@/integrations/supabase/client';

async function checkTables() {
  const { data, error } = await supabase.from('pg_tables').select('*').eq('schemaname', 'public');

  if (error) {
    console.error('Error fetching tables:', error);
  } else {
    console.log('Tables in the public schema:', data);
  }
}

checkTables();