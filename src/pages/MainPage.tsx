import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import '../assets/styles/scss/mainPage.scss'

const MainPage: FC = () => {
    const dispatch = useAppDispatch()
    const { isAuth, isLoading, error } = useAppSelector(state => state.user)

    console.log('isAuth', isAuth)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error !== null) {
        return (
            <h1>
                Some error:
                {error}
            </h1>
        )
    }

    return (
        <>
            <TopNav />
            <main className='main-wrapper d-flex'>
                <Sidebar />
                <div className='temp-content d-flex flex-column w-100 min-vh-100 align-items-center mt-5'>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default MainPage
