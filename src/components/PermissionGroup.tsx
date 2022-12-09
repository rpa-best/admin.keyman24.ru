import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { permissionGroupReducer } from '../store'

const PermissionGroup: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedPermissionGroups = useAppSelector(state => state.permissionGroup.list)

    useEffect(() => {
        dispatch(permissionGroupReducer.fetch())
    }, [])

    const [permName, setTypeName] = useState('')
    const [permLevel, setTypeLevel] = useState(0)
    return (
        <>
            <h1 className='h1'>Группа Права доступа</h1>
            <div className='d-flex mt-3'>
                <input
                    type='text'
                    value={permName}
                    onChange={e => setTypeName(e.target.value)}
                    placeholder='имя права доступа'
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
                            permissionGroupReducer.create({
                                name: permName,
                                level: permLevel,
                            }),
                        )
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать группу права доступа
                </button>
            </div>
            <table className='mt-5'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>имя</td>
                        <td className='p-3'>уровень</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedPermissionGroups.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>{item.level}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default PermissionGroup
