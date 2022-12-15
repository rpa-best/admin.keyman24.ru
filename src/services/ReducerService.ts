import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isRejected, isPending } from '../helpers/actionsHelper'
import IService from '../models/IService'
import thunks from './AsyncThunkService'

export interface ReducerServiceProps {
    name: string
    service: IService
}

export default class RegionService<Model, CreateInput> {
    name: string

    model: Model

    service: IService

    createInput: CreateInput

    initialState: {
        list: Model[]
        count: number
        offset: number
        isLoading: boolean
        error: string | null
    }

    constructor(props: ReducerServiceProps) {
        this.name = props.name
        this.service = props.service

        this.initialState = {
            list: [],
            count: 0,
            offset: 0,
            isLoading: false,
            error: null,
        }
    }

    fetch() {
        const callAction = thunks.fetchThunk(this.name, this.service)
        return callAction()
    }

    fetchWithOffset(offset?: number) {
        const callAction = thunks.fetchWithOffsetThunk(this.name, this.service)
        const temp = offset ?? this.initialState.offset
        this.initialState = {
            ...this.initialState,
            offset: temp,
        }
        return callAction(this.initialState.offset)
    }

    create(data: typeof this.createInput) {
        const callAction = thunks.createThunk(this.name, this.service)
        return callAction(data)
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
                            state.isLoading = false
                            state.error = null
                            console.log(`fetch ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.fetchWithOffsetThunk(this.name, this.service).fulfilled,
                        (state, { payload }) => {
                            state.list = payload.results
                            state.count = payload.count
                            state.isLoading = false
                            state.error = null
                            console.log(`fetchWithOffset ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.createThunk(this.name, this.service).fulfilled,
                        (state, { payload }) => {
                            state.list?.push(payload)
                            state.count += 1
                            state.isLoading = false
                            state.error = null
                            console.log(`create ${this.name} fulfilled`)
                        },
                    )
                    .addMatcher(isPending, state => {
                        state.isLoading = true
                        state.error = null
                    })
                    .addMatcher(
                        isRejected,
                        (state, action: PayloadAction<string>) => {
                            state.error = action.payload
                            state.isLoading = false
                        },
                    )
            },
        })
    }
}
