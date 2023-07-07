import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import { regionTypeReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'

const RegionType: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [typeName, setTypeName] = useState('')

    return (
        <div className='default-wrapper'>
            <div className='section-wrapper'>
                <div className='section-content'>
                    <h1>Добавить тип региона</h1>
                    <div className='input-wrapper'>
                        <Input
                            placeholder='имя региона'
                            value={typeName}
                            onChange={e => setTypeName(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <Button
                            title='Создать тип региона'
                            handleClick={() => {
                                dispatch(
                                    regionTypeReducer.create({
                                        name: typeName,
                                    }),
                                )
                                navigate('/region-type')
                            }}
                        />
                        <Button
                            title='Вернуться'
                            handleClick={() => {
                                navigate('/region-type')
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegionType
