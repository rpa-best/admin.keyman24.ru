import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { regionReducer, regionTypeReducer } from '../../store'
import Table from '../Table'
import { region } from '../../config/tableHeaders'
import { currentOffset, pagesLength } from '../../helpers/tablePaginationHelper'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Input from '../Input'
import Button from '../Button'

const Region: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedRegions = useAppSelector(state => state.region.list)
    const fetchedRegionTypes = useAppSelector(state => state.regionType.list)

    const [regionName, setRegionName] = useState('')
    const [regionStatus, setRegionStatus] = useState<boolean>(false)
    const [regionParent, setRegionParent] = useState<number | undefined>(
        undefined,
    )
    const [regionType, setRegionType] = useState<number>(0)

    const temp = fetchedRegionTypes.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const temp2 = [
        { value: true, label: 'true' },
        { value: false, label: 'false ' },
    ]

    const temp3 = fetchedRegions.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const rowsLength = useAppSelector(state => state.region.count)
    const pagesCount = pagesLength(rowsLength)
    const [currentPage, setPage] = useState(1)

    useEffect(() => {
        dispatch(regionReducer.fetchWithOffset(currentOffset(currentPage)))
        dispatch(regionTypeReducer.fetch())
    }, [currentPage])

    const handleCreateRegion = () => {
        if (regionName && (regionType !== 0)) {
            dispatch(
                regionReducer.create({
                    name: regionName,
                    type: regionType,
                    status: regionStatus,
                    parent: regionParent,
                }),
            )
        }
    }

    return (
        <>
            <h1 className='h1' style={{ color: 'var(--text-color-my)' }}>Регион</h1>
            <div className='d-flex mt-3'>
                <Input
                    placeholder='имя региона'
                    value={regionName}
                    onChange={e => setRegionName(e)}
                />
                <Select
                    options={temp}
                    placeholder='выберите тип'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3'
                    styles={selectStyles}
                    onChange={(e: any) => {
                        setRegionType(e.value)
                    }}
                    theme={theme => themeUnset(theme)}
                />
                <Select
                    options={temp2}
                    placeholder='выберите cтатус'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3'
                    styles={selectStyles}
                    onChange={(e: any) => {
                        setRegionStatus(e.value)
                    }}
                    theme={theme => themeUnset(theme)}
                />
                <Select
                    options={temp3}
                    placeholder='выберите родителя'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3'
                    styles={selectStyles}
                    onChange={(e: any) => {
                        setRegionParent(e.value)
                    }}
                    theme={theme => themeUnset(theme)}
                />
                <Button
                    title='Создать Регион'
                    handleClick={() => {
                        handleCreateRegion()
                    }}
                />
            </div>
            <Table
                columns={region}
                data={fetchedRegions}
                pagesCount={pagesCount}
                currentPage={currentPage}
                handleSetPage={(value: number) => {
                    setPage(value)
                }}
            />
        </>
    )
}

export default Region
