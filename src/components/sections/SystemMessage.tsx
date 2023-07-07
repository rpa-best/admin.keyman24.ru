import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { systemMessageReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'
import getEntity from '../../helpers/fixMe'
import { ISystemMessage } from '../../models/systemMessage'
import Spinner from '../Spinner'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'

interface FormSysMesProps {
    id: number
    title: string | null
    mode: string
}

const FormSysMes: FC<FormSysMesProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/system-message')

    const { id, title, mode } = props
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.systemMessage.single)
        : ({} as ISystemMessage)

    const temp = [
        { value: 1, label: 'Ошибка' },
        { value: 2, label: 'Информация' },
        { value: 3, label: 'Предупреждение' },
        { value: 4, label: 'Успешно' },
    ]

    const formik = useFormik({
        initialValues: {
            name: data.name,
            slug: data.slug,
            desc: data.desc,
            type: data.type,
        },
        validationSchema: getValidationSchema('system-message'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(systemMessageReducer.put(values))
            } catch (e) {
                console.log(e)
            }
            return setSubmitting(false)
        },
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
    })

    return (
        <Form onSubmit={formik.handleSubmit} autoComplete='off'>
            <fieldset disabled={formik.isSubmitting}>
                {isEdit ? (
                    <h1>{`${title} / Редактирование`}</h1>
                ) : (
                    <h1>{`${title} / Добавление`}</h1>
                )}

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Имя системного сообщения
                    </h3>
                    <input
                        name='name'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Тип систменого сообщения
                    </h3>
                    <Select
                        placeholder='выберите тип'
                        noOptionsMessage={() => 'name not found'}
                        styles={selectStyles}
                        defaultOptions={temp}
                        theme={theme => themeUnset(theme)}
                        name='type'
                        value={
                            (temp
                                ? temp.find(
                                    option =>
                                        option.value === formik.values.type,
                                )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('type', e.value)}
                    />
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Описание системного сообщения
                    </h3>
                    <input
                        name='desc'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={nullToEmptyString(formik.values.desc)}
                    />
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        slug
                    </h3>
                    <input
                        name='slug'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={nullToEmptyString(formik.values.slug)}
                    />
                </div>

                <div className='input-wrapper'>
                    {isEdit ? (
                        <Button
                            title='Сохранить изменения'
                            handleClick={() => {
                                dispatch(
                                    systemMessageReducer.put({
                                        id,
                                        ...formik.values,
                                    }),
                                )
                                goBack()
                            }}
                        />
                    ) : (
                        <Button
                            title='Добавить системное сообщение'
                            handleClick={() => {
                                dispatch(
                                    systemMessageReducer.create(formik.values),
                                )
                                goBack()
                            }}
                        />
                    )}
                    <Button
                        title='Вернуться'
                        handleClick={() => {
                            goBack()
                        }}
                    />
                </div>
            </fieldset>
        </Form>
    )
}

const SystemMessage: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)

    useEffect(() => {
        // dispatch(permissionLevelReducer.fetch())
        switch (mode) {
        case 'edit':
            dispatch(reducer.fetchById(id))
            break
        default:
            break
        }
    }, [])

    if (callSelector().isLoading && mode !== 'create') {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormSysMes id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemMessage
