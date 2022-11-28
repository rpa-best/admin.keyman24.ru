import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import { createOrg, fetchOrg } from '../store/slices/orgSlice'
import { fetchDevice, createDevice } from '../store/slices/deviceSlice'
import IOrganization from '../models/IOrganization'
import IDevice from '../models/IDevice'
import '../assets/styles/scss/mainPage.scss'

const MainPage: FC = () => {
    const dispatch = useAppDispatch()
    const { isAuth, isLoading, error } = useAppSelector(state => state.user)
    const fetchedOrgs: IOrganization[] = useAppSelector(state => state.org.org)
    const fetchedDevices: IDevice[] = useAppSelector(
        state => state.device.device,
    )

    const [org, setOrg] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [deviceType, setDeviceType] = useState('')

    console.log('isAuth', isAuth)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const displayOrgs = () => {
        return (
            <table className='mt-3'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>name</td>
                        <td className='p-3'>created_at</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedOrgs.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>{item.create_at}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    const displayDevices = () => {
        return (
            <table className='mt-3'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>name</td>
                        <td className='p-3'>type</td>
                        <td className='p-3'>token</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedDevices.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>{item.type}</td>
                                <td className='p-3'>{item.token}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
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
                <div className='temp-content d-flex flex-column w-100 min-vh-100 align-items-center justify-content-center'>
                    <h1 className='h1'>Organizations</h1>
                    <div className='d-flex mt-3'>
                        <input
                            type='text'
                            value={org}
                            onChange={e => setOrg(e.target.value)}
                            placeholder='organization'
                            className='p-3 rounded bg-dark border border-white'
                        />
                        <button
                            type='button'
                            onClick={async () => {
                                await dispatch(createOrg(org))
                            }}
                            className='ms-3 p-3 rounded bg-dark border border-white'
                        >
                            Create org
                        </button>
                        <button
                            type='button'
                            onClick={async () => {
                                await dispatch(fetchOrg())
                            }}
                            className='ms-3 p-3 rounded bg-dark border border-white'
                        >
                            Fetch orgs
                        </button>
                    </div>
                    {displayOrgs()}
                    <h1 className='h1 mt-5'>Devices</h1>
                    <div className='d-flex mt-3'>
                        <input
                            type='text'
                            value={deviceName}
                            onChange={e => setDeviceName(e.target.value)}
                            placeholder='deviceName'
                            className='p-3 rounded bg-dark border border-white'
                        />
                        <input
                            type='text'
                            value={deviceType}
                            onChange={e => setDeviceType(e.target.value)}
                            placeholder='deviceType'
                            className='p-3 rounded bg-dark border border-white'
                        />
                        <button
                            type='button'
                            onClick={async () => {
                                await dispatch(
                                    createDevice({
                                        name: deviceName,
                                        type: deviceType,
                                    }),
                                )
                            }}
                            className='ms-3 p-3 rounded bg-dark border border-white'
                        >
                            Create device
                        </button>
                        <button
                            type='button'
                            onClick={async () => {
                                await dispatch(fetchDevice())
                            }}
                            className='ms-3 p-3 rounded bg-dark border border-white'
                        >
                            Fetch device
                        </button>
                    </div>
                    {displayDevices()}
                </div>
            </main>
        </>
    )
    // ) : (
    //     navigate('/login')
    // )
}

export default MainPage