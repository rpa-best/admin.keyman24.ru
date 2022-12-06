import { AxiosResponse } from 'axios'
import IRegionType from '../models/IRegionType'
import $api from '../http'

export default class RegionTypeService {
    static async fetch(): Promise<AxiosResponse> {
        return $api.get<IRegionType[]>('admin/region/type/')
    }

    static async create(
        regionType: string,
    ): Promise<AxiosResponse<IRegionType>> {
        return $api.post<IRegionType>('admin/region/type/', { name: regionType })
    }
}
