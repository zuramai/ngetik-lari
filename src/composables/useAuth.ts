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
        if(register !== true) {
            console.log(register.message)
            if(register.status === 422) {
                errorMessage.value = register.message
            } else {
                errorMessage.value = "Invalid input"
            }
        }   

        return register
    }

    const currentUser = ref<User|null>(null)
    const getUser = async () => {
        const res = await apiUser.fetchUser()
        currentUser.value = res.data.session?.user || null
    }

    const logout = async () => {
        return await apiUser.logout()
    }

    getUser()

    return {
        login, 
        logout, 
        errorMessage,
        currentUser,
        isLoading,
        register,
        getUser
    }
}