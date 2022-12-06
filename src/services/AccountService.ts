import { AxiosResponse } from 'axios'
import $api from '../http'
import AuthResponse from '../models/AuthResponse'
import IAccountDetail from '../models/IAccountDetail'

export default class AccountService {
    static async auth(
        username: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('account/auth/?login_params=username_password', { username, password })
    }

    static async accountMe(): Promise<AxiosResponse<IAccountDetail>> {
        return $api.get<IAccountDetail>('account/me/')
    }
}
