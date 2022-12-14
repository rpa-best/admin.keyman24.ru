import React, { FC, useEffect, useRef, useState } from 'react'
import Select from 'react-select/async'
import socketHelper from '../../helpers/socketHelper'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
    createGuestWorker,
    fetchGuestWorker,
    fetchByNameGuestWorker,
} from '../../store/slices/guestWorkerSlice'
import Table from '../Table'
import { organization } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import { organizationReducer } from '../../store'

const Organization: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedOrgs = useAppSelector(state => state.organization.list)
    // const sortedFetchedOrgs = [...fetchedOrgs].sort((a, b) => (a.id > b.id ? 1 : -1))
    const fetchedGW = useAppSelector(state => state.guestWorker.guestWorker)

    const [org, setOrg] = useState('')
    const [guestWorker, setGuestWorker] = useState<number[]>([])

    const socket = useRef<WebSocket>()
    const { WS_URL } = process.env
    const fetcheduser = useAppSelector(state => state.user.user)

    const rowsLength = useAppSelector(state => state.organization.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(
            organizationReducer.fetchWithOffset(currentOffset(currentPage)),
        )
        dispatch(fetchGuestWorker())

        socket.current = new WebSocket(
            `${WS_URL}${fetcheduser?.username}/?token=${localStorage.getItem(
                'token',
            )}`,
        )

        socketHelper(socket.current, () =>
            dispatch(
                organizationReducer.fetchWithOffset(currentOffset(currentPage)),
            ))

        return () => socket.current?.close()
    }, [currentPage])

    const temp = fetchedGW.map(item => {
        return {
            value: item.ID,
            label: item.NAME,
        }
    })

    interface TempOptions {
        value: number
        label: string
    }

    const colorStyles = {
        valueContainer: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected ? 'red' : 'white',
        }),
        input: (base: any, state: any) => ({
            ...base,
            display: state.selectProps.menuIsOpen ? 'block' : 'none,',
        }),
    }

    const handleAddGuest = (e: any) => {
        setGuestWorker(e.map((item: any) => item.value))
    }

    const filterOptions = (inputValue: string): TempOptions[] => {
        return fetchedGW
            .map(item => {
                return {
                    value: item.ID,
                    label: item.NAME,
                }
            })
    }

    const loadOptions = (
        inputValue: string,
        callback: (options: TempOptions[]) => void,
    ) => {
        setTimeout(() => {
            if (inputValue) {
                dispatch(fetchByNameGuestWorker(inputValue))
                callback(filterOptions(inputValue))
            }
        }, 500)
    }

    return (
        <>
            <h1 className='h1'>Организация</h1>
            <div className='d-flex mt-3'>
                <Select
                    placeholder='найти организацию'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3 align-items-center d-flex'
                    onChange={handleAddGuest}
                    isMulti
                    styles={colorStyles}
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions={temp}
                />
                <button
                    type='button'
                    onClick={async () => {
                        await dispatch(createGuestWorker(guestWorker))
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Загрузить организацию
                </button>
            </div>

            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={org}
                    onChange={e => setOrg(e.target.value)}
                    placeholder='имя организации'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={async () => {
                        await dispatch(
                            organizationReducer.create({ name: org }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать организацию
                </button>
            </div>

            <Table
                columns={organization}
                data={fetchedOrgs}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default Organization
