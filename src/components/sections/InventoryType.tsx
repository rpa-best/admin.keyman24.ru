import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { inventoryTypeReducer } from '../../store'
import Table from '../Table'
import { inventoryType } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import Input from '../Input'
import Button from '../Button'

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
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Тип инвентаря</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя инвентаря'
                    value={typeName}
                    onChange={e => setTypeName(e)}
                />
                <Input
                    placeholder='slug инвентаря'
                    value={typeSlug}
                    onChange={e => setTypeSlug(e)}
                />
                <Button
                    title='Создать тип инвентаря'
                    handleClick={() => {
                        dispatch(
                            inventoryTypeReducer.create({
                                name: typeName,
                                slug: typeSlug,
                                desc: null,
                            }),
                        )
                    }}
                />
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
