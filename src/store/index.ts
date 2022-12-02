import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import orgReducer from './slices/orgSlice';
import deviceReducer from './slices/deviceSlice';
import deviceTypeReducer from './slices/deviceTypeSlice';
// import accountReducer from './slices/account/accountSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        org: orgReducer,
        device: deviceReducer,
        deviceType: deviceTypeReducer,
        // account: accountReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
