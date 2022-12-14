import { configureStore } from '@reduxjs/toolkit'
import ReducerService from '../services/ReducerService'
import * as Device from '../models/device'
import * as Organization from '../models/organization'
import * as Permission from '../models/permission'
import * as Region from '../models/region'
import * as SystemMessage from '../models/systemMessage'
import * as InventoryType from '../models/inventoryType'
import ApiService from '../services/ApiService'
import guestWorkerReducer from './slices/guestWorkerSlice'
import userReducer from './slices/userSlice'

export const deviceReducer = new ReducerService<
    Device.IDevice,
    Device.IDeviceInput
>({
    name: 'device',
    service: new ApiService<Device.IDevice, Device.IDeviceInput>({
        endpoint: 'admin/device/',
    }),
})

export const deviceTypeReducer = new ReducerService<
    Device.IDeviceType,
    Device.IDeviceTypeInput
>({
    name: 'deviceType',
    service: new ApiService<Device.IDeviceType, Device.IDeviceTypeInput>({
        endpoint: 'admin/device/type/',
    }),
})

export const inventoryTypeReducer = new ReducerService<
    InventoryType.IInventoryType,
    InventoryType.IInventoryTypeInput
>({
    name: 'inventoryType',
    service: new ApiService<InventoryType.IInventoryType, InventoryType.IInventoryTypeInput>({
        endpoint: 'admin/inventory-type/',
    }),
})

export const organizationReducer = new ReducerService<
    Organization.IOrganization,
    Organization.IOrganizationInput
>({
    name: 'organization',
    service: new ApiService<Organization.IOrganization, Organization.IOrganizationInput>({
        endpoint: 'admin/org/',
    }),
})

export const permissionReducer = new ReducerService<
    Permission.IPermission,
    Permission.IPermissionInput
>({
    name: 'permission',
    service: new ApiService<
        Permission.IPermission,
        Permission.IPermissionInput
    >({
        endpoint: 'admin/permission/',
    }),
})

export const permissionGroupReducer = new ReducerService<
    Permission.IPermissionGroup,
    Permission.IPermissionGroupInput
>({
    name: 'permissionGroup',
    service: new ApiService<
        Permission.IPermissionGroup,
        Permission.IPermissionGroupInput
    >({
        endpoint: 'admin/permission/group/',
    }),
})

export const permissionLevelReducer = new ReducerService<
    Permission.IPermissionLevel,
    Permission.IPermissionLevelInput
>({
    name: 'permissionLevel',
    service: new ApiService<
        Permission.IPermissionLevel,
        Permission.IPermissionLevelInput
    >({
        endpoint: 'admin/permission/level/',
    }),
})

export const regionReducer = new ReducerService<
    Region.IRegion,
    Region.IRegionInput
>({
    name: 'region',
    service: new ApiService<Region.IRegion, Region.IRegionInput>({
        endpoint: 'admin/region/',
    }),
})

export const regionTypeReducer = new ReducerService<
    Region.IRegionType,
    Region.IRegionTypeInput
>({
    name: 'regionType',
    service: new ApiService<Region.IRegionType, Region.IRegionTypeInput>({
        endpoint: 'admin/region/type/',
    }),
})

export const systemMessageReducer = new ReducerService<
    SystemMessage.ISystemMessage,
    SystemMessage.ISystemMessageInput
>({
    name: 'systemMessage',
    service: new ApiService<
        SystemMessage.ISystemMessage,
        SystemMessage.ISystemMessageInput
    >({
        endpoint: 'admin/system_message/',
    }),
})

export const store = configureStore({
    reducer: {
        user: userReducer,
        guestWorker: guestWorkerReducer,
        device: deviceReducer.slice().reducer,
        deviceType: deviceTypeReducer.slice().reducer,
        inventoryType: inventoryTypeReducer.slice().reducer,
        organization: organizationReducer.slice().reducer,
        permission: permissionReducer.slice().reducer,
        permissionGroup: permissionGroupReducer.slice().reducer,
        permissionLevel: permissionLevelReducer.slice().reducer,
        region: regionReducer.slice().reducer,
        regionType: regionTypeReducer.slice().reducer,
        systemMessage: systemMessageReducer.slice().reducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
