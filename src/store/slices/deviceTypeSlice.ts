import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import IDeviceType from '../../models/IDeviceType'

const { API_URL } = process.env

interface IDeviceTypeState {
    types: IDeviceType[]
    isLoading: boolean
    error: string | null
}

interface IDeviceTypeInput {
    slug: string
    name: string
}

const initialState: IDeviceTypeState = {
    types: [],
    isLoading: false,
    error: null,
}

export const fetchDeviceType = createAsyncThunk<
    IDeviceType[],
    undefined,
    { rejectValue: any }
>('deviceType/fetchDeviceType', async (_, thunkApi) => {
    try {
        const response = await axios.get(`${API_URL}admin/device/type/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (response.status !== 200) {
            throw new Error('Failed to fetch deviceType.')
        }

        return response.data.results
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createDeviceType = createAsyncThunk<
    IDeviceType,
    IDeviceTypeInput,
    { rejectValue: any }
>('deviceType/createDeviceType', async (data: IDeviceTypeInput, thunkApi) => {
    try {
        const response = await axios.post(
            `${API_URL}admin/device/type/`,
            {
                name: data.name,
                slug: data.slug,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
        console.log(response)

        if (response.status !== 201) {
            throw new Error('Failed to create deviceType.')
        }

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const deviceTypeSlice = createSlice({
    name: 'deviceType',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDeviceType.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchDeviceType.fulfilled, (state, { payload }) => {
                state.types = payload
                state.isLoading = false
                state.error = null
                console.log('device type fulfilled')
            })
            .addCase(fetchDeviceType.rejected, (state, action) => {
                state.error = action.payload?.message
                state.isLoading = false
                console.log('deviceTypeSlice error in fetchDeviceType.rejected')
            })
            // create device type
            .addCase(createDeviceType.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createDeviceType.fulfilled, (state, { payload }) => {
                console.log(payload)
                state.types?.push(payload)
                state.isLoading = false
                state.error = null
                console.log('create device type fulfilled')
            })
            .addCase(createDeviceType.rejected, (state, action) => {
                state.error = action.payload?.message
                state.isLoading = false
                console.log(
                    'deviceTypeSlice error in createDeviceType.rejected',
                )
            })
    },
})

export default deviceTypeSlice.reducer
