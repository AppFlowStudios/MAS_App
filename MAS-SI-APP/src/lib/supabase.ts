import { createClient } from "@supabase/supabase-js"

const supabaseURL = "https://pklldvgwaccokqcygmzr.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbGxkdmd3YWNjb2txY3lnbXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMTczNDUsImV4cCI6MjAzMTc5MzM0NX0.cKBzqhwGvQ7CpwjBuQVs8PHD03QLbKI3m7n7xVdJbHE"

export const supabase = createClient(supabaseURL, supabaseAnonKey)

