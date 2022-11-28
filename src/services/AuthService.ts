import { AxiosResponse } from 'axios'
import AuthResponse from '../models/AuthResponse'
import $api from '../https'

export default class AuthService {
    static async login(
        username: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('account/auth/?login_params=username_password', { username, password })
    }
}
