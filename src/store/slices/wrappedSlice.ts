// import {
//     createAsyncThunk,
//     createSlice,
//     SliceCaseReducers,
//     ValidateSliceCaseReducers,
// } from '@reduxjs/toolkit'
// import { IGuestWorker } from '../../models/guestWorker'
// import GuestWorkerService from '../../services/reduxServices/GuestWorkerService'
// import thunks from '../../services/AsyncThunkService'

// interface GenericState<T> {
//     data?: T
//     status: 'loading' | 'finished' | 'error'
// }

// const fetchById = (id: number) => {
//     const callAction = thunks.fetchByIdThunk(this.name, this.service)
//     return callAction(id)
// }

// const createGenericSlice = <
//     T,
//     Reducers extends SliceCaseReducers<GenericState<T>>,
// >({
//     name = '',
//     initialState,
//     reducers,
// }: {
//     name: string
//     initialState: GenericState<T>
//         reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
    
// }) => {
//     return createSlice({
//         name,
//         initialState,
//         reducers: {
//             start(state) {
//                 state.status = 'loading'
//             },
//             /**
//              * If you want to write to values of the state that depend on the generic
//              * (in this case: `state.data`, which is T), you might need to specify the
//              * State type manually here, as it defaults to `Draft<GenericState<T>>`,
//              * which can sometimes be problematic with yet-unresolved generics.
//              * This is a general problem when working with immer's Draft type and generics.
//              */
//             success(state: GenericState<T>, action: PayloadAction<T>) {
//                 state.data = action.payload
//                 state.status = 'finished'
//             },
//             ...reducers,
//         },
//     })
// }

// const wrappedSlice = createGenericSlice({
//     name: 'test',
//     initialState: { status: 'loading' } as GenericState<string>,
//     reducers: {
//         magic(state) {
//             state.status = 'finished'
//             state.data = 'hocus pocus'
//         },
//     },
// })
