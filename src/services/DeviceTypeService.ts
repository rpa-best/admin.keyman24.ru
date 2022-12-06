import { AxiosResponse } from 'axios'
import IDeviceType from '../models/IDeviceType'
import $api from '../http'
import IDeviceTypeInput from '../models/input/IDeviceTypeInput'

export default class DeviceTypeService {
    static async fetch(): Promise<AxiosResponse> {
        return $api.get<IDeviceType[]>('admin/device/type/')
    }

    static async create(deviceType: IDeviceTypeInput): Promise<AxiosResponse<IDeviceType>> {
        return $api.post<IDeviceType>('admin/device/type/', { ...deviceType })
    }
}
