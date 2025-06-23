import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
export const supabase2 = createClient(import.meta.env.VITE_URL, import.meta.env.VITE_KEY)

