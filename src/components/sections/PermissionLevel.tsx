import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { permissionLevelReducer } from '../../store'
import Table from '../Table'
import { permissionLevel } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import Input from '../Input'
import Button from '../Button'

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
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Уровень Права доступа</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя права доступа'
                    value={permName}
                    onChange={e => setTypeName(e)}
                />
                <Button
                    title='Создать уровень права доступа'
                    handleClick={() => {
                        dispatch(
                            permissionLevelReducer.create({
                                name: permName,
                            }),
                        )
                    }}
                />
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
