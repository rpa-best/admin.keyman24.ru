import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { createOrg, fetchOrg } from '../store/slices/orgSlice'

const Organization: FC = () => {
    const dispatch = useAppDispatch()
    const fetchedOrgs = useAppSelector(state => state.org.org)

    useEffect(() => {
        dispatch(fetchOrg())
    }, [])

    const [org, setOrg] = useState('')
    return (
        <>
            <h1 className='h1'>Организация</h1>
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
                        await dispatch(createOrg(org))
                    }}
                    className='ms-3 p-3 rounded bg-dark border border-white'
                >
                    Создать организацию
                </button>
            </div>
            <table className='mt-5'>
                <thead>
                    <tr>
                        <td className='p-3'>id</td>
                        <td className='p-3'>имя</td>
                        <td className='p-3'>дата создания</td>
                    </tr>
                </thead>
                <tbody>
                    {fetchedOrgs.map(item => {
                        return (
                            <tr key={Date.now() + item.id}>
                                <td className='p-3'>{item.id}</td>
                                <td className='p-3'>{item.name}</td>
                                <td className='p-3'>{item.create_at}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Organization
