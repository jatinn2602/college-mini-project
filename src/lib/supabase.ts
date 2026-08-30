import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ybtqwrrddgrtdpywjpgq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHF3cnJkZGdydGRweXdqcGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMTE4NjcsImV4cCI6MjEwMzU4Nzg2N30.EbJztKmYryNWSoLGF2xz9oIaaxFK2j193ctWV0CejTI';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export default supabase;
