import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import '../assets/styles/scss/mainPage.scss'
import 'react-toastify/dist/ReactToastify.css'

const MainPage: FC = () => {
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
