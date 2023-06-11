import { ref } from 'vue'
import useSupabase from 'boot/supabase'

// Usuário definido fora de useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário
const user = ref(null)

export default function useAuthUser () {
  const { supabase } = useSupabase()

  /**
   * Login com e-mail e senha
   * @param {object} param.email E-mail do usuário
   * @param {object} param.password Senha do usuário
   * @returns Usuário
   */
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      throw error
    }
    return user
  }

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider })
    if (error) {
      throw error
    }
    return user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const register = async ({ email, password, ...meta }) => {
    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: meta,
          emailRedirectTo: `${process.env.SITE_URL}/me?fromEmail=registrationConfirmation`
        }
      }
    )
    if (error) {
      throw error
    }
    return data
  }

  const update = async (newData) => {
    const { data, error } = await supabase.auth.updateUser(newData)
    if (error) {
      throw error
    }
    return data
  }

  const sendPasswordRestEmail = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.SITE_URL}/reset-password`
    })
    // const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) {
      throw error
    }
    return data
  }

  /* const teste = async () => {
    const { data: users, error } = await supabase
      .from('auth.users')
      .select('*')
      .eq('email', 'user@example.com')
    if (error) {
      throw error
    }
    return users
  } */

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail
  }
}
