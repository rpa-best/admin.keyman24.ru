import { AxiosResponse } from 'axios'
import $api from '../https'
import AuthResponse from '../models/AuthResponse'

export default class AccountService {
    static async login(
        username: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('account/auth/?login_params=username_password', { username, password })
    }

    static async accountMe(): Promise<AxiosResponse> {
        return $api.get('account/me/')
    }
}