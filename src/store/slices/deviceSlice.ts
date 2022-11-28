import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import IDevice from '../../models/IDevice'

const { API_URL } = process.env
const { AUTHORIZATION } = process.env

interface IDeviceState {
    device: IDevice[]
    isLoading: boolean
    error: string | null
}

interface IDeviceInput {
    name: string
    type: string
}

const initialState: IDeviceState = {
    device: [],
    isLoading: false,
    error: null,
}

export const fetchDevice = createAsyncThunk<
    IDevice[],
    undefined,
    { rejectValue: any }
>('device/fetchDevice', async (_, thunkApi) => {
    try {
        const response = await axios.get(`${API_URL}admin/device/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AUTHORIZATION}`,
            },
        })
        if (response.status !== 200) {
            throw new Error('Failed to fetch device.')
        }

        return response.data.results
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createDevice = createAsyncThunk<
    IDevice,
    IDeviceInput,
    { rejectValue: any }
>('device/createDevice', async (data: IDeviceInput, thunkApi) => {
    try {
        const response = await axios.post(
            `${API_URL}admin/device/`,
            {
                name: data.name,
                type: data.type,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${AUTHORIZATION}`,
                },
            },
        )
        if (response.status !== 201) {
            throw new Error('Failed to create device.')
        }

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDevice.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchDevice.fulfilled, (state, { payload }) => {
                state.device = payload
                state.isLoading = false
                state.error = null
                console.log('device fulfilled')
            })
            .addCase(fetchDevice.rejected, (state, action) => {
                state.error = action.payload?.message
                state.isLoading = false
                console.log('deviceSlice error in fetchDevice.rejected')
            })
            // create device
            .addCase(createDevice.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createDevice.fulfilled, (state, { payload }) => {
                state.device?.push(payload)
                state.isLoading = false
                state.error = null
                console.log('create device fulfilled')
            })
            .addCase(createDevice.rejected, (state, action) => {
                state.error = action.payload?.message
                state.isLoading = false
                console.log('deviceSlice error in createDevice.rejected')
            })
    },
})

export default deviceSlice.reducer
