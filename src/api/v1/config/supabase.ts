import { createClient } from '@supabase/supabase-js'

const SUPBASE_URI: string = process.env.SUPABASE_URI!
const SUPABASE_ANON_API_KEY: string = process.env.SUPABASE_PUBLIC_ANON_KEY!

export const supabase = createClient(SUPBASE_URI, SUPABASE_ANON_API_KEY)
