import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dhikeiodkvfxtlsfkmvz.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoaWtlaW9ka3ZmeHRsc2ZrbXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4ODAzNjYsImV4cCI6MTk3NzQ1NjM2Nn0.bCBnYf73tzUgLKalDQW8GPKEijJ61Dg-TXU35iZLg2E';

export default createClient(supabaseUrl, supabaseAnonToken);
