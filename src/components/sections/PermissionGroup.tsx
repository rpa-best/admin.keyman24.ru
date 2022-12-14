import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { permissionGroupReducer } from '../../store'
import Table from '../Table'
import { permissionGroup } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'

const PermissionGroup: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedPermissionGroups = useAppSelector(state => state.permissionGroup.list)

    const rowsLength = useAppSelector(state => state.permissionGroup.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(permissionGroupReducer.fetchWithOffset(currentOffset(currentPage)))
    }, [currentPage])

    const [permName, setTypeName] = useState('')
    const [permLevel, setTypeLevel] = useState(0)

    return (
        <>
            <h1 className='h1'>Группа Права доступа</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={permName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя права доступа'
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
                            permissionGroupReducer.create({
                                name: permName,
                                level: permLevel,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать группу права доступа
                </button>
            </div>
            <Table
                columns={permissionGroup}
                data={fetchedPermissionGroups}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default PermissionGroup
