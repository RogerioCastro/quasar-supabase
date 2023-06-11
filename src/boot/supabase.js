import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/useAuthUser'

const supabaseUrl = process.env.API_URL
const supabaseKey = process.env.API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// console.log('supabase:', supabase)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
  // console.log('Supabase event:', event, session)
})

export default function useSupabase () {
  return { supabase }
}
