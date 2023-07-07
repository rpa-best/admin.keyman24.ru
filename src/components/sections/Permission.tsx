import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { permissionLevelReducer, permissionReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'
import getEntity from '../../helpers/fixMe'
import { IPermission } from '../../models/permission'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Spinner from '../Spinner'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'

interface FormPermProps {
    id: number
    title: string | null
    mode: string
}

const FormPerm: FC<FormPermProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/permission')

    const { id, title, mode } = props
    const fetchedPermLevels = useAppSelector(
        state => state.permissionLevel.list,
    )
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.permission.single)
        : ({} as IPermission)

    const temp = fetchedPermLevels.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data.name,
            level: data.level as unknown as number,
            slug: data.slug,
        },
        validationSchema: getValidationSchema('permission'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(permissionReducer.put(values))
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
                        Имя права доступа
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
                        Уровень права доступа
                    </h3>
                    <Select
                        placeholder='выберите уровень'
                        noOptionsMessage={() => 'name not found'}
                        styles={selectStyles}
                        defaultOptions={temp}
                        theme={theme => themeUnset(theme)}
                        name='level'
                        value={
                            (temp
                                ? temp.find(
                                    option =>
                                        option.value === formik.values.level,
                                )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('level', e.value)}
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
                                    permissionReducer.put({
                                        id,
                                        ...formik.values,
                                    }),
                                )
                                goBack()
                            }}
                        />
                    ) : (
                        <Button
                            title='Добавить право доступа'
                            handleClick={() => {
                                dispatch(
                                    permissionReducer.create(formik.values),
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

const Permission: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)

    useEffect(() => {
        dispatch(permissionLevelReducer.fetch())
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
                        <FormPerm id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Permission
