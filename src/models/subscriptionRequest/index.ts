export interface ISubscriptionRequest {
    readonly id: number
    phone: string
    desc: string
    readonly user: string
    service: string
    message: number | null | undefined
}

export interface ISubscriptionRequestInput {
    start_date: string
    end_date: string
    org: number
    worker: number
    phone: string
    desc: string
    service: string
    message: number | null | undefined
}
