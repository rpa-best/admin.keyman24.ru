import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import AuthResponse from '../../models/AuthResponse'
import IUser from '../../models/IUser'

const { API_URL } = process.env

interface IUserState {
    user: IUser | null
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

// export const fetchUser = createAsyncThunk<
//     AuthResponse,
//     UserInput,
//     { rejectValue: any }
// >('user/fetchUser', async (data: UserInput, thunkApi) => {
//     try {
//         const response = await axios.post(
//             `${API_URL}account/auth/?login_params=username_password`,
//             {
//                 username: data.username,
//                 password: data.password,
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             },
//         )
//         if (response.status !== 201) {
//             throw new Error('Failed to fetch user.')
//         }

//         return response.data
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })

export const login = createAsyncThunk<
    AuthResponse,
    UserInput,
    { rejectValue: any }
>('user/login', async (data: UserInput, thunkApi) => {
    try {
        // const response = await AuthService.login(data.username, data.password)

        const response = await axios.post(
            `${API_URL}account/auth/?login_params=username_password`,
            {
                username: data.username,
                password: data.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (response.status !== 201) {
            throw new Error('Failed to fetch user.')
        }

        localStorage.setItem('token', response.data.access)
        localStorage.setItem('tokenRefresh', response.data.refresh)

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const checkAuth = createAsyncThunk<
    AuthResponse,
    undefined,
    { rejectValue: any }
>('user/checkAuth', async (_, thunkApi) => {
    try {
        const access = localStorage.getItem('token')
        const response = await axios.post<AuthResponse>(
            `${API_URL}account/refresh-token/`,
            {
                refresh: localStorage.getItem('tokenRefresh'),
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                },
            },
        )

        if (response.status !== 200) {
            throw new Error('Failed  check auth.')
        }

        localStorage.setItem('token', response.data.access)
        localStorage.setItem('tokenRefresh', response.data.refresh)

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
            state.user = {
                username: action.payload.username,
                name: null,
                surname: null,
                lastname: null,
            }
        },
        logout: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                // state.user
                state.isLoading = false
                state.isAuth = true
                state.error = null
                console.log('isAuth = true')
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload?.message
                state.isLoading = false
                state.isAuth = false
                console.log('userSlice error in fetchUser.rejected')
            })
            // check auth
            .addCase(checkAuth.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                // state.user
                state.isLoading = false
                state.isAuth = true
                state.error = null
            })
            .addCase(checkAuth.rejected, (state, action) => {
                // state.error = action.payload?.message
                state.isLoading = false
                state.isAuth = false
                console.log('userSlice error in checkAuth.rejected')
            })
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
