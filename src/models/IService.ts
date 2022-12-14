import { AxiosResponse } from 'axios'

export default interface IService {
    fetch(): Promise<AxiosResponse>
    fetchWithOffset(offset: number): Promise<AxiosResponse>
    create(data: any): Promise<AxiosResponse>
}
