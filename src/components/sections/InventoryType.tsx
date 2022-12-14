import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { inventoryTypeReducer } from '../../store'
import Table from '../Table'
import { inventoryType } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'

const InventoryType: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedInventoryTypes = useAppSelector(state => state.inventoryType.list)

    const rowsLength = useAppSelector(state => state.inventoryType.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(inventoryTypeReducer.fetchWithOffset(currentOffset(currentPage)))
    }, [currentPage])

    const [typeName, setTypeName] = useState('')
    const [typeSlug, setTypeSlug] = useState('')

    return (
        <>
            <h1 className='h1'>Тип инвентаря</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={typeName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя инвентаря'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='text'
                    value={typeSlug}
                    onChange={e => setTypeSlug(e.target.value)}
                    placeholder='slug инвентаря'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatch(
                            inventoryTypeReducer.create({
                                name: typeName,
                                slug: typeSlug,
                                desc: null,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать тип инвентаря
                </button>
            </div>
            <Table
                columns={inventoryType}
                data={fetchedInventoryTypes}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default InventoryType
