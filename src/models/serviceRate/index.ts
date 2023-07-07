import { IServiceRateKey } from '../serviceRateKey'

export interface IServiceRate {
    readonly id: number
    value: number
    not_limeted: boolean
    key: IServiceRateKey
}

export interface IServiceRateInput {
    value: number
    not_limeted: boolean
    key: string
    service?: string
}
