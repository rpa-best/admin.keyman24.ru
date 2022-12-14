import { createAsyncThunk } from '@reduxjs/toolkit'
import IService from '../models/IService'

const fetchThunk = (name: string, service: IService) =>
    createAsyncThunk<any, undefined, { rejectValue: any }>(
        `${name}/fetch${name}`,
        async (_, thunkApi) => {
            try {
                const response = await service.fetch()

                if (response.status !== 200) {
                    throw new Error(`Failed to fetch ${name}`)
                }

                return response.data
            } catch (error) {
                console.log(error)
                return thunkApi.rejectWithValue(error)
            }
        },
    )

const fetchWithOffsetThunk = (name: string, service: IService) =>
    createAsyncThunk<any, number, { rejectValue: any }>(
        `${name}/fetchWithOffset${name}`,
        async (data: number, thunkApi) => {
            try {
                const response = await service.fetchWithOffset(data)

                if (response.status !== 200) {
                    throw new Error(`Failed to fetchWithOffset ${name}`)
                }

                return response.data
            } catch (error) {
                console.log(error)
                return thunkApi.rejectWithValue(error)
            }
        },
    )

const createThunk = (name: string, service: IService) =>
    createAsyncThunk<any, any, { rejectValue: any }>(
        `${name}/create${name}`,
        async (data: any, thunkApi) => {
            try {
                const response = await service.create(data)

                if (response.status !== 201) {
                    throw new Error(`Failed to create ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error)
            }
        },
    )

export default {
    fetchThunk,
    fetchWithOffsetThunk,
    createThunk,
}
