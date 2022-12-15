import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { permissionGroupReducer } from '../../store'
import Table from '../Table'
import { permissionGroup } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import Input from '../Input'
import Button from '../Button'

const PermissionGroup: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedPermissionGroups = useAppSelector(
        state => state.permissionGroup.list,
    )

    const rowsLength = useAppSelector(state => state.permissionGroup.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(
            permissionGroupReducer.fetchWithOffset(currentOffset(currentPage)),
        )
    }, [currentPage])

    const [permName, setTypeName] = useState('')
    const [permLevel, setTypeLevel] = useState(0)

    return (
        <>
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Группа Права доступа</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя права доступа'
                    value={permName}
                    onChange={e => setTypeName(e)}
                />
                <Input
                    placeholder='уровень права доступа'
                    value={permLevel}
                    onChange={e => setTypeLevel(Number(e))}
                />
                <Button
                    title='Создать группу права доступа'
                    handleClick={() => {
                        dispatch(
                            permissionGroupReducer.create({
                                name: permName,
                                level: permLevel,
                            }),
                        )
                    }}
                />
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
