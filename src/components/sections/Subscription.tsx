import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import {
    organizationReducer,
    subscriptionReducer,
    subscriptionServiceReducer,
    userReducer,
} from '../../store'
import Button from '../Button'
import Input from '../Input'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import getEntity from '../../helpers/fixMe'
import Spinner from '../Spinner'
import { ISubscription } from '../../models/subscription'
import getValidationSchema from '../../config/getValidationSchema'
import CustomDatePicker from '../DatePicker'
import isEmptyString from '../../helpers/isEmptyString'

interface FormSubscriptionProps {
    id: number
    title: string | null
    mode: string
}

const FormSubscription: FC<FormSubscriptionProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/subscription')

    const { id, title, mode } = props
    const fetchedOrgs = useAppSelector(state => state.organization.list)
    const fetchedUsers = useAppSelector(state => state.user.list)
    const fetchedServices = useAppSelector(
        state => state.subscriptionService.list,
    )
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.subscription.single)
        : ({} as ISubscription)

    const orgs = fetchedOrgs.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const users = fetchedUsers.map(item => {
        return {
            value: item.username,
            label: item.fullname,
        }
    })

    const services = fetchedServices.map(item => {
        return {
            value: item.slug,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            start_date: '',
            end_date: '',
            org: 0,
            user: data.user,
            service: data.service,
        },
        validationSchema: getValidationSchema('subscription'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                // console.log(values)
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
                        Организация
                    </h3>
                    <Select
                        placeholder='выбрать организацию'
                        noOptionsMessage={() => 'name not found'}
                        styles={selectStyles}
                        defaultOptions={orgs}
                        theme={theme => themeUnset(theme)}
                        name='org'
                        value={
                            (orgs
                                ? orgs.find(
                                      option =>
                                          option.value === formik.values.org,
                                  )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('org', e.value)}
                    />
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Пользователь
                    </h3>
                    <Select
                        placeholder='выбрать пользователя'
                        noOptionsMessage={() => 'name not found'}
                        styles={selectStyles}
                        defaultOptions={users}
                        theme={theme => themeUnset(theme)}
                        name='user'
                        value={
                            (users
                                ? users.find(
                                      option =>
                                          option.value === formik.values.user,
                                  )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('user', e.value)}
                    />
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Сервис
                    </h3>
                    <Select
                        placeholder='выбрать сервис'
                        noOptionsMessage={() => 'name not found'}
                        styles={selectStyles}
                        defaultOptions={services}
                        theme={theme => themeUnset(theme)}
                        name='service'
                        value={
                            (services
                                ? services.find(
                                      option =>
                                          option.value ===
                                          formik.values.service,
                                  )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('service', e.value)}
                    />
                </div>

                <div className='d-flex row row-cols-2 justify-content-between'>
                    {/* <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Дата начала
                        </h3>
                        <input
                            name='start_date'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.start_date}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Дата конца
                        </h3>
                        <input
                            name='end_date'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.end_date}
                        />
                    </div> */}

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Дата начала
                        </h3>
                        <CustomDatePicker
                            date={
                                isEmptyString(formik.values.start_date)
                                    ? null
                                    : new Date(formik.values.start_date as any)
                            }
                            setDate={e =>
                                formik.setFieldValue(
                                    'start_date',
                                    e?.toISOString(),
                                )
                            }
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Дата конца
                        </h3>
                        <CustomDatePicker
                            date={
                                isEmptyString(formik.values.end_date)
                                    ? null
                                    : new Date(formik.values.end_date as any)
                            }
                            setDate={e =>
                                formik.setFieldValue(
                                    'end_date',
                                    e?.toISOString(),
                                )
                            }
                        />
                    </div>
                </div>

                <div className='input-wrapper'>
                    {/* {isEdit ? (
                        <button
                            type='button'
                            className='custom-button'
                            style={{ marginLeft: '0px' }}
                            onClick={() => {
                                if (
                                    formik.values.start_date !== null &&
                                    formik.values.end_date !== null &&
                                    formik.values.start_date !== '' &&
                                    formik.values.end_date !== '' &&
                                    formik.values.org !== 0
                                ) {
                                    dispatch(
                                        subscriptionReducer.patch({
                                            id,
                                            ...formik.values,
                                        }),
                                    )
                                    goBack()
                                } else {
                                    console.log('emptyFields456')
                                    console.log(formik.values)
                                }
                            }}
                        >
                            Сохранить изменения
                        </button>
                    ) */}
                    {isCreate && (
                        <Button
                            title='Добавить подписку'
                            handleClick={() => {
                                if (
                                    formik.values.start_date !== null &&
                                    formik.values.end_date !== null &&
                                    formik.values.start_date !== '' &&
                                    formik.values.end_date !== '' &&
                                    formik.values.org !== 0
                                ) {
                                    dispatch(
                                        subscriptionReducer.create(
                                            formik.values,
                                        ),
                                    )
                                    goBack()
                                } else {
                                    console.log('emptyFields456')
                                    console.log(formik.values)
                                }
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

const Subscription: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)

    useEffect(() => {
        dispatch(organizationReducer.fetchWithParams())
        dispatch(userReducer.fetchWithParams())
        dispatch(subscriptionServiceReducer.fetchWithParams())
    }, [])

    if (callSelector().isLoading && mode !== 'create') {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormSubscription id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription
