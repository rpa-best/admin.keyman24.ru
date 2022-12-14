export interface IOrganization {
    id: number
    name: string
    create_at: string
    lc_id: number | null | undefined
    inn: string | null
    adsress: string | null
    phone: string | null
    email: string | null
    region: number | null | undefined
    devices: [number | null | undefined]
}

export interface IOrganizationInput {
    name: string
}
