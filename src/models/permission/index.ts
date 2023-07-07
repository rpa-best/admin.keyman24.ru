import { TypeEnum } from '../../helpers/modeHelper'

export interface IPermissionLevel {
    readonly id: number
    name: string
}

export interface IPermissionLevelInput {
    name: string
}

export interface IPermission {
    readonly id: number
    slug: string
    name: string
    level: IPermissionLevel
}

export interface IPermissionInput {
    slug: string
    name: string
    level: number
}

export interface IPermissionGroup {
    readonly id: number
    name: string
    level: number
}

export interface IPermissionGroupInput {
    name: string
    level: number
}

export interface IPermissionNested {
    readonly id: number
    permission: IPermission
    type: 'read' | 'create' | 'update' | 'delete'
}

// need to fix
export interface IPermissionNestedInput {
    type: TypeEnum
    permission: number
    group: number
}

export interface IPermissionUserNested {
    readonly id: number
    readonly user_id: string
    permission: IPermission
    type: TypeEnum
}

interface temp2 {
    type: TypeEnum
    permission: number
}

export type IPermissionUserNestedInput = temp2[]

export interface IPermissionGroupUserNested {
    readonly id: number
    username: string
    group: IPermissionGroup
}

interface temp {
    group: number
}

export type IPermissionGroupUserNestedInput = temp[]
