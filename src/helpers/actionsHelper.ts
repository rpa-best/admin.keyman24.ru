/* eslint-disable import/prefer-default-export */
import { AnyAction } from '@reduxjs/toolkit'
// import { isPending } from '@reduxjs/toolkit'

export const isPending = (action: AnyAction) => {
    return action.type.endsWith('pending')
}

export const isRejected = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

// function handlePendingAction(action: AnyAction) {
//     if (isAPendingAction(action)) {
//         // action is a pending action dispatched by either `requestThunk1` or `requestThunk2`
//     }
// }
// export const pendingDecorator = (...args: AnyAction[]) => {
//     return isPending(args)
// }
