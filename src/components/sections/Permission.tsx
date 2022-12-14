import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { permissionReducer } from '../../store'
import Table from '../Table'
import { permission } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'

const Permission: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedPermissions = useAppSelector(state => state.permission.list)

    const rowsLength = useAppSelector(state => state.permission.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(permissionReducer.fetchWithOffset(currentOffset(currentPage)))
    }, [currentPage])

    const [permName, setTypeName] = useState('')
    const [permSlug, setTypeSlug] = useState('')
    const [permLevel, setTypeLevel] = useState(0)

    return (
        <>
            <h1 className='h1'>Права доступа</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={permName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя права доступа'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='text'
                    value={permSlug}
                    onChange={e => setTypeSlug(e.target.value)}
                    placeholder='slug права доступа'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='number'
                    value={permLevel}
                    onChange={e => setTypeLevel(Number(e.target.value))}
                    placeholder='уровень права доступа'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatch(
                            permissionReducer.create({
                                name: permName,
                                slug: permSlug,
                                level: permLevel,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать право доступа
                </button>
            </div>
            <Table
                columns={permission}
                data={fetchedPermissions}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default Permission
