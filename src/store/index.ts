import { configureStore } from '@reduxjs/toolkit'
import ReducerService from '../services/ReducerService'
import * as Device from '../models/device'
import * as Organization from '../models/organization'
import * as Permission from '../models/permission'
import * as Region from '../models/region'
import * as Subscription from '../models/subscription'
import * as SubscriptionService from '../models/subscriptionService'
import * as SubscriptionRequest from '../models/subscriptionRequest'
import * as SystemMessage from '../models/systemMessage'
import * as InventoryType from '../models/inventoryType'
import * as WorkingAreaType from '../models/workingAreaType'
import * as User from '../models/user'
import * as Worker from '../models/worker'
import * as ServiceRate from '../models/serviceRate'
import * as ServiceRateKey from '../models/serviceRateKey'
import ApiService from '../services/ApiService'
import guestWorkerReducer from './slices/guestWorkerSlice'
import accountReducer from './slices/userSlice'
import permissionGroupUserNestedReducer from './slices/permissionGroupUserNestedSlice'
import permissionUserNestedReducer from './slices/permissionUserNestedSlice'

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
    service: new ApiService<
        InventoryType.IInventoryType,
        InventoryType.IInventoryTypeInput
    >({
        endpoint: 'admin/inventory-type/',
    }),
})

export const organizationReducer = new ReducerService<
    Organization.IOrganization,
    Organization.IOrganizationInput
>({
    name: 'organization',
    service: new ApiService<
        Organization.IOrganization,
        Organization.IOrganizationInput
    >({
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

export const permissionNestedReducer = new ReducerService<
    Permission.IPermissionNested,
    Permission.IPermissionNestedInput
>({
    name: 'permissionNested',
    service: new ApiService<
        Permission.IPermissionNested,
        Permission.IPermissionNestedInput
    >({
        endpoint: 'admin/permission/group/',
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

export const subscriptionReducer = new ReducerService<
    Subscription.ISubscription,
    Subscription.ISubscriptionInput
>({
    name: 'subscription',
    service: new ApiService<
        Subscription.ISubscription,
        Subscription.ISubscriptionInput
    >({
        endpoint: 'admin/subscription/',
    }),
})

export const subscriptionServiceReducer = new ReducerService<
    SubscriptionService.ISubscriptionService,
    SubscriptionService.ISubscriptionServiceInput
>({
    name: 'subscriptionService',
    service: new ApiService<
        SubscriptionService.ISubscriptionService,
        SubscriptionService.ISubscriptionServiceInput
    >({
        endpoint: 'admin/subscription/service/',
    }),
})

export const subscriptionRequestReducer = new ReducerService <
    SubscriptionRequest.ISubscriptionRequest,
    SubscriptionRequest.ISubscriptionRequestInput
>({
    name: 'subscriptionRequest',
    service: new ApiService<
        SubscriptionRequest.ISubscriptionRequest,
        SubscriptionRequest.ISubscriptionRequestInput
    >({
        endpoint: 'admin/subscription/request/',
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

export const userReducer = new ReducerService<
    User.IUser,
    User.IUserInput
>({
    name: 'user',
    service: new ApiService<User.IUser, User.IUserInput>({
        endpoint: 'admin/user/',
    }),
})

export const workerReducer = new ReducerService<
    Worker.IWorker,
    Worker.IWorkerInput
>({
    name: 'worker',
    service: new ApiService<Worker.IWorker, Worker.IWorkerInput>({
        endpoint: 'admin/worker/',
    }),
})

export const orgNestedOrgReducer = new ReducerService<
    Organization.IOrganizationNested,
    Organization.IOrganizationNestedInput
>({
    name: 'organizationNestedOrg',
    service: new ApiService<
        Organization.IOrganizationNested,
        Organization.IOrganizationNestedInput
    >({
        endpoint: 'admin/org/',
    }),
})

export const deviceNestedOrgReducer = new ReducerService<
    Device.IDeviceNested,
    Device.IDeviceNestedInput
>({
    name: 'deviceNestedOrg',
    service: new ApiService<Device.IDeviceNested, Device.IDeviceNestedInput>({
        endpoint: 'admin/org/',
    }),
})

export const subscriptionNestedOrgReducer = new ReducerService<
    Subscription.ISubscriptionNested,
    Subscription.ISubscriptionNestedInput
>({
    name: 'subscriptionNestedOrg',
    service: new ApiService<
        Subscription.ISubscriptionNested,
        Subscription.ISubscriptionNestedInput
    >({
        endpoint: 'admin/org/',
    }),
})

export const workingAreaTypeReducer = new ReducerService<
    WorkingAreaType.IWorkingAreaType,
    WorkingAreaType.IWorkingAreaTypeInput
>({
    name: 'workingAreaType',
    service: new ApiService<
        WorkingAreaType.IWorkingAreaType,
        WorkingAreaType.IWorkingAreaTypeInput
    >({
        endpoint: 'admin/working-area-type/',
    }),
})

export const rateNestedServiceReducer = new ReducerService<
    ServiceRate.IServiceRate,
    ServiceRate.IServiceRateInput
>({
    name: 'rateNestedService',
    service: new ApiService<
        ServiceRate.IServiceRate,
        ServiceRate.IServiceRateInput
    >({
        endpoint: 'admin/subscription/service/',
    }),
})

export const serviceRateKeyReducer = new ReducerService<
    ServiceRateKey.IServiceRateKey,
    ServiceRateKey.IServiceRateKeyInput
>({
    name: 'serviceRateKey',
    service: new ApiService<
        ServiceRateKey.IServiceRateKey,
        ServiceRateKey.IServiceRateKeyInput
    >({
        endpoint: 'admin/subscription/service-rate-key/',
    }),
})

export const store = configureStore({
    reducer: {
        account: accountReducer,
        guestWorker: guestWorkerReducer,
        permissionGroupUserNested: permissionGroupUserNestedReducer,
        permissionUserNested: permissionUserNestedReducer,
        device: deviceReducer.slice().reducer,
        deviceType: deviceTypeReducer.slice().reducer,
        inventoryType: inventoryTypeReducer.slice().reducer,
        organization: organizationReducer.slice().reducer,
        permission: permissionReducer.slice().reducer,
        permissionGroup: permissionGroupReducer.slice().reducer,
        permissionLevel: permissionLevelReducer.slice().reducer,
        permissionNestedPermissionGroup: permissionNestedReducer.slice().reducer,
        region: regionReducer.slice().reducer,
        regionType: regionTypeReducer.slice().reducer,
        subscription: subscriptionReducer.slice().reducer,
        subscriptionService: subscriptionServiceReducer.slice().reducer,
        subscriptionRequest: subscriptionRequestReducer.slice().reducer,
        systemMessage: systemMessageReducer.slice().reducer,
        user: userReducer.slice().reducer,
        worker: workerReducer.slice().reducer,
        orgNestedOrg: orgNestedOrgReducer.slice().reducer,
        deviceNestedOrg: deviceNestedOrgReducer.slice().reducer,
        subscriptionNestedOrg: subscriptionNestedOrgReducer.slice().reducer,
        workingAreaType: workingAreaTypeReducer.slice().reducer,
        rateNestedService: rateNestedServiceReducer.slice().reducer,
        serviceRateKey: serviceRateKeyReducer.slice().reducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
