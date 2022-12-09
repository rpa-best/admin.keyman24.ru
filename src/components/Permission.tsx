import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { permissionReducer } from '../store'

const Permission: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedPermissions = useAppSelector(state => state.permission.list)

    useEffect(() => {
        dispatch(permissionReducer.fetch())
    }, [])

    const [permName, setTypeName] = useState('')
    const [permSlug, setTypeSlug] = useState('')
    const [permLevel, setTypeLevel] = useState(0)
    return (
        <>
            <h1 className='h1'>Права доступа</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={permName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя права доступа'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='text'
                    value={permSlug}
                    onChange={e => setTypeSlug(e.target.value)}
                    placeholder='slug права доступа'
                    className='p-3 rounded bg-dark border border-white'
                />
                <input
                    type='number'
                    value={permLevel}
                    onChange={e => setTypeLevel(Number(e.target.value))}
                    placeholder='уровень права доступа'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatch(
                            permissionReducer.create({
                                name: permName,
                                slug: permSlug,
                                level: permLevel,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать право доступа
                </button>
            </div>
            <table className='mt-5'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>имя</td>
                        <td className='p-3'>slug</td>
                        <td className='p-3'>уровень</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedPermissions.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>{item.slug}</td>
                                <td className='p-3'>{item.level}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Permission
