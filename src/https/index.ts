import axios from 'axios'
import AuthResponse from '../models/AuthResponse'

const { API_URL } = process.env
const $api = axios.create({
    baseURL: API_URL,
})

$api.interceptors.request.use(config => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    config => {
        return config
    },
    async error => {
        const originalRequest = error.config
        if (
            error.response.status === 401
            && error.config
            && !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                const response = await axios.post<AuthResponse>(
                    `${API_URL}account/refresh-token/`,
                    {
                        refresh: localStorage.getItem('tokenRefresh'),
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    },
                )
                localStorage.setItem('token', response.data.access)
                localStorage.setItem('tokenRefresh', response.data.refresh)
                return $api.request(originalRequest)
            } catch (e) {
                console.log('no auth')
            }
        }
        throw error
    },
)

export default $api
