import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { deviceReducer, deviceTypeReducer } from '../../store'
import Table from '../Table'
import { device } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import Button from '../Button'
import Input from '../Input'
import { selectStyles, themeUnset } from '../../config/selectStyles'

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
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Устройство</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя устройства'
                    value={deviceName}
                    onChange={e => setDeviceName(e)}
                />
                <Select
                    options={temp}
                    placeholder='выберите тип'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3'
                    styles={selectStyles}
                    onChange={changeHandler}
                    theme={theme => themeUnset(theme)}
                />
                <Button
                    title='Создать Устройство'
                    handleClick={() => {
                        dispatch(
                            deviceReducer.create({
                                name: deviceName,
                                type: deviceType,
                            }),
                        )
                    }}
                />
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
