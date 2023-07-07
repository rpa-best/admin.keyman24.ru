import React, { FC, useEffect } from 'react'
import Select from 'react-select/async'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import {
    organizationReducer,
    subscriptionRequestReducer,
    subscriptionServiceReducer,
    systemMessageReducer,
    workerReducer,
} from '../../store'
import Button from '../Button'
import Input from '../Input'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import getEntity from '../../helpers/fixMe'
import Spinner from '../Spinner'
import { ISubscriptionRequest } from '../../models/subscriptionRequest'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'
import CustomDatePicker from '../DatePicker'
import isEmptyString from '../../helpers/isEmptyString'

interface FormSubscriptionRequestProps {
    id: number
    title: string | null
    mode: string
}

const FormSubscriptionRequest: FC<FormSubscriptionRequestProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/subscription-request')

    const { id, title, mode } = props
    const fetchedOrgs = useAppSelector(state => state.organization.list)
    const fetchedWorkers = useAppSelector(state => state.worker.list)
    const fetchedServices = useAppSelector(
        state => state.subscriptionService.list,
    )
    const fetchedMessages = useAppSelector(state => state.systemMessage.list)
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.subscriptionRequest.single)
        : ({} as ISubscriptionRequest)

    const orgs = fetchedOrgs.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const workers = fetchedWorkers.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const services = fetchedServices.map(item => {
        return {
            value: item.slug,
            label: item.name,
        }
    })

    const messages = fetchedMessages.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            start_date: '',
            end_date: '',
            org: 0,
            worker: 0,
            phone: data.phone,
            desc: data.desc,
            service: data.service,
            message: data.message,
        },
        validationSchema: getValidationSchema('subscription-request'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                // if (
                //     values.start_date !== null &&
                //     values.end_date !== null &&
                //     values.start_date !== '' &&
                //     values.end_date !== '' &&
                //     values.org !== 0 &&
                //     values.worker !== 0
                // ) {
                //     dispatch(subscriptionRequestReducer.patch(values))
                // } else console.log('emptyFields123')
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
                    <h1>{`${title} / Подтверждение`}</h1>
                ) : (
                    <h1>{`${title} / Добавление`}</h1>
                )}

                <div className='d-flex row row-cols-2 justify-content-between'>
                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Дата начала
                        </h3>
                        {/* <input
                            name='start_date'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.start_date}
                        /> */}
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
                        {/* <input
                            name='end_date'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.end_date}
                        /> */}
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

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Телефон
                        </h3>
                        <input
                            name='phone'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.phone)}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Описание
                        </h3>
                        <input
                            name='desc'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.desc)}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
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
                                              option.value ===
                                              formik.values.org,
                                      )
                                    : '') as any
                            }
                            onChange={e => formik.setFieldValue('org', e.value)}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Работник
                        </h3>
                        <Select
                            placeholder='выбрать работника'
                            noOptionsMessage={() => 'name not found'}
                            styles={selectStyles}
                            defaultOptions={workers}
                            theme={theme => themeUnset(theme)}
                            name='worker'
                            value={
                                (workers
                                    ? workers.find(
                                          option =>
                                              option.value ===
                                              formik.values.worker,
                                      )
                                    : '') as any
                            }
                            onChange={e =>
                                formik.setFieldValue('worker', e.value)
                            }
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
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
                            onChange={e =>
                                formik.setFieldValue('service', e.value)
                            }
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Системное сообщение
                        </h3>
                        <Select
                            placeholder='выбрать сообщение'
                            noOptionsMessage={() => 'name not found'}
                            styles={selectStyles}
                            defaultOptions={messages}
                            theme={theme => themeUnset(theme)}
                            name='message'
                            value={
                                (messages
                                    ? messages.find(
                                          option =>
                                              option.value ===
                                              formik.values.message,
                                      )
                                    : '') as any
                            }
                            onChange={e =>
                                formik.setFieldValue('message', e.value)
                            }
                        />
                    </div>
                </div>

                <div className='input-wrapper'>
                    {isEdit && (
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
                                    formik.values.org !== 0 &&
                                    formik.values.worker !== 0
                                ) {
                                    dispatch(
                                        subscriptionRequestReducer.patch({
                                            id,
                                            ...formik.values,
                                        }),
                                    )
                                    goBack()
                                } else {
                                    console.log('emptyFields123')
                                    console.log(formik.values)
                                }
                            }}
                        >
                            Подтвердить запрос
                        </button>
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

const SubscriptionRequest: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)

    useEffect(() => {
        switch (mode) {
            case 'edit':
                dispatch(reducer.fetchById(id))
                dispatch(organizationReducer.fetchWithParams())
                dispatch(workerReducer.fetchWithParams())
                dispatch(subscriptionServiceReducer.fetchWithParams())
                dispatch(systemMessageReducer.fetchWithParams())
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
                        <FormSubscriptionRequest
                            id={id}
                            title={title}
                            mode={mode}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionRequest
