import { AxiosResponse } from 'axios'
import IRegion from '../models/IRegion'
import $api from '../http'
import IRegionInput from '../models/input/IRegionInput'

export default class RegionService {
    static async fetch(): Promise<AxiosResponse> {
        return $api.get<IRegion[]>('admin/region/')
    }

    static async create(region: IRegionInput): Promise<AxiosResponse<IRegion>> {
        return $api.post<IRegion>('admin/region/', { ...region })
    }
}