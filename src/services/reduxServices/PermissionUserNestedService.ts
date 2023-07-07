import { AxiosResponse } from 'axios'
import {
    IPermissionUserNested,
    IPermissionUserNestedInput,
} from '../../models/permission'
import $api from '../../http'

export interface IParams {
    offset?: number
    orderBy?: string
    username: string
}

export default class PermissionUserNestedService {
    static async fetchWithParamsNested(
        params: IParams,
    ): Promise<AxiosResponse> {
        const checkOffset = params.offset ?? 0
        const checkOrderBy = params.orderBy ?? 'id'

        return $api.get<IPermissionUserNested[]>(
            `admin/permission/user/${params.username}/?offset=${checkOffset}&ordering=${checkOrderBy}`,
        )
    }

    static async fetchByIdNested(
        id: number,
        params: IParams,
    ): Promise<AxiosResponse> {
        return $api.get<IPermissionUserNested>(
            `admin/permission/user/${params.username}/${id}/`,
        )
    }

    static async createNested(
        data: IPermissionUserNestedInput,
        params: IParams,
    ): Promise<AxiosResponse<IPermissionUserNested>> {
        return $api.post<IPermissionUserNested>(
            `admin/permission/user/${params.username}/`,
            data,
        )
    }

    static async deleteNested(
        id: number,
        params: IParams,
    ): Promise<AxiosResponse> {
        return $api.delete(
            `admin/permission/user/${params.username}/${id}/`,
        )
    }
}
