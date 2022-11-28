import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import IOrganization from '../../models/IOrganization'

const { API_URL } = process.env
const { AUTHORIZATION } = process.env

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
        const response = await axios.get(
            `${API_URL}admin/org/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${AUTHORIZATION}`,
                },
            },
        )
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
        const response = await axios.post(
            `${API_URL}admin/org/`,
            {
                name: data,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${AUTHORIZATION}`,
                },
            },
        )
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
            .addCase(fetchOrg.rejected, (state, action) => {
                state.error = action.payload?.message
                state.isLoading = false
                console.log('orgSlice error in fetchOrg.rejected')
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
            .addCase(createOrg.rejected, (state, action) => {
                state.error = action.payload?.message
                state.isLoading = false
                console.log('orgSlice error in createOrg.rejected')
            })
    },
})

export default orgSlice.reducer
