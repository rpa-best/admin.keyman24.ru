import { AxiosResponse } from 'axios'
import IQueryParams from './IQueryParams'
import ISubListQueryParams from './ISubListQueryParams'

export default interface IService {
    fetch(): Promise<AxiosResponse>
    fetchById(id: number): Promise<AxiosResponse>
    fetchWithParams(params: IQueryParams): Promise<AxiosResponse>
    fetchByName(name: string): Promise<AxiosResponse>
    create(data: any): Promise<AxiosResponse>
    put(data: any): Promise<AxiosResponse>
    patch(data: any): Promise<AxiosResponse>
    delete(id: number): Promise<AxiosResponse>
    head(): Promise<AxiosResponse>
    // nested entity
    fetchWithParamsNested(params: ISubListQueryParams): Promise<AxiosResponse>
    fetchByIdNested(id: number, params: ISubListQueryParams): Promise<AxiosResponse>
    createNested(data: any, params: ISubListQueryParams): Promise<AxiosResponse>
    putNested(data: any, params: ISubListQueryParams): Promise<AxiosResponse>
    patchNested(data: any, params: ISubListQueryParams): Promise<AxiosResponse>
    deleteNested(id: number, params: ISubListQueryParams): Promise<AxiosResponse>
}
