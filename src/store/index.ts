import { configureStore } from '@reduxjs/toolkit'
import ReducerService from '../services/ReducerService'
import * as Region from '../models/region'
import * as Device from '../models/device'
import * as Permission from '../models/permission'
import * as SystemMessage from '../models/systemMessage'
import { IInventoryType, IInventoryTypeInput } from '../models/inventoryType'
import ApiService from '../services/ApiService'
import orgReducer from './slices/orgSlice'
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

export const inventoryTypeReducer = new ReducerService<
    IInventoryType,
    IInventoryTypeInput
>({
    name: 'inventoryType',
    service: new ApiService<IInventoryType, IInventoryTypeInput>({
        endpoint: 'admin/inventory-type/',
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
        org: orgReducer,
        device: deviceReducer.slice().reducer,
        deviceType: deviceTypeReducer.slice().reducer,
        region: regionReducer.slice().reducer,
        regionType: regionTypeReducer.slice().reducer,
        inventoryType: inventoryTypeReducer.slice().reducer,
        permission: permissionReducer.slice().reducer,
        permissionGroup: permissionGroupReducer.slice().reducer,
        permissionLevel: permissionLevelReducer.slice().reducer,
        systemMessage: systemMessageReducer.slice().reducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
