import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { regionTypeReducer } from '../../store'
import Table from '../Table'
import { regionType } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import Input from '../Input'
import Button from '../Button'

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
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Тип региона</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя региона'
                    value={typeName}
                    onChange={e => setTypeName(e)}
                />
                <Button
                    title='Создать тип региона'
                    handleClick={() => {
                        dispatch(
                            regionTypeReducer.create({ name: typeName }),
                        )
                    }}
                />
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
