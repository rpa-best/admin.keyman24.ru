export interface IDevice {
    id: number
    name: string
    desc: string | null
    type: string
    sim_value: number
}

export interface IDeviceInput {
    name: string
    type: string
}

export interface IDeviceType {
    id: number
    slug: string
    name: string
}

export interface IDeviceTypeInput {
    slug: string
    name: string
}

export interface IDeviceNested {
    readonly id: number
    device: {
        id: number
        name: string
        desc: string | null
        type: IDeviceType
    }
}

export interface IDeviceNestedInput {
    device: number
}
