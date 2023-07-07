import { IDevice, IDeviceNested } from '../models/device'
import { IOrganizationNested } from '../models/organization'
import { IPermission, IPermissionGroup } from '../models/permission'
import { IRegion } from '../models/region'
import { IServiceRate } from '../models/serviceRate'

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
    // {
    //     Header: 'описание',
    //     accessor: 'desc',
    // },
]

export const deviceExport = {
    default: device,
    full: device,
}

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

export const deviceTypeExport = {
    default: deviceType,
    full: deviceType,
}

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

export const inventoryTypeFull = [
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
        Header: 'описание',
        accessor: 'desc',
    },
]

export const inventoryTypeExport = {
    default: inventoryType,
    full: inventoryTypeFull,
}

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
        Header: 'lc_id',
        accessor: 'lc_id',
    },
    {
        Header: 'ИНН',
        accessor: 'inn',
    },
]

export const organizationFull = [
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
    {
        Header: 'lc_id',
        accessor: 'lc_id',
    },
    {
        Header: 'ИНН',
        accessor: 'inn',
    },
    {
        Header: 'адрес',
        accessor: 'address',
    },
    {
        Header: 'телефон',
        accessor: 'phone',
    },
    {
        Header: 'email',
        accessor: 'email',
    },
    {
        Header: 'регион',
        accessor: 'region',
    },
]

export const organizationExport = {
    default: organization,
    full: organizationFull,
}

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
        // id: 'level.name',
        accessor: (d: IPermission) => d.level?.name,
    },
]

export const permissionExport = {
    default: permission,
    full: permission,
}

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
        accessor: (d: IPermissionGroup) => d.level,
    },
]

export const permissionGroupExport = {
    default: permissionGroup,
    full: permissionGroup,
}

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

export const permissionLevelExport = {
    default: permissionLevel,
    full: permissionLevel,
}

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
        Header: 'имя типа',
        accessor: (d: IRegion) => d.type?.name?.toString(),
    },
    {
        Header: 'родитель',
        accessor: (d: IRegion) => d.parent?.id?.toString(),
    },
]

export const regionExport = {
    default: region,
    full: region,
}

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

export const regionTypeExport = {
    default: regionType,
    full: regionType,
}

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

export const systemMessageExport = {
    default: systemMessage,
    full: systemMessage,
}

export const subscription = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'организация',
        accessor: 'org',
    },
    {
        Header: 'подписка',
        accessor: 'service',
    },
    {
        Header: 'дата начала',
        accessor: 'start_date',
    },
    {
        Header: 'дата конца',
        accessor: 'end_date',
    },
]

export const subscriptionExport = {
    default: subscription,
    full: subscription,
}

export const subscriptionService = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'цена',
        accessor: 'price',
    },
]

export const subscriptionServiceExport = {
    default: subscriptionService,
    full: subscriptionService,
}

export const subscriptionRequest = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'пользователь',
        accessor: 'user',
    },
    {
        Header: 'сервис',
        accessor: 'service',
    },
]

export const subscriptionRequestExport = {
    default: subscriptionRequest,
    full: subscriptionRequest,
}

export const user = [
    {
        Header: 'имя',
        accessor: 'fullname',
    },
    {
        Header: 'логин',
        accessor: 'username',
    },
]

export const userExport = {
    default: user,
    full: user,
}

export const worker = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'логин',
        accessor: 'user',
    },
    {
        Header: 'организация',
        accessor: 'org',
    },
]

export const workerExport = {
    default: worker,
    full: worker,
}

export const organizationNested = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'дата начала',
        accessor: 'from_date',
    },
    {
        Header: 'дата конца',
        accessor: 'to_date',
    },
    {
        Header: 'имя организации',
        // accessor: 'to_org',
        accessor: (d: IOrganizationNested) => d.to_org?.name,
    },
]

export const organizationNestedFull = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'дата начала',
        accessor: 'from_date',
    },
    {
        Header: 'дата конца',
        accessor: 'to_date',
        // accessor: (d: IOrganizationNested) => d.to_org?.id,
    },
]

export const organizationNestedExport = {
    default: organizationNested,
    full: organizationNestedFull,
}

export const deviceNested = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: (d: IDeviceNested) => d.device?.name?.toString(),
    },
    {
        Header: 'тип',
        accessor: (d: IDeviceNested) => d.device?.type?.name.toString(),
    },
    // {
    //     Header: 'описание',
    //     accessor: (d: IDeviceNested) => d.device?.desc?.toString(),
    // },
    // {
    //     Header: 'device_id',
    //     accessor: (d: IDeviceNested) => d.device?.id?.toString(),
    // },
]

export const deviceNestedExport = {
    default: deviceNested,
    full: deviceNested,
}

export const workingAreaType = [
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

export const workingAreaTypeExport = {
    default: workingAreaType,
    full: workingAreaType,
}

export const rateNestedService = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'значение',
        accessor: 'value',
    },
    {
        Header: 'статус',
        accessor: (d: IServiceRate) => (d.not_limeted ? 'Безлимит' : 'Ограничено'),
    },
    {
        Header: 'модель',
        accessor: (d: IServiceRate) => d.key.name,
    },
]

export const rateNestedServiceExport = {
    default: rateNestedService,
    full: rateNestedService,
}

export const serviceRateKey = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'имя',
        accessor: 'name',
    },
    {
        Header: 'имя модели',
        accessor: 'model_name',
    },
]

export const serviceRateKeyExport = {
    default: serviceRateKey,
    full: serviceRateKey,
}

export default {
    deviceExport,
    deviceTypeExport,
    inventoryTypeExport,
    organizationExport,
    permissionExport,
    permissionGroupExport,
    permissionLevelExport,
    regionExport,
    regionTypeExport,
    subscriptionExport,
    subscriptionServiceExport,
    subscriptionRequestExport,
    systemMessageExport,
    workerExport,
    userExport,
    organizationNestedExport,
    deviceNestedExport,
    workingAreaTypeExport,
    rateNestedServiceExport,
    serviceRateKeyExport,
}
