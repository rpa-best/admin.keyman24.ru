/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useState } from 'react'
import * as yup from 'yup'
import Select from 'react-select/async'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { regionReducer, regionTypeReducer } from '../../store'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Input from '../Input'
import Button from '../Button'
import getEntity from '../../helpers/fixMe'
import Spinner from '../Spinner'
import { IRegion } from '../../models/region'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'

interface FormRegionProps {
    id: number
    title: string | null
    mode: string
}

const FormRegion: FC<FormRegionProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/region')

    const { id, title, mode } = props
    const fetchedRegionTypes = useAppSelector(state => state.regionType.list)
    const fetchedRegions = useAppSelector(state => state.region.list)
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.region.single)
        : ({} as IRegion)

    const temp = fetchedRegionTypes.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const temp2 = fetchedRegions.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data.name === undefined ? '' : data.name,
            type: data.type?.id,
            parent: data.parent?.id,
            status: data.status === undefined ? false : data.status,
        },
        validationSchema: getValidationSchema('region'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(regionReducer.put(values))
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
                        Имя региона
                    </h3>
                    <input
                        name='name'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={nullToEmptyString(formik.values.name)}
                    />
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Тип региона
                    </h3>
                    <Select
                        placeholder='выберите тип региона'
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
                        Родительский регион
                    </h3>
                    <Select
                        placeholder='выберите родительский регион'
                        noOptionsMessage={() => 'name not found'}
                        styles={selectStyles}
                        defaultOptions={temp2}
                        theme={theme => themeUnset(theme)}
                        name='parent'
                        value={
                            (temp2
                                ? temp2.find(
                                    option =>
                                        option.value === formik.values.parent,
                                )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('parent', e.value)}
                    />
                </div>

                <div
                    className='input-wrapper d-flex align-items-center form-switch'
                    style={{ padding: '0px' }}
                >
                    <h3
                        className='h5 h-100 align-items-center d-flex'
                        style={{ color: 'var(--text-color-my)', margin: '0px' }}
                    >
                        Статус
                    </h3>
                    <input
                        name='status'
                        className='form-check-input'
                        style={{
                            margin: '10px',
                            height: '40px',
                            width: '80px',
                        }}
                        onBlur={formik.handleBlur}
                        type='checkbox'
                        // value={formik.values.status.toString()}
                        checked={formik.values.status}
                        onChange={() =>
                            formik.setFieldValue(
                                'status',
                                !formik.values.status,
                            )
                        }
                    />
                </div>

                <div className='input-wrapper'>
                    {isEdit ? (
                        <Button
                            title='Сохранить изменения'
                            handleClick={() => {
                                dispatch(
                                    regionReducer.put({
                                        id,
                                        ...formik.values,
                                    }),
                                )
                                goBack()
                            }}
                        />
                    ) : (
                        <Button
                            title='Добавить регион'
                            handleClick={() => {
                                dispatch(regionReducer.create(formik.values))
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

const Region: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)

    useEffect(() => {
        dispatch(regionTypeReducer.fetch())
        if (mode === 'edit') {
            dispatch(reducer.fetchById(id)).then(() => {
                dispatch(reducer.fetch())
            })
        } else {
            dispatch(reducer.fetch())
        }
        // dispatch(reducer.fetch())
        // switch (mode) {
        //     case 'edit':
        //         dispatch(reducer.fetchById(id))
        //         break
        //     default:
        //         break
        // }
    }, [])

    if (callSelector().isLoading === 'single' && mode !== 'create') {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormRegion id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Region
