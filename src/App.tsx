import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './assets/styles/scss/app.scss'
import PrivateRoute from './utils/PrivateRoute'
import Sections from './components/sections'

const App: FC = () => {
    return (
        <div className='app-wrapper d-flex h-100'>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/' element={<MainPage />}>
                        <Route
                            index
                            element={<h1 className='h1'>Main Page</h1>}
                        />
                        <Route path='/org' element={<Sections.Organization />} />
                        <Route path='/device' element={<Sections.Device />} />
                        <Route path='/device-type' element={<Sections.DeviceType />} />
                        <Route path='/region' element={<Sections.Region />} />
                        <Route path='/region-type' element={<Sections.RegionType />} />
                        <Route path='/inventory-type' element={<Sections.InventoryType />} />
                        <Route path='/permission' element={<Sections.Permission />} />
                        <Route path='/permission-group' element={<Sections.PermissionGroup />} />
                        <Route path='/permission-level' element={<Sections.PermissionLevel />} />
                        <Route path='/system-message' element={<Sections.SystemMessage />} />
                    </Route>
                </Route>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </div>
    )
}

export default App
