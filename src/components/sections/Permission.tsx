import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { permissionReducer } from '../../store'
import Table from '../Table'
import { permission } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import Input from '../Input'
import Button from '../Button'

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
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Права доступа</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя права доступа'
                    value={permName}
                    onChange={e => setTypeName(e)}
                />
                <Input
                    placeholder='slug права доступа'
                    value={permSlug}
                    onChange={e => setTypeSlug(e)}
                />
                <Input
                    placeholder='уровень права доступа'
                    value={permLevel}
                    onChange={e => setTypeLevel(Number(e))}
                />
                <Button
                    title='Создать право доступа'
                    handleClick={() => {
                        dispatch(
                            permissionReducer.create({
                                name: permName,
                                slug: permSlug,
                                level: permLevel,
                            }),
                        )
                    }}
                />
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
