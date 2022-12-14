import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { regionTypeReducer } from '../../store'
import Table from '../Table'
import { regionType } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'

const RegionType: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedRegionTypes = useAppSelector(state => state.regionType.list)

    const rowsLength = useAppSelector(state => state.regionType.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(regionTypeReducer.fetchWithOffset(currentOffset(currentPage)))
    }, [currentPage])

    const [typeName, setTypeName] = useState('')

    return (
        <>
            <h1 className='h1'>Тип региона</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={typeName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя региона'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={() => dispatch(
                        regionTypeReducer.create({ name: typeName }),
                    )}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать тип региона
                </button>
            </div>
            <Table
                columns={regionType}
                data={fetchedRegionTypes}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default RegionType
