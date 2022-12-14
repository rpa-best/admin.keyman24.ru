import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { deviceReducer, deviceTypeReducer } from '../../store'
import Table from '../Table'
import { device } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'

const Device: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedDevices = useAppSelector(state => state.device.list)
    const fetchedDeviceTypes = useAppSelector(state => state.deviceType.list)
    const [deviceName, setDeviceName] = useState('')
    const [deviceType, setDeviceType] = useState('')

    const rowsLength = useAppSelector(state => state.device.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    const temp = fetchedDeviceTypes.map(item => {
        return {
            value: item.slug,
            label: item.slug,
        }
    })

    useEffect(() => {
        dispatch(deviceReducer.fetchWithOffset(currentOffset(currentPage)))
        dispatch(deviceTypeReducer.fetch())
    }, [currentPage])

    const changeHandler = (e: any) => {
        setDeviceType(e.value)
    }

    // const handleShowToken = (id: number) => {
    //     $api.get(`admin/device/${id}/token/`).then(res => {
    //         if (res.status === 200) {
    //             alert(res.data.token)
    //         }
    //     })
    // }

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
            <Table
                columns={device}
                data={fetchedDevices}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default Device
