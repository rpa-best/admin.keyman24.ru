import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { inventoryTypeReducer } from '../store'

const InventoryType: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedInventoryTypes = useAppSelector(state => state.inventoryType.list)

    useEffect(() => {
        dispatch(inventoryTypeReducer.fetch())
    }, [])

    const [typeName, setTypeName] = useState('')
    const [typeSlug, setTypeSlug] = useState('')
    return (
        <>
            <h1 className='h1'>Тип инвентаря</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={typeName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя инвентаря'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='text'
                    value={typeSlug}
                    onChange={e => setTypeSlug(e.target.value)}
                    placeholder='slug инвентаря'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatch(
                            inventoryTypeReducer.create({
                                name: typeName,
                                slug: typeSlug,
                                desc: null,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать тип инвентаря
                </button>
            </div>
            <table className='mt-5'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>имя</td>
                        <td className='p-3'>slug</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedInventoryTypes.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>{item.slug}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default InventoryType
