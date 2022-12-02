import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './assets/styles/scss/app.scss'
import PrivateRoute from './utils/PrivateRoute'
import Organization from './components/Organization'
import Device from './components/Device'
import DeviceType from './components/DeviceType'

const App: FC = () => {
    return (
        <div className='app-wrapper d-flex h-100'>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/' element={<MainPage />}>
                        <Route index element={<h1 className='h1'>Main Page</h1>} />
                        <Route path='/org' element={<Organization />} />
                        <Route path='/device' element={<Device />} />
                        <Route path='/device-type' element={<DeviceType />} />
                    </Route>
                </Route>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </div>
    )
}

export default App
