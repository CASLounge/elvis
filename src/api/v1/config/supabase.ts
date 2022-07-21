import { createClient } from '@supabase/supabase-js'

const options = {
  schema: 'public',
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}

const SUPBASE_URI: string | any = process.env.SUPABASE_URI
const SUPABASE_ANON_API_KEY: string | any = process.env.SUPABASE_PUBLIC_ANON_KEY

export const supabase = createClient(SUPBASE_URI, SUPABASE_ANON_API_KEY, options)
