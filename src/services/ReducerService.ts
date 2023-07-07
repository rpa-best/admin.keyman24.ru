import {
    AnyAction,
    AsyncThunkAction,
    createSlice,
    isPending,
    isRejected,
    PayloadAction,
} from '@reduxjs/toolkit'
// import { isRejected } from '../helpers/actionsHelper'
import IQueryParams from '../models/IQueryParams'
import IService from '../models/IService'
import ISubListQueryParams from '../models/ISubListQueryParams'
import thunks from './AsyncThunkService'

export interface ReducerServiceProps {
    name: string
    service: IService
}

interface GenericState<T> {
    list: T[]
    single: T
    count: number
    offset: number
    orderBy: string
    isLoading: 'list' | 'single' | 'head' | null
    error: string | null
    head: boolean
}

export interface ReducerServiceInterface {
    fetch(): AsyncThunkAction<any, any, any>
    fetchById(id: number): AsyncThunkAction<any, any, any>
    fetchWithParams(params?: IQueryParams): AsyncThunkAction<any, any, any>
    create(data: any): AsyncThunkAction<any, any, any>
    put(data: any): AsyncThunkAction<any, any, any>
    patch(data: any): AsyncThunkAction<any, any, any>
    clearSingle(): AsyncThunkAction<any, any, any>
    delete(id: number): AsyncThunkAction<any, any, any>
    head(): AsyncThunkAction<any, any, any>
    changeOffset(offset: number): AsyncThunkAction<any, any, any>
    changeOrdering(orderBy: string): AsyncThunkAction<any, any, any>
    fetchWithParamsNested(
        params: ISubListQueryParams,
    ): AsyncThunkAction<any, any, any>
    fetchByIdNested(
        id: number,
        params: ISubListQueryParams,
    ): AsyncThunkAction<any, any, any>
    createNested(
        data: any,
        params: ISubListQueryParams,
    ): AsyncThunkAction<any, any, any>
    putNested(
        data: any,
        params: ISubListQueryParams,
    ): AsyncThunkAction<any, any, any>
    patchNested(
        data: any,
        params: ISubListQueryParams,
    ): AsyncThunkAction<any, any, any>
    deleteNested(
        id: number,
        params: ISubListQueryParams,
    ): AsyncThunkAction<any, any, any>
}

export default class ReducerService<Model, CreateInput>
implements ReducerServiceInterface {
    name: string

    model: Model

    service: IService

    createInput: CreateInput

    initialState: GenericState<Model>

    constructor(props: ReducerServiceProps) {
        this.name = props.name
        this.service = props.service

        this.initialState = {
            list: [],
            single: {} as Model,
            count: 0,
            offset: 0,
            orderBy: 'id',
            isLoading: null,
            error: null,
            head: false,
        }
    }

    fetch() {
        const callAction = thunks.fetchThunk(this.name, this.service)
        return callAction()
    }

    fetchById(id: number) {
        const callAction = thunks.fetchByIdThunk(this.name, this.service)
        return callAction(id)
    }

    fetchWithParams(params?: IQueryParams) {
        const callAction = thunks.fetchWithParamsThunk(this.name, this.service)
        // const checkOffset = params?.offset ?? this.initialState.offset
        // const checkOrderBy = params?.orderBy ?? this.initialState.orderBy
        // this.initialState = {
        //     ...this.initialState,
        //     offset: checkOffset,
        //     orderBy: checkOrderBy,
        // }
        // return callAction({
        //     offset: this.initialState.offset,
        //     orderBy: this.initialState.orderBy,
        // })

        const checkOffset = params?.offset ?? 0
        const checkOrderBy = params?.orderBy ?? 'id'
        this.changeOffset(checkOffset)
        this.changeOrdering(checkOrderBy)

        return callAction({
            offset: checkOffset,
            orderBy: checkOrderBy,
            filter: params?.filter,
        })
    }

    create(data: typeof this.createInput) {
        const callAction = thunks.createThunk(this.name, this.service)
        return callAction(data)
    }

    put(data: any) {
        const callAction = thunks.putThunk(this.name, this.service)
        return callAction(data)
    }

    patch(data: any) {
        const callAction = thunks.patchThunk(this.name, this.service)
        return callAction(data)
    }

    clearSingle() {
        const callAction = thunks.clearSingleThunk(this.name)
        return callAction()
    }

    delete(id: number) {
        const callAction = thunks.deleteThunk(this.name, this.service)
        return callAction(id)
    }

    head() {
        const callAction = thunks.headThunk(this.name, this.service)
        return callAction()
    }

    changeOffset(offset: number) {
        const callAction = thunks.changeOffsetThunk(this.name)
        return callAction(offset)
    }

    changeOrdering(orderBy: string) {
        const callAction = thunks.changeOrderingThunk(this.name)
        return callAction(orderBy)
    }

    // nested entity

    fetchWithParamsNested(params: ISubListQueryParams) {
        const callAction = thunks.fetchWithParamsNestedThunk(
            this.name,
            this.service,
        )

        const checkOffset = params?.offset ?? 0
        const checkOrderBy = params?.orderBy ?? 'id'
        this.changeOffset(checkOffset)
        this.changeOrdering(checkOrderBy)

        return callAction({
            offset: checkOffset,
            orderBy: checkOrderBy,
            id: params.id,
            endpoint: params.endpoint,
        })
    }

    fetchByIdNested(id: number, params: ISubListQueryParams) {
        const callAction = thunks.fetchByIdNestedThunk(this.name, this.service)
        return callAction({ id, params })
    }

    createNested(data: CreateInput, params: ISubListQueryParams) {
        const callAction = thunks.createNestedThunk(this.name, this.service)
        return callAction({ data, params })
    }

    putNested(data: any, params: ISubListQueryParams) {
        const callAction = thunks.putNestedThunk(this.name, this.service)
        return callAction({ data, params })
    }

    patchNested(data: any, params: ISubListQueryParams) {
        const callAction = thunks.patchNestedThunk(this.name, this.service)
        return callAction({ data, params })
    }

    deleteNested(id: number, params: ISubListQueryParams) {
        const callAction = thunks.deleteNestedThunk(this.name, this.service)
        return callAction({ id, params })
    }

    slice() {
        return createSlice({
            name: this.name,
            initialState: this.initialState,
            reducers: {},
            extraReducers: builder => {
                builder
                    .addCase(
                        thunks.fetchThunk(this.name, this.service).fulfilled,
                        (state, { payload }) => {
                            state.list = payload.results
                            state.count = payload.count
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`fetch ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.fetchByIdThunk(this.name, this.service)
                            .fulfilled,
                        (state, { payload }) => {
                            state.single = payload
                            state.isLoading = state.isLoading === 'single'
                                ? null
                                : state.isLoading
                            // const a = state.single
                            // console.log(a)
                            state.error = null
                            console.log(`fetchById ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.fetchWithParamsThunk(this.name, this.service)
                            .fulfilled,
                        (state, { payload }) => {
                            state.list = payload.results
                            state.count = payload.count
                            // state.offset = payload.next_offset - 10
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(
                                `fetchWithParams ${this.name} fulfilled`,
                            )
                        },
                    )
                    .addCase(
                        thunks.createThunk(this.name, this.service).fulfilled,
                        (state, { payload }) => {
                            state.list?.push(payload)
                            state.count += 1
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`create ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.putThunk(this.name, this.service).fulfilled,
                        (state, { payload }) => {
                            state.list = state.list.map((item: any) =>
                                (item.id === payload.id ? payload : item))
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`put ${this.name} fulfilled`)
                            console.log(state.list)
                        },
                    )
                    .addCase(
                        thunks.patchThunk(this.name, this.service).fulfilled,
                        (state, { payload }) => {
                            state.list = state.list.map((item: any) =>
                                (item.id === payload.id ? payload : item))
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`patch ${this.name} fulfilled`)
                            console.log(state.list)
                        },
                    )
                    .addCase(
                        thunks.deleteThunk(this.name, this.service).fulfilled,
                        (state, { payload }) => {
                            console.log(payload)
                            state.list = state.list.filter(
                                (item: any) => item.id !== payload,
                            )
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(state.list)
                            console.log(`delete ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.headThunk(this.name, this.service).fulfilled,
                        (state, { payload }) => {
                            state.isLoading = state.isLoading === 'head'
                                ? null
                                : state.isLoading
                            state.error = null
                            state.head = payload
                            console.log(`head ${payload} fulfilled`)
                        },
                    )
                    // .addCase(
                    //     thunks.clearSingleThunk(this.name).fulfilled,
                    //     (state, { payload }) => {
                    //         state.single = null
                    //         state.isLoading = false
                    //         state.error = null
                    //         console.log(`clearSingle ${this.name} fulfilled`)
                    //     },
                    // )
                    .addCase(
                        thunks.changeOffsetThunk(this.name).fulfilled,
                        (state, { payload }) => {
                            state.offset = payload
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`changeOffset ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.changeOrderingThunk(this.name).fulfilled,
                        (state, { payload }) => {
                            state.orderBy = payload
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`changeOrdering ${this.name} fulfilled`)
                        },
                    )
                    // nested entity
                    .addCase(
                        thunks.fetchWithParamsNestedThunk(
                            this.name,
                            this.service,
                        ).fulfilled,
                        (state, { payload }) => {
                            state.list = payload.results
                            state.count = payload.count
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(
                                `fetchWithParamsNested ${this.name} fulfilled`,
                            )
                        },
                    )
                    .addCase(
                        thunks.fetchByIdNestedThunk(this.name, this.service)
                            .fulfilled,
                        (state, { payload }) => {
                            state.single = payload
                            state.isLoading = state.isLoading === 'single'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(
                                `fetchByIdNested ${this.name} fulfilled`,
                            )
                        },
                    )
                    .addCase(
                        thunks.createNestedThunk(this.name, this.service)
                            .fulfilled,
                        (state, { payload }) => {
                            state.list?.push(payload)
                            state.count += 1
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`createNested ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.putNestedThunk(this.name, this.service)
                            .fulfilled,
                        (state, { payload }) => {
                            state.list = state.list.map((item: any) =>
                                (item.id === payload.id ? payload : item))
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`putNested ${this.name} fulfilled`)
                            console.log(state.list)
                        },
                    )
                    .addCase(
                        thunks.patchNestedThunk(this.name, this.service)
                            .fulfilled,
                        (state, { payload }) => {
                            state.list = state.list.map((item: any) =>
                                (item.id === payload.id ? payload : item))
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`patchNested ${this.name} fulfilled`)
                            console.log(state.list)
                        },
                    )
                    .addCase(
                        thunks.deleteNestedThunk(this.name, this.service)
                            .fulfilled,
                        (state, { payload }) => {
                            state.list = state.list.filter(
                                (item: any) => item.id !== payload.id,
                            )
                            state.isLoading = state.isLoading === 'list'
                                ? null
                                : state.isLoading
                            state.error = null
                            console.log(`deleteNested ${this.name} fulfilled`)
                        },
                    )
                    // matchers
                    .addMatcher(
                        isPending(thunks.headThunk(this.name, this.service)),
                        state => {
                            state.isLoading = 'head'
                            state.error = null
                            console.log(`${this.name} head pending`)
                        },
                    )
                    .addMatcher(
                        isPending(
                            thunks.fetchByIdThunk(this.name, this.service),
                            thunks.fetchByIdNestedThunk(
                                this.name,
                                this.service,
                            ),
                        ),
                        state => {
                            state.isLoading = 'single'
                            state.error = null
                            console.log(`${this.name} single pending`)
                        },
                    )
                    .addMatcher(
                        isPending(
                            thunks.fetchThunk(this.name, this.service),
                            thunks.fetchWithParamsThunk(
                                this.name,
                                this.service,
                            ),
                            thunks.createThunk(this.name, this.service),
                            thunks.putThunk(this.name, this.service),
                            thunks.patchThunk(this.name, this.service),
                            thunks.deleteThunk(this.name, this.service),
                            thunks.changeOffsetThunk(this.name),
                            thunks.changeOrderingThunk(this.name),
                            thunks.fetchWithParamsNestedThunk(
                                this.name,
                                this.service,
                            ),
                            thunks.createNestedThunk(this.name, this.service),
                            thunks.putNestedThunk(this.name, this.service),
                            thunks.patchNestedThunk(this.name, this.service),
                            thunks.deleteNestedThunk(this.name, this.service),
                        ),
                        state => {
                            state.isLoading = 'list'
                            state.error = null
                            console.log(`${this.name} list pending`)
                        },
                    )
                    .addMatcher(
                        isRejected(thunks.headThunk(this.name, this.service)),
                        (state, action) => {
                            state.error = action.meta.aborted
                                ? 'aborted'
                                : action.payload
                            state.isLoading = action.meta.aborted
                                ? state.isLoading
                                : null
                            state.head = false
                        },
                    )
                    .addMatcher(
                        isRejected(
                            thunks.fetchThunk(this.name, this.service),
                            thunks.fetchByIdThunk(this.name, this.service),
                            thunks.fetchWithParamsThunk(
                                this.name,
                                this.service,
                            ),
                            thunks.createThunk(this.name, this.service),
                            thunks.putThunk(this.name, this.service),
                            thunks.patchThunk(this.name, this.service),
                            thunks.deleteThunk(this.name, this.service),
                            thunks.changeOffsetThunk(this.name),
                            thunks.changeOrderingThunk(this.name),
                            thunks.fetchWithParamsNestedThunk(
                                this.name,
                                this.service,
                            ),
                            thunks.createNestedThunk(this.name, this.service),
                            thunks.putNestedThunk(this.name, this.service),
                            thunks.patchNestedThunk(this.name, this.service),
                            thunks.deleteNestedThunk(this.name, this.service),
                        ),
                        (state, action) => {
                            state.error = action.payload
                            state.isLoading = null
                            // console.error(`${this.name} rejected`)
                        },
                    )
            },
        })
    }
}
