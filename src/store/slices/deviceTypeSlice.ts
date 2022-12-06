import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import IDeviceType from '../../models/IDeviceType'
import DeviceTypeService from '../../services/DeviceTypeService'
import { isError } from '../../helpers/isError'
import IDeviceTypeInput from '../../models/input/IDeviceTypeInput'

interface IDeviceTypeState {
    types: IDeviceType[]
    isLoading: boolean
    error: string | null
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
        const response = await DeviceTypeService.fetch()

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
        const response = await DeviceTypeService.create(data)

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
            // create device type
            .addCase(createDeviceType.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createDeviceType.fulfilled, (state, { payload }) => {
                state.types?.push(payload)
                state.isLoading = false
                state.error = null
                console.log('create device type fulfilled')
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.isLoading = false
            })
    },
})

export default deviceTypeSlice.reducer
