export interface IRegionType {
    readonly id: number,
    name: string,
}

export interface IRegionCreate {
    readonly id: number
    name: string
    status: boolean
    parent: number | null
    type: number | null
}

export interface IRegion {
    readonly id: number
    type: IRegionType
    parent: IRegionCreate
    name: string
    status: boolean
}

export interface IRegionInput {
    name: string
    status: boolean
    parent: number | undefined
    type: number
}

export interface IRegionTypeInput {
    name: string
}
