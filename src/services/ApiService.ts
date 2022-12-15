import { AxiosResponse } from 'axios'
import $api from '../http'
import IService from '../models/IService'

export interface ApiServiceProps {
    endpoint: string
}

export default class ApiService<Model, CreateInput> implements IService {
    endpoint: string

    constructor(props: ApiServiceProps) {
        this.endpoint = props.endpoint
    }

    async fetch(): Promise<AxiosResponse> {
        return $api.get<Model[]>(`${this.endpoint}?ordering=id`)
    }

    async fetchWithOffset(offset: number): Promise<AxiosResponse<any, any>> {
        return $api.get<Model[]>(`${this.endpoint}?offset=${offset}&ordering=id`)
    }

    async create(data: CreateInput): Promise<AxiosResponse<Model>> {
        return $api.post<Model>(this.endpoint, { ...data })
    }
}
