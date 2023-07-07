import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { permissionGroupReducer, permissionLevelReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'
import getEntity from '../../helpers/fixMe'
import { IPermissionGroup } from '../../models/permission'
import Spinner from '../Spinner'
import getValidationSchema from '../../config/getValidationSchema'
import PickListPermission from '../PickList/PickListPermission'

interface FormPermGroupProps {
    id: number
    title: string | null
    mode: string
}

const FormPermGroup: FC<FormPermGroupProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/permission-group')

    const { id, title, mode } = props
    const fetchedPermLevels = useAppSelector(
        state => state.permissionLevel.list,
    )
    const tempLoading = useAppSelector(state => state.permissionLevel.isLoading)
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.permissionGroup.single)
        : ({} as IPermissionGroup)

    const temp = fetchedPermLevels.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data.name,
            level: data.level,
        },
        validationSchema: getValidationSchema('permission-group'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(permissionGroupReducer.put(values))
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
                        Имя группы права доступа
                    </h3>
                    <input
                        name='name'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                </div>

                {/* <div className='input-wrapper flex-column'>
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
                </div> */}

                {isCreate ? (
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
                                              option.value ===
                                              formik.values.level,
                                      )
                                    : '') as any
                            }
                            onChange={e =>
                                formik.setFieldValue('level', e.value)
                            }
                        />
                    </div>
                ) : (
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <>
                        {tempLoading ? (
                            <Spinner />
                        ) : (
                            <div className='input-wrapper flex-column'>
                                <h3
                                    className='h5'
                                    style={{ color: 'var(--text-color-my)' }}
                                >
                                    Уровень права доступа
                                </h3>
                                <input
                                    readOnly
                                    name='level'
                                    className='custom-input'
                                    // onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                        (
                                            (temp
                                                ? temp.find(
                                                      option =>
                                                          option.value ===
                                                          formik.values.level,
                                                  )
                                                : '') as any
                                        )?.label || ''
                                    }
                                />
                            </div>
                        )}
                    </>
                )}

                <div className='input-wrapper'>
                    {isEdit ? (
                        <Button
                            title='Сохранить изменения'
                            handleClick={() => {
                                dispatch(
                                    permissionGroupReducer.patch({
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
                                    permissionGroupReducer.create(
                                        formik.values,
                                    ),
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

const PermissionGroup: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)
    const tempLoading = useAppSelector(state => state.permissionLevel.isLoading)
    const permGroup = useAppSelector(state => state.permissionGroup.single)

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

    if (
        callSelector().isLoading !== null &&
        mode !== 'create'
        // (tempLoading !== null && mode !== 'create')
    ) {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper flex-column'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormPermGroup id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
            {mode === 'edit' && permGroup.level !== undefined && (
                <div
                    className='default-wrapper'
                    style={{ paddingTop: '0px', paddingBottom: '50px' }}
                >
                    <PickListPermission id={id} level={permGroup.level} />
                </div>
            )}
        </div>
    )
}

export default PermissionGroup
