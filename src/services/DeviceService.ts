import { AxiosResponse } from 'axios'
import IDevice from '../models/IDevice'
import $api from '../http'
import IDeviceInput from '../models/input/IDeviceInput'

export default class DeviceService {
    static async fetch(): Promise<AxiosResponse> {
        return $api.get<IDevice[]>('admin/device/')
    }

    static async create(device: IDeviceInput): Promise<AxiosResponse<IDevice>> {
        return $api.post<IDevice>('admin/device/', { ...device })
    }
}
