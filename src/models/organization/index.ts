export interface IOrganization {
    readonly id: number
    name: string
    prime: boolean
    prime_cost: number
    readonly create_at: string
    lc_id: number | null| undefined
    inn: string | null
    address: string | null
    phone: string | null
    email: string | null
    region: number | null| undefined
}

export interface IOrganizationInput {
    name: string
    inn: string | null
    address: string | null
    phone: string | null
    email: string | null
    region: number | null| undefined
}

export interface IOrganizationNested {
    readonly id: number
    from_date: string | null
    to_date: string | null
    file: string | null
    to_org: IOrganization
}

export interface IOrganizationNestedInput {
    from_date: string | null
    to_date: string | null
    file: string | null
    to_org: number
}
