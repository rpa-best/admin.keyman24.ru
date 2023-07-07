import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import { permissionLevelReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'

const PermissionLevel: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [permName, setTypeName] = useState('')

    return (
        <div className='default-wrapper'>
            <div className='section-wrapper'>
                <div className='section-content'>
                    <h1>Добавить уровень права доступа</h1>
                    <div className='input-wrapper'>
                        <Input
                            placeholder='имя права доступа'
                            value={permName}
                            onChange={e => setTypeName(e)}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <Button
                            title='Создать уровень права доступа'
                            handleClick={() => {
                                dispatch(
                                    permissionLevelReducer.create({
                                        name: permName,
                                    }),
                                )
                                navigate('/permission-level')
                            }}
                        />
                        <Button
                            title='Вернуться'
                            handleClick={() => {
                                navigate('/permission-level')
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PermissionLevel
