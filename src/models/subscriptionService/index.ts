export interface ISubscriptionService {
    readonly id: number
    slug: string
    name: string
    desc: string | null
    image: string
    price: number
}

export interface ISubscriptionServiceInput {
    slug: string
    name: string
    desc: string | null
    image: string
    price: number
}
