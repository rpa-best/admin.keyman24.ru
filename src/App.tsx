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
import Region from './components/Region'
import RegionType from './components/RegionType'
import InventoryType from './components/InventoryType'
import Permission from './components/Permission'
import PermissionGroup from './components/PermissionGroup'
import PermissionLevel from './components/PermissionLevel'
import SystemMessage from './components/SystemMessage'

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
                        <Route path='/org' element={<Organization />} />
                        <Route path='/device' element={<Device />} />
                        <Route path='/device-type' element={<DeviceType />} />
                        <Route path='/region' element={<Region />} />
                        <Route path='/region-type' element={<RegionType />} />
                        <Route path='/inventory-type' element={<InventoryType />} />
                        <Route path='/permission' element={<Permission />} />
                        <Route path='/permission-group' element={<PermissionGroup />} />
                        <Route path='/permission-level' element={<PermissionLevel />} />
                        <Route path='/system-message' element={<SystemMessage />} />
                    </Route>
                </Route>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </div>
    )
}

export default App
