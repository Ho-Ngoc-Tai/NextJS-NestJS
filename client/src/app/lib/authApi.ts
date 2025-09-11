import { api } from './api'

export const loginApi = (payload: { email: string; password: string }) => {
  return api.post('/auth/login', payload)
}

export const refreshApi = () => api.post('/auth/refresh')
export const profileApi = () => api.get('/auth/profile')
