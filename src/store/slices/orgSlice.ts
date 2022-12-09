import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { isRejected } from '../../helpers/actionsHelper'
import IOrganization from '../../models/IOrganization'
import OrgService from '../../services/reduxServices/OrgService'

interface IOrgState {
    org: IOrganization[]
    isLoading: boolean
    error: string | null
}

const initialState: IOrgState = {
    org: [],
    isLoading: false,
    error: null,
}

export const fetchOrg = createAsyncThunk<
    IOrganization[],
    undefined,
    { rejectValue: any }
>('org/fetchOrg', async (_, thunkApi) => {
    try {
        const response = await OrgService.fetch()

        if (response.status !== 200) {
            throw new Error('Failed to fetch org.')
        }

        return response.data.results
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createOrg = createAsyncThunk<
    IOrganization,
    string,
    { rejectValue: any }
>('org/createOrg', async (data: string, thunkApi) => {
    try {
        const response = await OrgService.create(data)

        if (response.status !== 201) {
            throw new Error('Failed to create org.')
        }

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const orgSlice = createSlice({
    name: 'org',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchOrg.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchOrg.fulfilled, (state, { payload }) => {
                state.org = payload
                state.isLoading = false
                state.error = null
                console.log('org fulfilled')
            })
            // create org
            .addCase(createOrg.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createOrg.fulfilled, (state, { payload }) => {
                state.org?.push(payload)
                state.isLoading = false
                state.error = null
                console.log('create org fulfilled')
            })
            .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.isLoading = false
            })
    },
})

export default orgSlice.reducer
