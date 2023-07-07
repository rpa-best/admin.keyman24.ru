import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/useReduxHooks'

const PrivateRoute = () => {
    const location = useLocation()
    const { isAuth } = useAppSelector(state => state.account)

    // return <Outlet />

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} />
    )
}

export default PrivateRoute
