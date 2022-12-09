import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { permissionLevelReducer } from '../store'

const PermissionLevel: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedPermissionLevels = useAppSelector(state => state.permissionLevel.list)

    useEffect(() => {
        dispatch(permissionLevelReducer.fetch())
    }, [])

    const [permName, setTypeName] = useState('')
    return (
        <>
            <h1 className='h1'>Уровень Права доступа</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={permName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя права доступа'
                    className='p-3 rounded bg-dark border border-white'
                />
                <button
                    type='button'
                    onClick={() => {
                        dispatch(
                            permissionLevelReducer.create({
                                name: permName,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать уровень права доступа
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
                    {fetchedPermissionLevels.map(item => {
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

export default PermissionLevel
