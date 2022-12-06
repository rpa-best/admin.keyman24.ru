import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import {
    createRegionType,
    fetchRegionType,
} from '../store/slices/regionTypeSlice'

const RegionType: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedRegionTypes = useAppSelector(state => state.regionType.types)

    useEffect(() => {
        dispatch(fetchRegionType())
    }, [])

    const [typeName, setTypeName] = useState('')

    return (
        <>
            <h1 className='h1'>Тип региона</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={typeName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя региона'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={async () => {
                        await dispatch(
                            createRegionType(typeName),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать тип региона
                </button>
            </div>
            <table className='mt-5'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>имя</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedRegionTypes.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default RegionType
