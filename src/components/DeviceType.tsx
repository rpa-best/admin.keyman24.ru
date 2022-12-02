import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import {
    createDeviceType,
    fetchDeviceType,
} from '../store/slices/deviceTypeSlice'

const DeviceType: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedDeviceTypes = useAppSelector(state => state.deviceType.types)

    useEffect(() => {
        dispatch(fetchDeviceType())
    }, [])

    const [typeName, setTypeName] = useState('')
    const [typeSlug, setTypeSlug] = useState('')
    return (
        <>
            <h1 className='h1'>Тип устройства</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={typeName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя устройства'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='text'
                    value={typeSlug}
                    onChange={e => setTypeSlug(e.target.value)}
                    placeholder='slug устройства'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={async () => {
                        await dispatch(
                            createDeviceType({
                                name: typeName,
                                slug: typeSlug,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать тип устройства
                </button>
            </div>
            <table className='mt-5'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>имя</td>
                        <td className='p-3'>slug</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedDeviceTypes.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>{item.slug}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default DeviceType
