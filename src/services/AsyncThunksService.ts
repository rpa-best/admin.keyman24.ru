import { createAsyncThunk } from '@reduxjs/toolkit'
import IService from '../models/IService'

const fetchThunk = (model: any, name: string, service: IService) =>
    createAsyncThunk<typeof model, undefined, { rejectValue: any }>(
        `${name}/fetch${name}`,
        async (_, thunkApi) => {
            try {
                const response = await service.fetch()

                if (response.status !== 200) {
                    throw new Error(`Failed to fetch ${name}`)
                }

                return response.data.results
            } catch (error) {
                return thunkApi.rejectWithValue(error)
            }
        },
    )

const createThunk = (model: any, input: any, name: string, service: IService) => createAsyncThunk<
    typeof model,
    typeof input,
    { rejectValue: any }
>('device/createDevice', async (data: typeof input, thunkApi) => {
    try {
        const response = await service.create(data)

        if (response.status !== 201) {
            throw new Error(`Failed to create ${name}`)
        }

        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export default {
    fetchThunk,
    createThunk,
}
