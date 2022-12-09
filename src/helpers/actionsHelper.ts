/* eslint-disable import/prefer-default-export */
import { AnyAction } from '@reduxjs/toolkit'

export const isPending = (action: AnyAction) => {
    return action.type.endsWith('pending')
}

export const isRejected = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}
