/* eslint-disable indent */
import { TableState } from 'react-table'
import Headers from '../config/tableHeaders'
import { useAppSelector } from '../hooks/useReduxHooks'
import {
    deviceNestedOrgReducer,
    deviceReducer,
    deviceTypeReducer,
    inventoryTypeReducer,
    organizationReducer,
    orgNestedOrgReducer,
    permissionGroupReducer,
    permissionLevelReducer,
    permissionNestedReducer,
    permissionReducer,
    rateNestedServiceReducer,
    regionReducer,
    regionTypeReducer,
    serviceRateKeyReducer,
    subscriptionNestedOrgReducer,
    subscriptionReducer,
    subscriptionRequestReducer,
    subscriptionServiceReducer,
    systemMessageReducer,
    userReducer,
    workerReducer,
    workingAreaTypeReducer,
} from '../store'

interface IEntity {
    reducer: any
    callSelector: any
    columns: any
    title: string | null
    endpointOriginal?: string
    endpointNested?: string
    showButtons: {
        read?: boolean
        add?: boolean
        edit?: boolean
        delete?: boolean
        request?: boolean
    }
    tableInitialState?: Partial<TableState<{}>>
}

const entity = {
    device: {
        reducer: deviceReducer,
        callSelector: () => useAppSelector(state => state.device),
        columns: Headers.deviceExport,
        title: 'Устройство',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    'device-type': {
        reducer: deviceTypeReducer,
        callSelector: () => useAppSelector(state => state.deviceType),
        columns: Headers.deviceTypeExport,
        title: 'Тип устройства',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    'inventory-type': {
        reducer: inventoryTypeReducer,
        callSelector: () => useAppSelector(state => state.inventoryType),
        columns: Headers.inventoryTypeExport,
        title: 'Тип инвентаря',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    org: {
        reducer: organizationReducer,
        callSelector: () => useAppSelector(state => state.organization),
        columns: Headers.organizationExport,
        title: 'Организация',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    permission: {
        reducer: permissionReducer,
        callSelector: () => useAppSelector(state => state.permission),
        columns: Headers.permissionExport,
        title: 'Право доступа',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    'permission-group': {
        reducer: permissionGroupReducer,
        callSelector: () => useAppSelector(state => state.permissionGroup),
        columns: Headers.permissionGroupExport,
        title: 'Группа права доступа',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    'permission-level': {
        reducer: permissionLevelReducer,
        callSelector: () => useAppSelector(state => state.permissionLevel),
        columns: Headers.permissionLevelExport,
        title: 'Уровень права доступа',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    'permission-nested-permission-group': {
        reducer: permissionNestedReducer,
        callSelector: () =>
            useAppSelector(state => state.permissionNestedPermissionGroup),
        columns: null,
        title: 'Вложенные права доступа',
        showButtons: {},
    },
    region: {
        reducer: regionReducer,
        callSelector: () => useAppSelector(state => state.region),
        columns: Headers.regionExport,
        title: 'Регион',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    'region-type': {
        reducer: regionTypeReducer,
        callSelector: () => useAppSelector(state => state.regionType),
        columns: Headers.regionTypeExport,
        title: 'Тип региона',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    subscription: {
        reducer: subscriptionReducer,
        callSelector: () => useAppSelector(state => state.subscription),
        columns: Headers.subscriptionExport,
        title: 'Подписки',
        showButtons: {
            add: true,
        },
    },
    'subscription-service': {
        reducer: subscriptionServiceReducer,
        callSelector: () => useAppSelector(state => state.subscriptionService),
        columns: Headers.subscriptionServiceExport,
        title: 'Подписки Сервис',
        showButtons: {
            add: true,
        },
    },
    'subscription-request': {
        reducer: subscriptionRequestReducer,
        callSelector: () => useAppSelector(state => state.subscriptionRequest),
        columns: Headers.subscriptionRequestExport,
        title: 'Запросы на подписку',
        showButtons: {
            request: true,
        },
    },
    'system-message': {
        reducer: systemMessageReducer,
        callSelector: () => useAppSelector(state => state.systemMessage),
        columns: Headers.systemMessageExport,
        title: 'Системные сообщения',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    user: {
        reducer: userReducer,
        callSelector: () => useAppSelector(state => state.user),
        columns: Headers.userExport,
        title: 'Пользователи',
        showButtons: {
            edit: true,
        },
    },
    worker: {
        reducer: workerReducer,
        callSelector: () => useAppSelector(state => state.worker),
        columns: Headers.workerExport,
        title: 'Работники',
        showButtons: {
            add: true,
            edit: true,
            delete: true,
        },
    },
    'org-nested-org': {
        reducer: orgNestedOrgReducer,
        callSelector: () => useAppSelector(state => state.orgNestedOrg),
        columns: Headers.organizationNestedExport,
        title: 'Вложенная организация',
        endpointOriginal: 'org',
        endpointNested: 'org',
        showButtons: {
            add: true,
            delete: true,
        },
    },
    'device-nested-org': {
        reducer: deviceNestedOrgReducer,
        callSelector: () => useAppSelector(state => state.deviceNestedOrg),
        columns: Headers.deviceNestedExport,
        title: 'Вложенное устройство',
        endpointOriginal: 'org',
        endpointNested: 'device',
        showButtons: {
            add: true,
            delete: true,
        },
    },
    'subscription-nested-org': {
        reducer: subscriptionNestedOrgReducer,
        callSelector: () =>
            useAppSelector(state => state.subscriptionNestedOrg),
        columns: Headers.subscriptionExport,
        title: 'Вложенная подписка',
        endpointOriginal: 'org',
        endpointNested: 'subscription',
        showButtons: {},
    },
}

const getEntity = (data?: string): IEntity => {
    switch (data) {
        case 'device':
            return {
                reducer: deviceReducer,
                callSelector: () => useAppSelector(state => state.device),
                columns: Headers.deviceExport,
                title: 'Устройство',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'device-type':
            return {
                reducer: deviceTypeReducer,
                callSelector: () => useAppSelector(state => state.deviceType),
                columns: Headers.deviceTypeExport,
                title: 'Тип устройства',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'inventory-type':
            return {
                reducer: inventoryTypeReducer,
                callSelector: () =>
                    useAppSelector(state => state.inventoryType),
                columns: Headers.inventoryTypeExport,
                title: 'Тип инвентаря',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'working-area-type':
            return {
                reducer: workingAreaTypeReducer,
                callSelector: () =>
                    useAppSelector(state => state.workingAreaType),
                columns: Headers.workingAreaTypeExport,
                title: 'Тип рабочего места',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'org':
            return {
                reducer: organizationReducer,
                callSelector: () => useAppSelector(state => state.organization),
                columns: Headers.organizationExport,
                title: 'Организация',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'permission':
            return {
                reducer: permissionReducer,
                callSelector: () => useAppSelector(state => state.permission),
                columns: Headers.permissionExport,
                title: 'Право доступа',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'permission-group':
            return {
                reducer: permissionGroupReducer,
                callSelector: () =>
                    useAppSelector(state => state.permissionGroup),
                columns: Headers.permissionGroupExport,
                title: 'Группа права доступа',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'permission-level':
            return {
                reducer: permissionLevelReducer,
                callSelector: () =>
                    useAppSelector(state => state.permissionLevel),
                columns: Headers.permissionLevelExport,
                title: 'Уровень права доступа',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'permission-nested-permission-group':
            return {
                reducer: permissionNestedReducer,
                callSelector: () =>
                    useAppSelector(
                        state => state.permissionNestedPermissionGroup,
                    ),
                columns: null,
                title: 'Вложенные права доступа',
                showButtons: {},
            }
        case 'region':
            return {
                reducer: regionReducer,
                callSelector: () => useAppSelector(state => state.region),
                columns: Headers.regionExport,
                title: 'Регион',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
                tableInitialState: { hiddenColumns: ['id'] },
            }
        case 'region-type':
            return {
                reducer: regionTypeReducer,
                callSelector: () => useAppSelector(state => state.regionType),
                columns: Headers.regionTypeExport,
                title: 'Тип региона',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'subscription':
            return {
                reducer: subscriptionReducer,
                callSelector: () => useAppSelector(state => state.subscription),
                columns: Headers.subscriptionExport,
                title: 'Подписки',
                showButtons: {
                    add: true,
                },
            }
        case 'subscription-service':
            return {
                reducer: subscriptionServiceReducer,
                callSelector: () =>
                    useAppSelector(state => state.subscriptionService),
                columns: Headers.subscriptionServiceExport,
                title: 'Подписки Сервис',
                showButtons: {
                    add: true,
                    edit: true,
                },
            }
        case 'subscription-request':
            return {
                reducer: subscriptionRequestReducer,
                callSelector: () =>
                    useAppSelector(state => state.subscriptionRequest),
                columns: Headers.subscriptionRequestExport,
                title: 'Запросы на подписку',
                showButtons: {
                    request: true,
                    delete: true,
                },
            }
        case 'system-message':
            return {
                reducer: systemMessageReducer,
                callSelector: () =>
                    useAppSelector(state => state.systemMessage),
                columns: Headers.systemMessageExport,
                title: 'Системные сообщения',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'user':
            return {
                reducer: userReducer,
                callSelector: () => useAppSelector(state => state.user),
                columns: Headers.userExport,
                title: 'Пользователи',
                showButtons: {
                    edit: true,
                    add: true,
                },
            }
        case 'worker':
            return {
                reducer: workerReducer,
                callSelector: () => useAppSelector(state => state.worker),
                columns: Headers.workerExport,
                title: 'Работники',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'org-nested-org':
            return {
                reducer: orgNestedOrgReducer,
                callSelector: () => useAppSelector(state => state.orgNestedOrg),
                columns: Headers.organizationNestedExport,
                title: 'Вложенная организация',
                endpointOriginal: 'org',
                endpointNested: 'org',
                showButtons: {
                    add: true,
                    delete: true,
                },
            }
        case 'device-nested-org':
            return {
                reducer: deviceNestedOrgReducer,
                callSelector: () =>
                    useAppSelector(state => state.deviceNestedOrg),
                columns: Headers.deviceNestedExport,
                title: 'Вложенное устройство',
                endpointOriginal: 'org',
                endpointNested: 'device',
                showButtons: {
                    add: true,
                    delete: true,
                },
            }
        case 'subscription-nested-org':
            return {
                reducer: subscriptionNestedOrgReducer,
                callSelector: () =>
                    useAppSelector(state => state.subscriptionNestedOrg),
                columns: Headers.subscriptionExport,
                title: 'Вложенная подписка',
                endpointOriginal: 'org',
                endpointNested: 'subscription',
                showButtons: {},
            }
        case 'rate-nested-service':
            return {
                reducer: rateNestedServiceReducer,
                callSelector: () =>
                    useAppSelector(state => state.rateNestedService),
                columns: Headers.rateNestedServiceExport,
                title: 'Тариф',
                endpointOriginal: 'subscription-service',
                endpointNested: 'rate',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        case 'service-rate-key':
            return {
                reducer: serviceRateKeyReducer,
                callSelector: () =>
                    useAppSelector(state => state.serviceRateKey),
                columns: Headers.serviceRateKeyExport,
                title: 'Тип тарифа',
                showButtons: {
                    add: true,
                    edit: true,
                    delete: true,
                },
            }
        default:
            return {
                reducer: null,
                callSelector: () => {},
                columns: null,
                title: null,
                showButtons: {},
            }
    }
}

export default getEntity
