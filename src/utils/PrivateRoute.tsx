import React, { FC } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux-hooks'

const PrivateRoute: FC = () => {
    const { isAuth } = useAppSelector(state => state.user)

    return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
