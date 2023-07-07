import { AxiosResponse } from 'axios'
import $api from '../http'
import IQueryParams from '../models/IQueryParams'
import IService from '../models/IService'
import ISubListQueryParams from '../models/ISubListQueryParams'

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

    async fetchById(id: number): Promise<AxiosResponse<Model>> {
        return $api.get<Model>(`${this.endpoint}${id}/`)
    }

    async fetchWithParams(params: IQueryParams): Promise<AxiosResponse> {
        return params.filter === undefined
            ? $api.get<Model[]>(
                  `${this.endpoint}?offset=${params.offset}&ordering=${params.orderBy}`,
              )
            : $api.get<Model[]>(
                  `${this.endpoint}?offset=${params.offset}&ordering=${params.orderBy}&${params.filter}`,
              )
    }

    async fetchByName(name: string): Promise<AxiosResponse> {
        return $api.get<Model[]>(`${this.endpoint}?NAME=${name}`)
    }

    async create(data: CreateInput): Promise<AxiosResponse<Model>> {
        return $api.post<Model>(this.endpoint, { ...data })
    }

    async put(data: any): Promise<AxiosResponse<Model>> {
        return $api.put<Model>(`${this.endpoint}${data.id}/`, { ...data })
    }

    async patch(data: any): Promise<AxiosResponse<Model>> {
        return $api.patch<Model>(`${this.endpoint}${data.id}/`, { ...data })
    }

    // async patch(data: any): Promise<AxiosResponse<Model>> {
    //     return $api.put<Model>(`${this.endpoint}${data.id}/`, { ...data })
    // }

    async delete(id: number): Promise<AxiosResponse> {
        return $api.delete(`${this.endpoint}${id}/`)
    }

    async head(): Promise<AxiosResponse> {
        return $api.head(`${this.endpoint}`)
    }

    // nested entity

    async fetchWithParamsNested(
        params: ISubListQueryParams,
    ): Promise<AxiosResponse> {
        return $api.get<Model[]>(
            `${this.endpoint}${params.id}/${params.endpoint}/?offset=${params.offset}&ordering=${params.orderBy}`,
        )
    }

    async fetchByIdNested(
        id: number,
        params: ISubListQueryParams,
    ): Promise<AxiosResponse> {
        return $api.get<Model>(
            `${this.endpoint}${params.id}/${params.endpoint}/${id}/`,
        )
    }

    async createNested(
        data: CreateInput,
        params: ISubListQueryParams,
    ): Promise<AxiosResponse<Model>> {
        return $api.post<Model>(
            `${this.endpoint}${params.id}/${params.endpoint}/`,
            { ...data },
        )
    }

    async putNested(
        data: any,
        params: ISubListQueryParams,
    ): Promise<AxiosResponse<Model>> {
        return $api.put<Model>(
            `${this.endpoint}${params.id}/${params.endpoint}/${data.id}/`,
            { ...data },
        )
    }

    async patchNested(
        data: any,
        params: ISubListQueryParams,
    ): Promise<AxiosResponse<Model>> {
        return $api.patch<Model>(
            `${this.endpoint}${params.id}/${params.endpoint}/${data.id}/`,
            { ...data },
        )
    }

    async deleteNested(
        id: number,
        params: ISubListQueryParams,
    ): Promise<AxiosResponse> {
        return $api.delete(
            `${this.endpoint}${params.id}/${params.endpoint}/${id}/`,
        )
    }
}
