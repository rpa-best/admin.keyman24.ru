import { createAsyncThunk } from '@reduxjs/toolkit'
import IQueryParams from '../models/IQueryParams'
import IService from '../models/IService'
import ISubListQueryParams from '../models/ISubListQueryParams'

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
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const fetchByIdThunk = (name: string, service: IService) =>
    createAsyncThunk<any, number, { rejectValue: any }>(
        `${name}/fetchById${name}`,
        async (data: number, thunkApi) => {
            try {
                const response = await service.fetchById(data)

                if (response.status !== 200) {
                    throw new Error(`Failed to fetchById ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const fetchWithParamsThunk = (name: string, service: IService) =>
    createAsyncThunk<any, IQueryParams, { rejectValue: any }>(
        `${name}/fetchWithParams${name}`,
        async (data: IQueryParams, thunkApi) => {
            try {
                const response = await service.fetchWithParams(data)

                if (response.status !== 200) {
                    throw new Error(`Failed to fetchWithParams ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
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
                // console.log('error', error.message)
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const putThunk = (name: string, service: IService) =>
    createAsyncThunk<any, any, { rejectValue: any }>(
        `${name}/put${name}`,
        async (data: any, thunkApi) => {
            try {
                const response = await service.put(data)

                if (response.status !== 200) {
                    throw new Error(`Failed to put ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const patchThunk = (name: string, service: IService) =>
    createAsyncThunk<any, any, { rejectValue: any }>(
        `${name}/patch${name}`,
        async (data: any, thunkApi) => {
            try {
                const response = await service.patch(data)

                if (response.status !== 200) {
                    throw new Error(`Failed to patch ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const deleteThunk = (name: string, service: IService) =>
    createAsyncThunk<any, number, { rejectValue: any }>(
        `${name}/delete${name}`,
        async (data: number, thunkApi) => {
            try {
                const response = await service.delete(data)

                if (response.status !== 204) {
                    throw new Error(`Failed to delete ${name}`)
                }

                return data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const headThunk = (name: string, service: IService) =>
    createAsyncThunk<any, undefined, { rejectValue: any }>(
        `${name}/head${name}`,
        async (_, thunkApi) => {
            try {
                const response = await service.head()

                if (response.status !== 200) {
                    throw new Error(`Failed to head ${name}`)
                }

                return response.status === 200
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const clearSingleThunk = (name: string) =>
    createAsyncThunk<any, undefined, { rejectValue: any }>(
        `${name}/clearSingle${name}`,
        async (_, thunkApi) => {
            return thunkApi.getState()
        },
    )

const changeOffsetThunk = (name: string) =>
    createAsyncThunk<any, number, { rejectValue: any }>(
        `${name}/changeOffset${name}`,
        async (data: number) => data,
    )

const changeOrderingThunk = (name: string) =>
    createAsyncThunk<any, string, { rejectValue: any }>(
        `${name}/changeOrdering${name}`,
        async (data: string) => data,
    )

// nested entity
const fetchByIdNestedThunk = (name: string, service: IService) =>
    createAsyncThunk<any, any, { rejectValue: any }>(
        `${name}/fetchByIdNested${name}`,
        async (data: { id: number; params: ISubListQueryParams }, thunkApi) => {
            try {
                const response = await service.fetchByIdNested(
                    data.id,
                    data.params,
                )

                if (response.status !== 200) {
                    throw new Error(`Failed to fetchByIdNested ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const fetchWithParamsNestedThunk = (name: string, service: IService) =>
    createAsyncThunk<any, ISubListQueryParams, { rejectValue: any }>(
        `${name}/fetchWithParamsNested${name}`,
        async (data: ISubListQueryParams, thunkApi) => {
            try {
                const response = await service.fetchWithParamsNested(data)

                if (response.status !== 200) {
                    throw new Error(`Failed to fetchWithParamsNested ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const createNestedThunk = (name: string, service: IService) =>
    createAsyncThunk<any, any, { rejectValue: any }>(
        `${name}/createNested${name}`,
        async (data: { data: any; params: ISubListQueryParams }, thunkApi) => {
            try {
                const response = await service.createNested(
                    data.data,
                    data.params,
                )

                if (response.status !== 201) {
                    throw new Error(`Failed to createNested ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const putNestedThunk = (name: string, service: IService) =>
    createAsyncThunk<any, any, { rejectValue: any }>(
        `${name}/putNested${name}`,
        async (data: { data: any; params: ISubListQueryParams }, thunkApi) => {
            try {
                const response = await service.putNested(data.data, data.params)

                if (response.status !== 200) {
                    throw new Error(`Failed to putNested ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const patchNestedThunk = (name: string, service: IService) =>
    createAsyncThunk<any, any, { rejectValue: any }>(
        `${name}/patchNested${name}`,
        async (data: { data: any; params: ISubListQueryParams }, thunkApi) => {
            try {
                const response = await service.patchNested(data.data, data.params)

                if (response.status !== 200) {
                    throw new Error(`Failed to patchNested ${name}`)
                }

                return response.data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

const deleteNestedThunk = (name: string, service: IService) =>
    createAsyncThunk<any, any, { rejectValue: any }>(
        `${name}/deleteNested${name}`,
        async (data: { id: number; params: ISubListQueryParams }, thunkApi) => {
            try {
                const response = await service.deleteNested(
                    data.id,
                    data.params,
                )

                if (response.status !== 204) {
                    throw new Error(`Failed to delete ${name}`)
                }

                return data
            } catch (error) {
                return thunkApi.rejectWithValue(error.message)
            }
        },
    )

export default {
    fetchThunk,
    fetchByIdThunk,
    fetchWithParamsThunk,
    createThunk,
    putThunk,
    patchThunk,
    deleteThunk,
    headThunk,
    clearSingleThunk,
    changeOffsetThunk,
    changeOrderingThunk,
    fetchByIdNestedThunk,
    fetchWithParamsNestedThunk,
    createNestedThunk,
    putNestedThunk,
    patchNestedThunk,
    deleteNestedThunk,
}
