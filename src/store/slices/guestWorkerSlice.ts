import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { isRejected, isPending } from '../../helpers/actionsHelper'
import { IGuestWorker, IGuestWorkerInput } from '../../models/guestWorker'
import IOrganization from '../../models/IOrganization'
import GuestWorkerService from '../../services/reduxServices/GuestWorkerService'

interface IGuestWorkerState {
    guestWorker: IGuestWorker[]
    isLoading: boolean
    error: string | null
}

const initialState: IGuestWorkerState = {
    guestWorker: [],
    isLoading: false,
    error: null,
}

export const fetchGuestWorker = createAsyncThunk<
    IGuestWorker[],
    undefined,
    { rejectValue: any }
>('guestWorker/fetchGuestWorker', async (_, thunkApi) => {
    try {
        const response = await GuestWorkerService.fetch()

        if (response.status !== 200) {
            throw new Error('Failed to fetch guestWorker.')
        }

        return response.data.results
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const fetchByNameGuestWorker = createAsyncThunk<
    IGuestWorker[],
    string,
    { rejectValue: any }
>('guestWorker/fetchByNameGuestWorker', async (data: string, thunkApi) => {
    try {
        const response = await GuestWorkerService.fetchByName(data)

        if (response.status !== 200) {
            throw new Error('Failed to fetchByName guestWorker.')
        }

        return response.data.results
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createGuestWorker = createAsyncThunk<
    IGuestWorker,
    number[],
    { rejectValue: any }
>('guestWorker/createGuestWorker', async (data: number[], thunkApi) => {
    try {
        const response = await GuestWorkerService.create(data)

        if (response.status !== 200) {
            throw new Error('Failed to create guestWorker.')
        }

        // const temp = await OrgService.fetch()

        // if (temp.status !== 200) {
        //     throw new Error('Failed to fetch org.')
        // }

        // return temp.data.results

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const guestWorkerSlice = createSlice({
    name: 'guestWorker',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // fetch guestWorker
            .addCase(fetchGuestWorker.fulfilled, (state, { payload }) => {
                state.guestWorker = payload
                state.isLoading = false
                state.error = null
                console.log('guestWorker fulfilled')
            })
            // fetchByName guestWorker
            .addCase(fetchByNameGuestWorker.fulfilled, (state, { payload }) => {
                state.guestWorker = payload
                state.isLoading = false
                state.error = null
                console.log('guestWorker fulfilled')
            })
            // create guestWorker
            .addCase(createGuestWorker.fulfilled, (state, { payload }) => {
                // state.org?.push(payload[payload.length - 1])
                state.isLoading = false
                state.error = null
                console.log('create guestWorker fulfilled')
            })
            // defaults
            .addMatcher(isPending, state => {
                state.isLoading = true
                state.error = null
            })
            .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.isLoading = false
            })
    },
})

export default guestWorkerSlice.reducer
