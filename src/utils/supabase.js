import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://flobdrmejeljahvhpcfd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsb2Jkcm1lamVsamFodmhwY2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2NTQ4NTEsImV4cCI6MjAyMzIzMDg1MX0.qy7YAjHfM_gAhIeQC7Kv5Zrg_MCJf8zh5XXrF-79JYY')

export default supabase;
