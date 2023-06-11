import useSupabase from 'src/boot/supabase'
// import useAuthUser from './useAuthUser'

export default function useApi () {
  const { supabase } = useSupabase()
  // const { user } = useAuthUser()

  const list = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select()
    if (error) {
      throw error
    }
    return data
  }

  return {
    list
  }
}
