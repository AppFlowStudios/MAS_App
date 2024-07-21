import { createClient } from "@supabase/supabase-js"
import { useAuth } from "../providers/AuthProvider"
const supabaseURL = "https://pklldvgwaccokqcygmzr.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbGxkdmd3YWNjb2txY3lnbXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMTczNDUsImV4cCI6MjAzMTc5MzM0NX0.cKBzqhwGvQ7CpwjBuQVs8PHD03QLbKI3m7n7xVdJbHE"

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