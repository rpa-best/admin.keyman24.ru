import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit'
import { isError } from '../../helpers/isError'
import IRegion from '../../models/IRegion'
import IRegionInput from '../../models/input/IRegionInput'
import RegionService from '../../services/RegionService'

interface IRegionState {
    region: IRegion[]
    isLoading: boolean
    error: string | null
}

const initialState: IRegionState = {
    region: [],
    isLoading: false,
    error: null,
}

export const fetchRegion = createAsyncThunk<
    IRegion[],
    undefined,
    { rejectValue: any }
>('region/fetchRegion', async (_, thunkApi) => {
    try {
        const response = await RegionService.fetch()

        if (response.status !== 200) {
            throw new Error('Failed to fetch region.')
        }

        return response.data.results
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createRegion = createAsyncThunk<
    IRegion,
    IRegionInput,
    { rejectValue: any }
>('region/createRegion', async (data: IRegionInput, thunkApi) => {
    try {
        const response = await RegionService.create(data)

        if (response.status !== 201) {
            throw new Error('Failed to create region.')
        }

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const regionSlice = createSlice({
    name: 'region',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRegion.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchRegion.fulfilled, (state, { payload }) => {
                state.region = payload
                state.isLoading = false
                state.error = null
                console.log('region fulfilled')
            })
            // create region
            .addCase(createRegion.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createRegion.fulfilled, (state, { payload }) => {
                state.region?.push(payload)
                state.isLoading = false
                state.error = null
                console.log('create region fulfilled')
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.isLoading = false
            })
    },
})

export default regionSlice.reducer
