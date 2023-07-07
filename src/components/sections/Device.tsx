import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { deviceReducer, deviceTypeReducer } from '../../store'
import Button from '../Button'
import Input from '../Input'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import { IDevice } from '../../models/device'
import getEntity from '../../helpers/fixMe'
import $api from '../../http'
import ToastMessage from '../ToastMessage'
import Spinner from '../Spinner'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'

interface FormDeviceProps {
    id: number
    title: string | null
    mode: string
}

const FormDevice: FC<FormDeviceProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/device')

    const { id, title, mode } = props
    const fetchedDeviceTypes = useAppSelector(state => state.deviceType.list)
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.device.single)
        : ({} as IDevice)
    const [token, setToken] = useState<string>('')
    const [tokenLoading, setTokenLoading] = useState(true)
    const [tokenVisible, setTokenVisible] = useState(false)

    const temp = fetchedDeviceTypes.map(item => {
        return {
            value: item.slug,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data.name,
            type: data.type,
            desc: data.desc,
            sim_value: data.sim_value,
        },
        validationSchema: getValidationSchema('device'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(deviceReducer.put(values))
            } catch (e) {
                console.log(e)
            }
            return setSubmitting(false)
        },
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
    })

    const getToken = () => {
        if (isEdit) {
            $api.get(`admin/device/${id}/token/`).then(res => {
                if (res.status === 200) {
                    setToken(res.data.token)
                }
            })
        }
        setTokenLoading(false)
    }

    useEffect(() => {
        getToken()
    }, [])

    if (tokenLoading) {
        return <Spinner />
    }

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
                        Имя устройства
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
                        Тип устройства
                    </h3>
                    <Select
                        // options={temp}
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
                        // value={formik.values.type}
                        onChange={e => formik.setFieldValue('type', e.value)}
                    />
                </div>

                <div className='input-wrapper flex-column'>
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

                {isEdit && (
                    <div className='input-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Токен
                        </h3>
                        <div className='d-inline-flex'>
                            <input
                                type={tokenVisible ? 'text' : 'password'}
                                className='custom-input'
                                value={token}
                                readOnly
                            />
                            <Button
                                title='Регенерировать токен'
                                handleClick={() => {
                                    $api.post(`admin/device/${id}/generate/`).then(res => {
                                        if (res.status === 200) {
                                            setToken(res.data.token)
                                        }
                                    })
                                }}
                            />
                            <Button
                                title='Показать токен'
                                handleClick={() => {
                                    if (!tokenVisible) {
                                        navigator.clipboard.writeText(token)
                                        toast.success(
                                            <ToastMessage
                                                name='Токен скопирован'
                                                desc=''
                                            />,
                                            {
                                                position: 'bottom-right',
                                                toastId: 'customId',
                                                theme: 'colored',
                                            },
                                        )
                                    }
                                    setTokenVisible(prev => !prev)
                                }}
                            />
                        </div>
                    </div>
                )}

                <div className='input-wrapper'>
                    {isEdit ? (
                        <Button
                            title='Сохранить изменения'
                            handleClick={() => {
                                dispatch(
                                    deviceReducer.put({
                                        id,
                                        ...formik.values,
                                    }),
                                )
                                goBack()
                            }}
                        />
                    ) : (
                        <Button
                            title='Добавить устройство'
                            handleClick={() => {
                                dispatch(deviceReducer.create(formik.values))
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

const Device: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)

    useEffect(() => {
        dispatch(deviceTypeReducer.fetch())
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
                        <FormDevice id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Device
