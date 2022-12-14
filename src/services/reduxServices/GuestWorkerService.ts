import { AxiosResponse } from 'axios'
import { IGuestWorker, IGuestWorkerInput } from '../../models/guestWorker'
import $api from '../../http'

export default class GuestWorkerService {
    static async fetch(): Promise<AxiosResponse> {
        return $api.get<IGuestWorker[]>('admin/guestworkers/orgs/')
    }

    static async fetchByName(name: string): Promise<AxiosResponse> {
        return $api.get<IGuestWorker[]>(`admin/guestworkers/orgs/?NAME=${name}`)
    }

    static async create(id: number[]): Promise<AxiosResponse<IGuestWorker>> {
        return $api.post<IGuestWorker>('admin/guestworkers/orgs/upload/', id)
    }
}
