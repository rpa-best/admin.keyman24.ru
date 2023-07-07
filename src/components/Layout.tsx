import React, { FC, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Sidebar from './Sidebar/Sidebar'
import TopNav from './TopNav'
import '../assets/styles/scss/mainPage.scss'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks'
import socketHelper from '../helpers/socketHelper'
import { organizationReducer } from '../store'

const Layout: FC = () => {
    const dispatch = useAppDispatch()

    const socket = useRef<WebSocket>()
    const { WS_URL } = process.env
    const fetcheduser = useAppSelector(state => state.account.user)

    useEffect(() => {
        socket.current = new WebSocket(
            `${WS_URL}${fetcheduser?.username}/?token=${localStorage.getItem(
                'token',
            )}`,
        )

        socketHelper(socket.current, () =>
            dispatch(organizationReducer.fetchWithParams()),)

        return () => socket.current?.close()
    }, [])

    return (
        <>
            <TopNav />
            <main className='main-wrapper d-flex'>
                <Sidebar />
                <div className='temp-content d-flex flex-column w-100 min-vh-100'>
                    <Outlet />
                    <ToastContainer />
                </div>
            </main>
        </>
    )
}

export default Layout
