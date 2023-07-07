import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    isPending,
    isRejected,
} from '@reduxjs/toolkit'
import {
    IPermissionGroupUserNested,
    IPermissionGroupUserNestedInput,
} from '../../models/permission'
import PermissionGroupUserNestedService, {
    IParams,
} from '../../services/reduxServices/PermissionGroupUserNestedService'

interface IPermissionGroupUserNestedState {
    list: IPermissionGroupUserNested[]
    single: IPermissionGroupUserNested
    count: number
    offset: number
    orderBy: string
    isLoading: 'list' | 'single' | null
    error: string | null
}

const initialState: IPermissionGroupUserNestedState = {
    list: [],
    single: {} as IPermissionGroupUserNested,
    count: 0,
    offset: 0,
    orderBy: 'id',
    isLoading: null,
    error: null,
}

export const fetchWithParamsPermissionGroupUserNested = createAsyncThunk<
    any,
    IParams,
    { rejectValue: any }
>(
    'permissionGroupUserNested/fetchWithParamsNestedpermissionGroupUserNested',
    async (data: IParams, thunkApi) => {
        try {
            const response =
                await PermissionGroupUserNestedService.fetchWithParamsNested(
                    data,
                )

            if (response.status !== 200) {
                throw new Error(
                    'Failed to fetchWithParamsNested permissionGroupUserNested',
                )
            }

            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    },
)

export const fetchByIdPermissionGroupUserNested = createAsyncThunk<
    IPermissionGroupUserNested,
    any,
    { rejectValue: any }
>(
    'permissionGroupUserNested/fetchByIdNestedpermissionGroupUserNested',
    async (data: { id: number; params: IParams }, thunkApi) => {
        try {
            const response =
                await PermissionGroupUserNestedService.fetchByIdNested(
                    data.id,
                    data.params,
                )

            if (response.status !== 200) {
                throw new Error(
                    'Failed to fetchByIdNested permissionGroupUserNested',
                )
            }

            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    },
)

export const createPermissionGroupUserNested = createAsyncThunk<
    IPermissionGroupUserNested,
    any,
    { rejectValue: any }
>(
    'permissionGroupUserNested/createNestedpermissionGroupUserNested',
    async (
        data: { data: IPermissionGroupUserNestedInput; params: IParams },
        thunkApi,
    ) => {
        try {
            const response =
                await PermissionGroupUserNestedService.createNested(
                    data.data,
                    data.params,
                )

            if (response.status !== 201) {
                throw new Error(
                    'Failed to createNested permissionGroupUserNested',
                )
            }

            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    },
)

export const deletePermissionGroupUserNested = createAsyncThunk<
    any,
    any,
    { rejectValue: any }
>(
    'permissionGroupUserNested/deleteNestedpermissionGroupUserNested',
    async (data: { id: number; params: IParams }, thunkApi) => {
        try {
            const response =
                await PermissionGroupUserNestedService.deleteNested(
                    data.id,
                    data.params,
                )

            if (response.status !== 204) {
                throw new Error('Failed to delete permissionGroupUserNested')
            }

            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    },
)

export const changeOffsetPermissionGroupUser = createAsyncThunk<
    any,
    number,
    { rejectValue: any }
>(
    'permissionGroupUserNested/changeOffsetpermissionGroupUserNested',
    async (data: number) => data,
)

export const changeOrderingPermissionGroupUser = createAsyncThunk<
    any,
    string,
    { rejectValue: any }
>(
    'permissionGroupUserNested/changeOrderingpermissionGroupUserNested',
    async (data: string) => data,
)

const permissionGroupUserNestedSlice = createSlice({
    name: 'permissionGroupUserNested',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                fetchWithParamsPermissionGroupUserNested.fulfilled,
                (state, { payload }) => {
                    state.list = payload.results
                    state.count = payload.count
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'fetchWithParamsNested permissionGroupUserNestedfulfilled',
                    )
                },
            )
            .addCase(
                fetchByIdPermissionGroupUserNested.fulfilled,
                (state, { payload }) => {
                    state.single = payload
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'fetchByIdNested permissionGroupUserNested fulfilled',
                    )
                },
            )
            .addCase(
                createPermissionGroupUserNested.fulfilled,
                (state, { payload }) => {
                    state.list?.push(payload)
                    state.count += 1
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'createNested permissionGroupUserNested fulfilled',
                    )
                },
            )
            .addCase(
                deletePermissionGroupUserNested.fulfilled,
                (state, { payload }) => {
                    state.list = state.list.filter(
                        (item: any) => item.id !== payload.id,
                    )
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'deleteNested permissionGroupUserNested fulfilled',
                    )
                },
            )
            .addCase(
                changeOffsetPermissionGroupUser.fulfilled,
                (state, { payload }) => {
                    state.offset = payload
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'changeOffset permissionGroupUserNested fulfilled',
                    )
                },
            )
            .addCase(
                changeOrderingPermissionGroupUser.fulfilled,
                (state, { payload }) => {
                    state.orderBy = payload
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'changeOrdering permissionGroupUserNested fulfilled',
                    )
                },
            )
            // matchers
            .addMatcher(
                isPending(fetchByIdPermissionGroupUserNested),
                state => {
                    state.isLoading = 'single'
                    state.error = null
                    console.log('permissionGroupUserNested single pending')
                },
            )
            .addMatcher(
                isPending(
                    changeOffsetPermissionGroupUser,
                    changeOrderingPermissionGroupUser,
                    fetchWithParamsPermissionGroupUserNested,
                    createPermissionGroupUserNested,
                    deletePermissionGroupUserNested,
                ),
                state => {
                    state.isLoading = 'list'
                    state.error = null
                    console.log('permissionGroupUserNested list pending')
                },
            )
            .addMatcher(
                isRejected(
                    changeOffsetPermissionGroupUser,
                    changeOrderingPermissionGroupUser,
                    fetchWithParamsPermissionGroupUserNested,
                    createPermissionGroupUserNested,
                    deletePermissionGroupUserNested,
                ),
                (state, action) => {
                    state.error = action.payload
                    state.isLoading = null
                    // console.error(`${this.name} rejected`)
                },
            )
    },
})

export default permissionGroupUserNestedSlice.reducer
