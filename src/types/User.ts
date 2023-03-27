export interface User {
    id?: string
    email?: string 
    password?: string
    user_metadata?: Record<string, string>
    created_at: string
}