import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { deviceTypeReducer } from '../../store'
import Table from '../Table'
import { deviceType } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import Input from '../Input'
import Button from '../Button'

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
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Тип устройства</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя типа'
                    value={typeName}
                    onChange={e => setTypeName(e)}
                />
                <Input
                    placeholder='slug устройства'
                    value={typeSlug}
                    onChange={e => setTypeSlug(e)}
                />
                <Button
                    title='Создать тип устройства'
                    handleClick={() => {
                        dispatch(
                            deviceTypeReducer.create({
                                name: typeName,
                                slug: typeSlug,
                            }),
                        )
                    }}
                />
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
