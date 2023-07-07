import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { subscriptionServiceReducer } from '../../store'
import Button from '../Button'
import Input from '../Input'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import getEntity from '../../helpers/fixMe'
import Spinner from '../Spinner'
import { ISubscriptionService } from '../../models/subscriptionService'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'
import $api from '../../http'
import SVGShare from '../../assets/img/shared/share.svg'
import Table from '../Table'

interface FormSubscriptionServiceProps {
    id: number
    title: string | null
    mode: string
}

const FormSubscriptionService: FC<FormSubscriptionServiceProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/subscription-service')

    const { id, title, mode } = props
    // const fetchedDeviceTypes = useAppSelector(state => state.deviceType.list)
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.subscriptionService.single)
        : ({} as ISubscriptionService)

    // const temp = fetchedDeviceTypes.map(item => {
    //     return {
    //         value: item.slug,
    //         label: item.name,
    //     }
    // })

    const formik = useFormik({
        initialValues: {
            slug: data.slug,
            name: data.name,
            desc: data.desc,
            // image: data.image,
            price: data.price,
        },
        validationSchema: getValidationSchema('subscription-service'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(subscriptionServiceReducer.put(values))
            } catch (e) {
                console.log(e)
            }
            return setSubmitting(false)
        },
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
    })

    const [file, setFile] = useState<any>(null)

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        maxFiles: 1,
        multiple: false,
        async onDrop(files, fileRejections, event) {
            setFile(files[0])
        },
    })

    const handleAdd = async () => {
        const result = await $api.post(
            'admin/subscription/service/',
            {
                ...formik.values,
                image: file,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
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

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Имя сервиса
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
                        Описание сервиса
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
                        Цена сервиса
                    </h3>
                    <input
                        name='price'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                </div>

                {isCreate && (
                    <div className='images-wrapper row row-cols-4 row-cols-md-4'>
                        <div className='img-wrapper'>
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <div className='content-wrapper'>
                                    <input
                                        className='input-zone'
                                        {...getInputProps()}
                                    />
                                    <div className='text-center'>
                                        {!file ? (
                                            <>
                                                <p className='dropzone-content'>
                                                    Перетащите файл сюда или
                                                    нажмите, чтобы выбрать файл
                                                </p>
                                                <SVGShare stroke='var(--text-color-my)' />
                                            </>
                                        ) : (
                                            <p className='dropzone-content'>
                                                {file.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className='input-wrapper'>
                    {isEdit ? (
                        <Button
                            title='Сохранить изменения'
                            handleClick={() => {
                                dispatch(
                                    subscriptionServiceReducer.patch({
                                        id,
                                        ...formik.values,
                                    }),
                                )
                                goBack()
                            }}
                        />
                    ) : (
                        <Button
                            title='Добавить сервис'
                            handleClick={() => {
                                handleAdd()
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

export interface CustomTabsProps {
    id: number
}

const CustomTabs: FC<CustomTabsProps> = props => {
    const { id } = props
    const [currentTab, setCurrentTab] = useState('rate-nested-service')

    return (
        <div className='custom-tabs'>
            <div className='tabs-header-wrapper'>
                <ul className='nav nav-pills'>
                    <li className='nav-item'>
                        <button
                            type='button'
                            className={`nav-link ${
                                currentTab === 'rate-nested-service' ? 'active' : ''
                            }`}
                            onClick={() => setCurrentTab('rate-nested-service')}
                        >
                            Тариф
                        </button>
                    </li>
                </ul>
            </div>
            <div className='tabs-content'>
                <Table endpoint={currentTab} id={id} />
            </div>
        </div>
    )
}

const SubscriptionService: FC = () => {
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
        <div className='outlet-wrapper flex-column'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormSubscriptionService
                            id={id}
                            title={title}
                            mode={mode}
                        />
                    </div>
                </div>
            </div>
            {mode === 'edit' && (
                <div
                    className='default-wrapper'
                    style={{ paddingTop: '0px', paddingBottom: '50px' }}
                >
                    <CustomTabs id={id} />
                </div>
            )}
        </div>
    )
}

export default SubscriptionService
