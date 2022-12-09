import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isRejected, isPending } from '../helpers/actionsHelper'
import IService from '../models/IService'
import thunks from './AsyncThunksService'

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
        isLoading: boolean
        error: string | null
    }

    constructor(props: ReducerServiceProps) {
        this.name = props.name
        this.service = props.service

        this.initialState = {
            list: [],
            isLoading: false,
            error: null,
        }
    }

    fetch() {
        const callAction = thunks.fetchThunk(
            this.model,
            this.name,
            this.service,
        )
        return callAction()
    }

    create(data: typeof this.createInput) {
        const callAction = thunks.createThunk(
            this.model,
            this.createInput,
            this.name,
            this.service,
        )
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
                        thunks.fetchThunk(this.model, this.name, this.service)
                            .fulfilled,
                        (state, { payload }) => {
                            state.list = payload
                            state.isLoading = false
                            state.error = null
                            console.log(`fetch ${this.name} fulfilled`)
                        },
                    )
                    .addCase(
                        thunks.createThunk(
                            this.model,
                            this.createInput,
                            this.name,
                            this.service,
                        ).fulfilled,
                        (state, { payload }) => {
                            state.list?.push(payload)
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
