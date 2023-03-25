import { supabase } from '@/composables/useSupabase'

export const fetchUser = () => {
    const session = supabase.auth.getSession()
    return session
}

export const login = async (email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
        email, password
    })

    if(error) return false 

    return true
}

export const logout = () => {
    supabase.auth.signOut()
}

export const register = (email: string, username: string, password: string) => {
    const { error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                username
            }
        }
    })

    if(error) return false 

    return true;
}
