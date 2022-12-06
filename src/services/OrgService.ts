import { AxiosResponse } from 'axios'
import IOrganization from '../models/IOrganization'
import $api from '../http'

export default class OrgService {
    static async fetch(): Promise<AxiosResponse> {
        return $api.get<IOrganization[]>('admin/org/')
    }

    static async create(name: string): Promise<AxiosResponse<IOrganization>> {
        return $api.post<IOrganization>('admin/org/', { name })
    }
}
