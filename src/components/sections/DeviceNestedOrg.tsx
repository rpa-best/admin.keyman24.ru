/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { deviceReducer } from '../../store'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Button from '../Button'
import '../../assets/styles/scss/section.scss'
import getEntity from '../../helpers/fixMe'
import Spinner from '../Spinner'
import { IDeviceNested } from '../../models/device'
import getValidationSchema from '../../config/getValidationSchema'

interface FormDeviceNestedOrgProps {
    id: number
    mode: string
    endpoint: string
}

const FormDeviceNestedOrg: FC<FormDeviceNestedOrgProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { id, mode, endpoint } = props
    const { reducer, title, endpointOriginal, endpointNested } =
        getEntity(endpoint)
    const fetchedDevices = useAppSelector(state => state.device.list)
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.deviceNestedOrg.single)
        : ({} as IDeviceNested)
    
    console.log('endpoint', endpoint) // ?

    const temp = fetchedDevices.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            id: data.id,
        },
        validationSchema: getValidationSchema('device-nested-org'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(
                    reducer.putNested(values, { id, endpoint: endpointNested }),
                )
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
                <h1>{`${title} / Добавление`}</h1>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Устройство
                    </h3>
                    <Select
                        placeholder='выбрать устройство'
                        noOptionsMessage={() => 'name not found'}
                        styles={selectStyles}
                        defaultOptions={temp}
                        theme={theme => themeUnset(theme)}
                        name='id'
                        value={
                            (temp
                                ? temp.find(
                                      option =>
                                          option.value === formik.values.id,
                                  )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('id', e.value)}
                    />
                </div>

                <div className='input-wrapper'>
                    {isEdit && (
                        <Button
                            title='Добавить устройство'
                            handleClick={() => {
                                dispatch(
                                    reducer.createNested({device: formik.values.id}, {
                                        id,
                                        endpoint: endpointNested,
                                    }),
                                )
                                navigate(`/org/${id}/${mode}`)
                            }}
                        />
                    )}
                    <Button
                        title='Вернуться'
                        handleClick={() => {
                            navigate(`/org/${id}/${mode}`)
                        }}
                    />
                </div>
            </fieldset>
        </Form>
    )
}

const DeviceNestedOrg: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { id, mode, endpointOriginal, endpointNested } = loaderData
    const isLoading = useAppSelector(state => state.device.isLoading)

    useEffect(() => {
        dispatch(deviceReducer.fetch())
    }, [])

    if (isLoading === 'list') {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper flex-column'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormDeviceNestedOrg
                            id={id}
                            mode={mode}
                            endpoint={`${endpointNested}-nested-${endpointOriginal}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceNestedOrg
