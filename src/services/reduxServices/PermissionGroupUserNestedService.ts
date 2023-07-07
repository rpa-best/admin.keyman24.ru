import { AxiosResponse } from 'axios'
import {
    IPermissionGroupUserNested,
    IPermissionGroupUserNestedInput,
} from '../../models/permission'
import $api from '../../http'

export interface IParams {
    offset?: number
    orderBy?: string
    username: string
}

export default class PermissionGroupUserNestedService {
    static async fetchWithParamsNested(
        params: IParams,
    ): Promise<AxiosResponse> {
        const checkOffset = params.offset ?? 0
        const checkOrderBy = params.orderBy ?? 'id'

        return $api.get<IPermissionGroupUserNested[]>(
            `admin/permission/group/user/${params.username}/?offset=${checkOffset}&ordering=${checkOrderBy}`,
        )
    }

    static async fetchByIdNested(
        id: number,
        params: IParams,
    ): Promise<AxiosResponse> {
        return $api.get<IPermissionGroupUserNested>(
            `admin/permission/group/user/${params.username}/${id}/`,
        )
    }

    static async createNested(
        data: IPermissionGroupUserNestedInput,
        params: IParams,
    ): Promise<AxiosResponse<IPermissionGroupUserNested>> {
        return $api.post<IPermissionGroupUserNested>(
            `admin/permission/group/user/${params.username}/`,
            data,
        )
    }

    static async deleteNested(
        id: number,
        params: IParams,
    ): Promise<AxiosResponse> {
        return $api.delete(
            `admin/permission/group/user/${params.username}/${id}/`,
        )
    }
}
