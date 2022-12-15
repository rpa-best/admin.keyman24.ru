import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { systemMessageReducer } from '../../store'
import Table from '../Table'
import { systemMessage } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Input from '../Input'
import Button from '../Button'

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
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Системные сообщения</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя сообщения'
                    value={sysMesName}
                    onChange={e => setTypeName(e)}
                />
                <Input
                    placeholder='slug сообщения'
                    value={sysMesSlug}
                    onChange={e => setTypeSlug(e)}
                />
                <Input
                    placeholder='описние сообщения'
                    value={sysMesDesc}
                    onChange={e => setTypeDesc(e)}
                />
                <Select
                    options={temp}
                    placeholder='выберите тип'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3'
                    styles={selectStyles}
                    onChange={(e: any) => {
                        setType(e.value)
                    }}
                    theme={theme => themeUnset(theme)}
                />
                <Button
                    title='Создать сообщение'
                    handleClick={() => {
                        dispatch(
                            systemMessageReducer.create({
                                name: sysMesName,
                                slug: sysMesSlug,
                                type: sysMesType,
                                desc: sysMesDesc,
                            }),
                        )
                    }}
                />
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
