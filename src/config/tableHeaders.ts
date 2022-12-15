import { IRegion } from '../models/region'

export const device = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'тип',
        accessor: 'type',
    },
    {
        Header: 'описание',
        accessor: 'desc',
    },
]

export const deviceType = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'slug',
        accessor: 'slug',
    },
]
export const inventoryType = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'slug',
        accessor: 'slug',
    },
]

export const organization = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'дата создания',
        accessor: 'create_at',
    },
]

export const permission = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'slug',
        accessor: 'slug',
    },
    {
        Header: 'уровень',
        accessor: 'level',
    },
]

export const permissionGroup = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'уровень',
        accessor: 'level',
    },
]

export const permissionLevel = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
]

export const region = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'статус',
        accessor: (d: IRegion) => d.status.toString(),
    },
    {
        Header: 'имя типа',
        accessor: 'type.name',
    },
    {
        Header: 'id родителя',
        accessor: 'parent.id',
    },
]

export const regionType = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
]

export const systemMessage = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'slug',
        accessor: 'slug',
    },
    {
        Header: 'тип',
        accessor: 'type',
    },
    {
        Header: 'описание',
        accessor: 'desc',
    },
]

export default {
    device,
    deviceType,
    inventoryType,
    organization,
    permission,
    permissionGroup,
    permissionLevel,
    region,
    regionType,
    systemMessage,
}
