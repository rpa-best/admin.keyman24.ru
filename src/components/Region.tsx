import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { regionReducer, regionTypeReducer } from '../store'

const Region: FC = () => {
    const dispatch = useAppDispatch()
    // const fetchedRegions = useAppSelector(state => state.region.region)
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

    useEffect(() => {
        dispatch(regionReducer.fetch())
        dispatch(regionTypeReducer.fetch())
    }, [])

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
            <h1 className='h1'>Регион</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={regionName}
                    onChange={e => setRegionName(e.target.value)}
                    placeholder='имя региона'
                    className='p-3 rounded bg-dark border border-white'
                />
                <Select
                    options={temp}
                    placeholder='выберите тип'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3 align-items-center d-flex'
                    onChange={(e: any) => {
                        setRegionType(e.value)
                    }}
                    required
                />
                <Select
                    options={temp2}
                    placeholder='выберите cтатус'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3 align-items-center d-flex'
                    onChange={(e: any) => {
                        setRegionStatus(e.value)
                    }}
                    required
                />
                <Select
                    options={temp3}
                    placeholder='выберите родителя'
                    noOptionsMessage={() => 'name not found'}
                    className='ms-3 align-items-center d-flex'
                    onChange={(e: any) => {
                        setRegionParent(e.value)
                    }}
                />
                <button
                    type='button'
                    onClick={() => handleCreateRegion()}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать Регион
                </button>
            </div>
            <table className='mt-3'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>имя</td>
                        <td className='p-3'>статус</td>
                        <td className='p-3'>имя типа</td>
                        <td className='p-3'>id родителя</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedRegions.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>
                                    {item.status.toString()}
                                </td>
                                <td className='p-3'>{item.type.name}</td>
                                <td className='p-3'>{item.parent?.id}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Region
