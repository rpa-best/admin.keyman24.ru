import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import {
    permissionLevelReducer,
    permissionReducer,
    rateNestedServiceReducer,
    serviceRateKeyReducer,
} from '../../store'
import Input from '../Input'
import Button from '../Button'
import getEntity from '../../helpers/fixMe'
import { IServiceRate } from '../../models/serviceRate'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Spinner from '../Spinner'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'
import CheckBoxSwitch from '../CheckBoxSwitch'

interface FormSeviceRateProps {
    id: number
    title: string | null
    mode: string
    rateId: number
}

const FormSeviceRate: FC<FormSeviceRateProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { id, title, mode, rateId } = props
    const goBack = () => navigate(`/subscription-service/${id}/edit`)
    const fetchedKeys = useAppSelector(
        state => state.serviceRateKey.list,
    )
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.rateNestedService.single)
        : ({} as IServiceRate)

    const temp = fetchedKeys.map(item => {
        return {
            value: item.model_name,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            value: data.value,
            not_limeted: data.not_limeted ?? false,
            key: data?.key?.model_name,
        },
        validationSchema: getValidationSchema('rate-nested-service'),
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
                        Значение
                    </h3>
                    <input
                        name='value'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.value}
                    />
                </div>

                {/* <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Ключ
                    </h3>
                    <input
                        name='key'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.key}
                    />
                </div> */}

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Модель
                    </h3>
                    <Select
                        placeholder='выберите модель'
                        noOptionsMessage={() => 'name not found'}
                        styles={selectStyles}
                        defaultOptions={temp}
                        theme={theme => themeUnset(theme)}
                        name='key'
                        value={
                            (temp
                                ? temp.find(
                                      option =>
                                          option.value === formik.values.key,
                                  )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('key', e.value)}
                    />
                </div>

                <CheckBoxSwitch
                    name='not_limeted'
                    label='Безлимитная'
                    value={formik.values.not_limeted}
                    onBlur={formik.handleBlur}
                    checked={formik.values.not_limeted}
                    onChange={() =>
                        formik.setFieldValue(
                            'not_limeted',
                            !formik.values.not_limeted,
                        )
                    }
                />

                <div className='input-wrapper'>
                    {isEdit ? (
                        <Button
                            title='Сохранить изменения'
                            handleClick={() => {
                                dispatch(
                                    rateNestedServiceReducer.putNested(
                                        {
                                            id: rateId,
                                            service: id,
                                            ...formik.values,
                                        },
                                        {
                                            id,
                                            endpoint: 'rate',
                                        },
                                    ),
                                )
                                goBack()
                            }}
                        />
                    ) : (
                        <Button
                            title='Добавить тариф'
                            handleClick={() => {
                                dispatch(
                                    rateNestedServiceReducer.createNested(
                                        formik.values,
                                        {
                                            id,
                                            endpoint: 'rate',
                                        },
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

const RateNestedService: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { id, mode, endpointOriginal, endpointNested, rateId } = loaderData
    const { reducer, callSelector, title } = getEntity('rate-nested-service')

    useEffect(() => {
        dispatch(serviceRateKeyReducer.fetch())
        switch (mode) {
            case 'edit':
                dispatch(
                    reducer.fetchByIdNested(rateId, {
                        id,
                        endpoint: 'rate',
                    }),
                )
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
                        <FormSeviceRate
                            id={id}
                            title={title}
                            mode={mode}
                            rateId={rateId}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateNestedService
