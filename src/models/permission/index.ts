export interface IPermission {
    readonly id: number
    slug: string
    name: string
    level: number
}

export interface IPermissionGroup {
    readonly id: number
    name: string
    level: number
}

export interface IPermissionLevel {
    readonly id: number
    name: string
}

export interface IPermissionInput {
    slug: string
    name: string
    level: number
}

export interface IPermissionGroupInput {
    name: string
    level: number
}

export interface IPermissionLevelInput {
    name: string
}
