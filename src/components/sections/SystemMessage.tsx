import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { systemMessageReducer } from '../../store'
import Table from '../Table'
import { systemMessage } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'

const SystemMessage: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedSystemMessages = useAppSelector(state => state.systemMessage.list)

    const rowsLength = useAppSelector(state => state.systemMessage.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(systemMessageReducer.fetchWithOffset(currentOffset(currentPage)))
    }, [currentPage])

    const [sysMesName, setTypeName] = useState('')
    const [sysMesSlug, setTypeSlug] = useState('')
    const [sysMesDesc, setTypeDesc] = useState('')
    const [sysMesType, setType] = useState<1 | 2 | 3>(1)

    const temp = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
    ]

    return (
        <>
            <h1 className='h1'>Системные сообщения</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={sysMesName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя сообщения'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='text'
                    value={sysMesSlug}
                    onChange={e => setTypeSlug(e.target.value)}
                    placeholder='slug сообщения'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='text'
                    value={sysMesDesc}
                    onChange={e => setTypeDesc(e.target.value)}
                    placeholder='описние сообщения'
                    className='p-3 rounded bg-dark border border-white'
                />
                <Select
                    options={temp}
                    placeholder='выберите тип'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3 align-items-center d-flex'
                    onChange={(e: any) => {
                        setType(e.value)
                    }}
                    required
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatch(
                            systemMessageReducer.create({
                                name: sysMesName,
                                slug: sysMesSlug,
                                type: sysMesType,
                                desc: sysMesDesc,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать сообщение
                </button>
            </div>
            <Table
                columns={systemMessage}
                data={fetchedSystemMessages}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default SystemMessage
