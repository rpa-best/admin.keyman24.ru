import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import {
    createGuestWorker,
    fetchGuestWorker,
    fetchByNameGuestWorker,
} from '../../store/slices/guestWorkerSlice'
import Table from '../Table'
import { organization } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import { organizationReducer } from '../../store'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Input from '../Input'
import Button from '../Button'

const Organization: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedOrgs = useAppSelector(state => state.organization.list)
    // const sortedFetchedOrgs = [...fetchedOrgs].sort((a, b) => (a.id > b.id ? 1 : -1))
    const fetchedGW = useAppSelector(state => state.guestWorker.guestWorker)

    const [org, setOrg] = useState('')
    const [guestWorker, setGuestWorker] = useState<number[]>([])

    const rowsLength = useAppSelector(state => state.organization.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(
            organizationReducer.fetchWithOffset(currentOffset(currentPage)),
        )
        dispatch(fetchGuestWorker())
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
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Организация</h1>
            <div className='d-flex mt-3'>
                <Select
                    placeholder='найти организацию'
                    noOptionsMessage={() => 'name not found'}
                    onChange={handleAddGuest}
                    isMulti
                    styles={selectStyles}
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions={temp}
                    theme={theme => themeUnset(theme)}
                />
                <Button
                    title='Загрузить организацию'
                    handleClick={() => {
                        dispatch(createGuestWorker(guestWorker))
                    }}
                />
            </div>

            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя организации'
                    value={org}
                    onChange={e => setOrg(e)}
                />
                <Button
                    title='Создать организацию'
                    handleClick={() => {
                        dispatch(
                            organizationReducer.create({ name: org }),
                        )
                    }}
                />
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
