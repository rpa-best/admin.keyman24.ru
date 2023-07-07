import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import { deviceTypeReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'

const DeviceType: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [typeName, setTypeName] = useState('')
    const [typeSlug, setTypeSlug] = useState('')

    return (
        <div className='default-wrapper'>
            <div className='section-wrapper'>
                <div className='section-content'>
                    <h1>Добавить тип устройства</h1>
                    <div className='input-wrapper'>
                        <Input
                            placeholder='имя типа'
                            value={typeName}
                            onChange={e => setTypeName(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <Input
                            placeholder='slug устройства'
                            value={typeSlug}
                            onChange={e => setTypeSlug(e)}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <Button
                            title='Создать тип устройства'
                            handleClick={() => {
                                dispatch(
                                    deviceTypeReducer.create({
                                        name: typeName,
                                        slug: typeSlug,
                                    }),
                                )
                                navigate('/device-type')
                            }}
                        />
                        <Button
                            title='Вернуться'
                            handleClick={() => {
                                navigate('/device-type')
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceType
