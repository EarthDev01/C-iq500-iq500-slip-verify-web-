// src/plugins/axios.ts
import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptor: เพิ่ม token, จัดการ error
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // แสดง error หรือจัดการ global error
        if (error.response?.status === 401) {
            // ลบ token, logout หรือ redirect
            console.warn('Unauthorized - maybe logout')
        }
        return Promise.reject(error)
    }
)

export default apiClient
