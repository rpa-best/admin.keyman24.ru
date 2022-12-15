import React, { FC } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/useReduxHooks'

const PrivateRoute: FC = () => {
    const location = useLocation()
    const { isAuth } = useAppSelector(state => state.user)

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} />
    )
}

export default PrivateRoute
