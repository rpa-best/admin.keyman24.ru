export interface ISubscription {
    readonly id: number
    readonly start_date: string
    readonly end_date: string
    readonly service: string
    readonly user: string | null
    readonly org: number | null | undefined
}

export interface ISubscriptionInput {
    start_date: string
    end_date: string
    service: string
    user: string | null
    org: number | null | undefined
}

export interface ISubscriptionNested {
    readonly id: number
    start_date: string
    end_date: string
    service: string
    user: string | null
}

// need to fix
export interface ISubscriptionNestedInput {
    start_date: string
    end_date: string
    service: string
    user: string | null
}