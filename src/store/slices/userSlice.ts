import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import AuthResponse from '../../models/AuthResponse'
import IAccountDetail from '../../models/IAccountDetail'
import IUser from '../../models/IUser'
import AccountService from '../../services/AccountService'

interface IUserState {
    user: IAccountDetail | null
    isAuth: boolean
    isLoading: boolean
    error: string | null
}

interface UserInput {
    username: string
    password: string
}

const initialState: IUserState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
}

export const auth = createAsyncThunk<
    AuthResponse,
    UserInput,
    { rejectValue: any }
>('user/auth', async (data: UserInput, thunkApi) => {
    try {
        const response = await AccountService.auth(data.username, data.password)

        if (response.status !== 201) {
            throw new Error('Failed to fetch user.')
        }

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const setAuth = createAsyncThunk<
    IAccountDetail,
    undefined,
    { rejectValue: any }
>('user/setAuth', async (_, thunkApi) => {
    try {
        const response = await AccountService.accountMe()

        if (response.status !== 200) {
            throw new Error('Failed  check auth.')
        }

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload.isAuth
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            // state.user = {
            //     username: action.payload.username,
            //     name: null,
            //     lastname: null,
            //     surname: null,
            //     phone: null,
            //     gender: null,
            //     birthday: null,
            // }
        },
        logout: () => {
            localStorage.removeItem('token')
            localStorage.removeItem('tokenRefresh')
            return initialState
        },
    },
    extraReducers: builder => {
        builder
            .addCase(auth.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(auth.fulfilled, (state, { payload }) => {
                // state.user
                localStorage.setItem('token', payload.access)
                localStorage.setItem('tokenRefresh', payload.refresh)
                state.isLoading = false
                state.isAuth = true
                state.error = null
            })
            .addCase(auth.rejected, (state, action) => {
                state.error = action.payload?.message
                state.isLoading = false
                state.isAuth = false
                console.log('userSlice error in fetchUser.rejected')
            })
            // set auth
            .addCase(setAuth.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(setAuth.fulfilled, (state, { payload }) => {
                state.user = payload
                state.isLoading = false
                state.isAuth = true
                state.error = null
            })
            .addCase(setAuth.rejected, (state, action) => {
                state.isLoading = false
                state.isAuth = false
                localStorage.removeItem('token')
                localStorage.removeItem('tokenRefresh')
                console.log('userSlice error in setAuth.rejected')
            })
    },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
