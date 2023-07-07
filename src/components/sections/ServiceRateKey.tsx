import React, { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { serviceRateKeyReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'
import getEntity from '../../helpers/fixMe'
import { IServiceRateKey } from '../../models/serviceRateKey'
import Spinner from '../Spinner'
import getValidationSchema from '../../config/getValidationSchema'

interface FormServiceRateKeyProps {
    id: number
    title: string | null
    mode: string
}

const FormServiceRateKey: FC<FormServiceRateKeyProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/service-rate-key')

    const { id, title, mode } = props
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.serviceRateKey.single)
        : ({} as IServiceRateKey)

    const formik = useFormik({
        initialValues: {
            name: data.name,
            model_name: data.model_name,
        },
        validationSchema: getValidationSchema('service-rate-key'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            // try {
            //     dispatch(permissionReducer.put(values))
            // } catch (e) {
            //     console.log(e)
            // }
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
                        Имя тарифа
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
                        Название модели
                    </h3>
                    <input
                        name='model_name'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.model_name}
                    />
                </div>

                <div className='input-wrapper'>
                    {isEdit ? (
                        <Button
                            title='Сохранить изменения'
                            handleClick={() => {
                                dispatch(
                                    serviceRateKeyReducer.patch({
                                        id,
                                        ...formik.values,
                                    }),
                                )
                                goBack()
                            }}
                        />
                    ) : (
                        <Button
                            title='Добавить тип тарифа'
                            handleClick={() => {
                                dispatch(
                                    serviceRateKeyReducer.create(formik.values),
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

const ServiceRateKey: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)

    useEffect(() => {
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
                        <FormServiceRateKey id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceRateKey
