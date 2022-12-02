import { AxiosResponse } from 'axios'
import IDevice from '../models/IDevice'
import $api from '../https'

export default class DeviceService {
    static async fetch(): Promise<AxiosResponse> {
        return $api.get<IDevice[]>('admin/device/')
    }

    static async create(name: string, type: string): Promise<AxiosResponse> {
        return $api.post<IDevice>('admin/device/', { name, type })
    }
}
