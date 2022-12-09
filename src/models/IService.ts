import { AxiosResponse } from 'axios'

export default interface IService {
    fetch(): Promise<AxiosResponse>
    create(data: any): Promise<AxiosResponse>
}
