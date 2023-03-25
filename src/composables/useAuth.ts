import * as apiUser from '@/api/user' 
import type { User } from '@/types/User'
import { ref } from 'vue'

export const useAuth = () => {
    const isLoading = ref(false)
    const errorMessage = ref('')

    const login = async (email: string, password: string) => {
        errorMessage.value = ""
        isLoading.value = true
        const login = await apiUser.login(email, password)
        isLoading.value = false 

        if(!login) errorMessage.value = "Wrong credentials"

        return login 
    }

    const register = async (email: string, username: string, password: string) => {
        errorMessage.value = ""
        isLoading.value = true
        const register = await apiUser.register(email, username, password)
        isLoading.value = false 

        if(!login) errorMessage.value = "Invalid input"

        return register
    }

    const getUser = async () => {
        return await apiUser.fetchUser()
    }

    const logout = async () => {
        return await apiUser.logout()
    }

    const currentUser = ref<User|null>()
    getUser().then(session => currentUser.value = session.data.session?.user)

    return {
        login, 
        logout, 
        currentUser,
        register,
        getUser
    }
}