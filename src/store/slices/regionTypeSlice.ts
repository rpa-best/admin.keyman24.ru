import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import IRegionType from '../../models/IRegionType'
import RegionTypeService from '../../services/RegionTypeService'
import { isError } from '../../helpers/isError'

interface IRegionTypeState {
    types: IRegionType[]
    isLoading: boolean
    error: string | null
}

const initialState: IRegionTypeState = {
    types: [],
    isLoading: false,
    error: null,
}

export const fetchRegionType = createAsyncThunk<
    IRegionType[],
    undefined,
    { rejectValue: any }
>('regionType/fetchRegionType', async (_, thunkApi) => {
    try {
        const response = await RegionTypeService.fetch()

        if (response.status !== 200) {
            throw new Error('Failed to fetch regionType.')
        }

        return response.data.results
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createRegionType = createAsyncThunk<
    IRegionType,
    string,
    { rejectValue: any }
>('regionType/createRegionType', async (data: string, thunkApi) => {
    try {
        const response = await RegionTypeService.create(data)

        if (response.status !== 201) {
            throw new Error('Failed to create regionType.')
        }

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const regionTypeSlice = createSlice({
    name: 'regionType',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRegionType.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchRegionType.fulfilled, (state, { payload }) => {
                state.types = payload
                state.isLoading = false
                state.error = null
                console.log('region type fulfilled')
            })
            // create region type
            .addCase(createRegionType.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createRegionType.fulfilled, (state, { payload }) => {
                state.types?.push(payload)
                state.isLoading = false
                state.error = null
                console.log('create region type fulfilled')
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.isLoading = false
            })
    },
})

export default regionTypeSlice.reducer
