import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    isPending,
    isRejected,
} from '@reduxjs/toolkit'
import {
    IPermissionUserNested,
    IPermissionUserNestedInput,
} from '../../models/permission'
import PermissionUserNestedService, {
    IParams,
} from '../../services/reduxServices/PermissionUserNestedService'

interface IPermissionUserNestedState {
    list: IPermissionUserNested[]
    single: IPermissionUserNested
    count: number
    offset: number
    orderBy: string
    isLoading: 'list' | 'single' | null
    error: string | null
}

const initialState: IPermissionUserNestedState = {
    list: [],
    single: {} as IPermissionUserNested,
    count: 0,
    offset: 0,
    orderBy: 'id',
    isLoading: null,
    error: null,
}

export const fetchWithParamsPermissionUserNested = createAsyncThunk<
    any,
    IParams,
    { rejectValue: any }
>(
    'permissionUserNested/fetchWithParamsNestedpermissionUserNested',
    async (data: IParams, thunkApi) => {
        try {
            const response =
                await PermissionUserNestedService.fetchWithParamsNested(
                    data,
                )

            if (response.status !== 200) {
                throw new Error(
                    'Failed to fetchWithParamsNested permissionUserNested',
                )
            }

            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    },
)

export const fetchByIdPermissionUserNested = createAsyncThunk<
    IPermissionUserNested,
    any,
    { rejectValue: any }
>(
    'permissionUserNested/fetchByIdNestedpermissionUserNested',
    async (data: { id: number; params: IParams }, thunkApi) => {
        try {
            const response =
                await PermissionUserNestedService.fetchByIdNested(
                    data.id,
                    data.params,
                )

            if (response.status !== 200) {
                throw new Error(
                    'Failed to fetchByIdNested permissionUserNested',
                )
            }

            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    },
)

export const createPermissionUserNested = createAsyncThunk<
    IPermissionUserNested,
    any,
    { rejectValue: any }
>(
    'permissionUserNested/createNestedpermissionUserNested',
    async (
        data: { data: IPermissionUserNestedInput; params: IParams },
        thunkApi,
    ) => {
        try {
            const response =
                await PermissionUserNestedService.createNested(
                    data.data,
                    data.params,
                )

            if (response.status !== 201) {
                throw new Error(
                    'Failed to createNested permissionUserNested',
                )
            }

            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    },
)

export const deletePermissionUserNested = createAsyncThunk<
    any,
    any,
    { rejectValue: any }
>(
    'permissionUserNested/deleteNestedpermissionUserNested',
    async (data: { id: number; params: IParams }, thunkApi) => {
        try {
            const response =
                await PermissionUserNestedService.deleteNested(
                    data.id,
                    data.params,
                )

            if (response.status !== 204) {
                throw new Error('Failed to delete permissionUserNested')
            }

            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    },
)

export const changeOffsetPermissionUser = createAsyncThunk<
    any,
    number,
    { rejectValue: any }
>(
    'permissionUserNested/changeOffsetpermissionUserNested',
    async (data: number) => data,
)

export const changeOrderingPermissionUser = createAsyncThunk<
    any,
    string,
    { rejectValue: any }
>(
    'permissionUserNested/changeOrderingpermissionUserNested',
    async (data: string) => data,
)

const permissionUserNestedSlice = createSlice({
    name: 'permissionUserNested',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                fetchWithParamsPermissionUserNested.fulfilled,
                (state, { payload }) => {
                    state.list = payload.results
                    state.count = payload.count
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'fetchWithParamsNested permissionUserNestedfulfilled',
                    )
                },
            )
            .addCase(
                fetchByIdPermissionUserNested.fulfilled,
                (state, { payload }) => {
                    state.single = payload
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'fetchByIdNested permissionUserNested fulfilled',
                    )
                },
            )
            .addCase(
                createPermissionUserNested.fulfilled,
                (state, { payload }) => {
                    state.list?.push(payload)
                    state.count += 1
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'createNested permissionUserNested fulfilled',
                    )
                },
            )
            .addCase(
                deletePermissionUserNested.fulfilled,
                (state, { payload }) => {
                    state.list = state.list.filter(
                        (item: any) => item.id !== payload.id,
                    )
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'deleteNested permissionUserNested fulfilled',
                    )
                },
            )
            .addCase(
                changeOffsetPermissionUser.fulfilled,
                (state, { payload }) => {
                    state.offset = payload
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'changeOffset permissionUserNested fulfilled',
                    )
                },
            )
            .addCase(
                changeOrderingPermissionUser.fulfilled,
                (state, { payload }) => {
                    state.orderBy = payload
                    state.isLoading = null
                    state.error = null
                    console.log(
                        'changeOrdering permissionUserNested fulfilled',
                    )
                },
            )
            // matchers
            .addMatcher(
                isPending(fetchByIdPermissionUserNested),
                state => {
                    state.isLoading = 'single'
                    state.error = null
                    console.log('permissionUserNested single pending')
                },
            )
            .addMatcher(
                isPending(
                    changeOffsetPermissionUser,
                    changeOrderingPermissionUser,
                    fetchWithParamsPermissionUserNested,
                    createPermissionUserNested,
                    deletePermissionUserNested,
                ),
                state => {
                    state.isLoading = 'list'
                    state.error = null
                    console.log('permissionUserNested list pending')
                },
            )
            .addMatcher(
                isRejected(
                    changeOffsetPermissionUser,
                    changeOrderingPermissionUser,
                    fetchWithParamsPermissionUserNested,
                    createPermissionUserNested,
                    deletePermissionUserNested,
                ),
                (state, action) => {
                    state.error = action.payload
                    state.isLoading = null
                    // console.error(`${this.name} rejected`)
                },
            )
    },
})

export default permissionUserNestedSlice.reducer
