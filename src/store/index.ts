import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import orgReducer from './slices/orgSlice';
import deviceReducer from './slices/deviceSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        org: orgReducer,
        device: deviceReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
