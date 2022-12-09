export interface IDevice {
    id: number
    name: string
    desc: string | null
    type: string
}

export interface IDeviceType {
    id: number
    slug: string
    name: string
}

export interface IDeviceInput {
    name: string
    type: string
}

export interface IDeviceTypeInput {
    slug: string
    name: string
}
