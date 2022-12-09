export interface IInventoryType {
    readonly id: number
    slug: string
    name: string
    desc: string | null
}

export interface IInventoryTypeInput {
    slug: string
    name: string
    desc: string | null
}
