import { createClient } from "@supabase/supabase-js"
const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_LOCAL!

export const supabase = createClient(supabaseURL, supabaseAnonKey)
