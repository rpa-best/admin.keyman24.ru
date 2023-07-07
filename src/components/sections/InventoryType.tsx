import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import { inventoryTypeReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'

const InventoryType: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [typeName, setTypeName] = useState('')
    const [typeSlug, setTypeSlug] = useState('')

    return (
        <div className='default-wrapper'>
            <div className='section-wrapper'>
                <div className='section-content'>
                    <h1>Добавить тип инвентаря</h1>
                    <div className='input-wrapper'>
                        <Input
                            placeholder='имя инвентаря'
                            value={typeName}
                            onChange={e => setTypeName(e)}
                        />
                    </div>

                    <div className='input-wrapper'>
                        <Input
                            placeholder='slug инвентаря'
                            value={typeSlug}
                            onChange={e => setTypeSlug(e)}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <Button
                            title='Создать тип инвентаря'
                            handleClick={() => {
                                dispatch(
                                    inventoryTypeReducer.create({
                                        name: typeName,
                                        slug: typeSlug,
                                        desc: null,
                                    }),
                                )
                                navigate('/inventory-type')
                            }}
                        />
                        <Button
                            title='Вернуться'
                            handleClick={() => {
                                navigate('/inventory-type')
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryType
