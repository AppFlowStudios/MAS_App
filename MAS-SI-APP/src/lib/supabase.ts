import { createClient } from "@supabase/supabase-js"
import { useAuth } from "../providers/AuthProvider"
const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_LOCAL!

export const supabase = createClient(supabaseURL, supabaseAnonKey)
const { session } = useAuth()
export const user_bookmark_surahs_channel = supabase
  .channel('user_bookmarked_surahs_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: "user_bookmarked_surahs",
    },
    (payload) => console.log(payload)
  )
  .subscribe()