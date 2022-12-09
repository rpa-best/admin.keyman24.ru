import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { deviceReducer, deviceTypeReducer } from '../store'
import $api from '../http'

const Device: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedDevices = useAppSelector(state => state.device.list)
    const fetchedDeviceTypes = useAppSelector(state => state.deviceType.list)
    const [deviceName, setDeviceName] = useState('')
    const [deviceType, setDeviceType] = useState('')

    const temp = fetchedDeviceTypes.map(item => {
        return {
            value: item.slug,
            label: item.slug,
        }
    })

    useEffect(() => {
        dispatch(deviceReducer.fetch())
        dispatch(deviceTypeReducer.fetch())
    }, [])

    const changeHandler = (e: any) => {
        setDeviceType(e.value)
    }

    const handleShowToken = (id: number) => {
        $api.get(`admin/device/${id}/token/`).then(res => {
            if (res.status === 200) {
                alert(res.data.token)
            }
        })
    }

    return (
        <>
            <h1 className='h1'>Устройство</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={deviceName}
                    onChange={e => setDeviceName(e.target.value)}
                    placeholder='имя устройства'
                    className='p-3 rounded bg-dark border border-white'
                />
                <Select
                    options={temp}
                    placeholder='выберите тип'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3 align-items-center d-flex'
                    onChange={changeHandler}
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatch(
                            deviceReducer.create({
                                name: deviceName,
                                type: deviceType,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать Устройство
                </button>
            </div>
            <table className='mt-3'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>имя</td>
                        <td className='p-3'>тип</td>
                        <td className='p-3'>описание</td>
                        <td className='p-3' />
                    </tr>
                </thead>
                <tbody>
                    {fetchedDevices.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>{item.type}</td>
                                <td className='p-3'>{item.desc}</td>
                                <td className='p-3'>
                                    <button
                                        type='button'
                                        className='p-3 rounded bg-dark border border-white'
                                        onClick={() => handleShowToken(item.id)}
                                    >
                                        Показать токен
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Device
