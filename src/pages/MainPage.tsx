import React, { FC, useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import '../assets/styles/scss/mainPage.scss'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks'
import { organizationReducer } from '../store'
import socketHelper from '../helpers/socketHelper'

const MainPage: FC = () => {
    const dispatch = useAppDispatch()

    const socket = useRef<WebSocket>()
    const { WS_URL } = process.env
    const fetcheduser = useAppSelector(state => state.user.user)

    useEffect(() => {
        socket.current = new WebSocket(
            `${WS_URL}${fetcheduser?.username}/?token=${localStorage.getItem(
                'token',
            )}`,
        )

        socketHelper(
            socket.current,
            () => dispatch(organizationReducer.fetchWithOffset()),
        )

        return () => socket.current?.close()
    }, [])

    return (
        <>
            <TopNav />
            <main className='main-wrapper d-flex'>
                <Sidebar />
                <div className='temp-content d-flex flex-column w-100 min-vh-100 align-items-center mt-5'>
                    <Outlet />
                    <ToastContainer />
                </div>
            </main>
        </>
    )
}

export default MainPage
