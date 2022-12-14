import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { permissionLevelReducer } from '../../store'
import Table from '../Table'
import { permissionLevel } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'

const PermissionLevel: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedPermissionLevels = useAppSelector(
        state => state.permissionLevel.list,
    )

    const rowsLength = useAppSelector(state => state.permissionLevel.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(
            permissionLevelReducer.fetchWithOffset(currentOffset(currentPage)),
        )
    }, [currentPage])

    const [permName, setTypeName] = useState('')

    return (
        <>
            <h1 className='h1'>Уровень Права доступа</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={permName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя права доступа'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatch(
                            permissionLevelReducer.create({
                                name: permName,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать уровень права доступа
                </button>
            </div>

            <Table
                columns={permissionLevel}
                data={fetchedPermissionLevels}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default PermissionLevel
