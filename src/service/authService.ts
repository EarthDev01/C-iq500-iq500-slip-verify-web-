import api from '@/plugins/axios'
import type { LoginPayload, LoginResponse } from '@/types/login'

export const login = (payload: LoginPayload) => {
    return api.post<LoginResponse>('/auth/login', payload)
}

export const getProfile = () => {
    return api.get('/auth/profile')
}