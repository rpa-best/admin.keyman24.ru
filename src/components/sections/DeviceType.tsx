import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { deviceTypeReducer } from '../../store'
import Table from '../Table'
import { deviceType } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'

const DeviceType: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedDeviceTypes = useAppSelector(state => state.deviceType.list)

    const rowsLength = useAppSelector(state => state.deviceType.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(deviceTypeReducer.fetchWithOffset(currentOffset(currentPage)))
    }, [currentPage])

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
                    onClick={() => {
                        dispatch(
                            deviceTypeReducer.create({
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
            <Table
                columns={deviceType}
                data={fetchedDeviceTypes}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default DeviceType
