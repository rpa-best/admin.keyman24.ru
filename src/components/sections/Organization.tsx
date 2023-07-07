/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import {
    createGuestWorker,
    fetchGuestWorker,
    fetchByNameGuestWorker,
} from '../../store/slices/guestWorkerSlice'
import { organizationReducer, regionReducer } from '../../store'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Input from '../Input'
import Button from '../Button'
import '../../assets/styles/scss/section.scss'
import getEntity from '../../helpers/fixMe'
import { IOrganization } from '../../models/organization'
import Spinner from '../Spinner'
import Table from '../Table'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'
import PickListDevice from '../PickList/PickListDevice'

interface FormOrgProps {
    id: number
    title: string | null
    mode: string
}

const FormOrg: FC<FormOrgProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { id, title, mode } = props
    const fetchedGW = useAppSelector(state => state.guestWorker.guestWorker)
    const fetchedRegions = useAppSelector(state => state.region.list)
    const [guestWorker, setGuestWorker] = useState<number[]>([])
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.organization.single)
        : ({} as IOrganization)

    const temp = fetchedGW.map(item => {
        return {
            value: item.ID,
            label: `${item.NAME}`,
        }
    })

    const temp2 = fetchedRegions.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    interface SelectOptions {
        value: number
        label: string
    }

    const handleAddGuest = (e: any) => {
        setGuestWorker(e.map((item: any) => item.value))
    }

    const filterOptions = (inputValue: string): SelectOptions[] => {
        return fetchedGW.map(item => {
            return {
                value: item.ID,
                label: item.NAME,
            }
        })
    }

    const loadGW = (
        inputValue: string,
        callback: (options: SelectOptions[]) => void,
    ) => {
        setTimeout(() => {
            if (inputValue) {
                dispatch(fetchByNameGuestWorker(inputValue))
                callback(filterOptions(inputValue))
            }
        }, 500)
    }

    const formik = useFormik({
        initialValues: {
            name: data.name,
            inn: data.inn,
            address: data.address,
            phone: data.phone,
            email: data.email,
            region: data.region,
        },
        validationSchema: getValidationSchema('org'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(organizationReducer.put(values))
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

                <div className='d-flex row row-cols-3 justify-content-between'>
                    {isCreate && (
                        <div className='input-wrapper'>
                            <Select
                                placeholder='найти организацию'
                                noOptionsMessage={() => 'name not found'}
                                onChange={handleAddGuest}
                                isMulti
                                styles={selectStyles}
                                cacheOptions
                                loadOptions={loadGW}
                                defaultOptions={temp}
                                theme={theme => themeUnset(theme)}
                            />
                            <Button
                                title='Загрузить организацию'
                                handleClick={() => {
                                    dispatch(createGuestWorker(guestWorker))
                                }}
                            />
                        </div>
                    )}

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Имя организации
                        </h3>
                        <input
                            name='name'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            ИНН
                        </h3>
                        <input
                            name='inn'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.inn)}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Адрес
                        </h3>
                        <input
                            name='address'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.address)}
                        />
                    </div>
                </div>

                <div className='d-flex row row-cols-2 justify-content-between'>
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
                            Почта
                        </h3>
                        <input
                            name='email'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.email)}
                        />
                    </div>

                    {/* <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Регион
                        </h3>
                        <Select
                            placeholder='выбрать регион'
                            noOptionsMessage={() => 'name not found'}
                            styles={selectStyles}
                            defaultOptions={temp2}
                            theme={theme => themeUnset(theme)}
                            name='region'
                            value={
                                (temp2
                                    ? temp2.find(
                                          option =>
                                              option.value ===
                                              formik.values.region,
                                      )
                                    : '') as any
                            }
                            onChange={e =>
                                formik.setFieldValue('region', e.value)
                            }
                        />
                    </div> */}
                </div>

                <div className='input-row-wrapper justify-content-center'>
                    {isEdit ? (
                        <button
                            type='button'
                            className='custom-button'
                            style={{ marginLeft: '0px' }}
                            onClick={() => {
                                dispatch(
                                    organizationReducer.put({
                                        id,
                                        ...formik.values,
                                    }),
                                )
                                navigate('/org')
                            }}
                        >
                            Сохранить изменения
                        </button>
                    ) : (
                        <button
                            type='button'
                            className='custom-button'
                            style={{ marginLeft: '0px' }}
                            onClick={() => {
                                dispatch(
                                    organizationReducer.create(formik.values),
                                )
                                navigate('/org')
                            }}
                        >
                            Добавить организацию
                        </button>
                    )}
                    <button
                        type='button'
                        className='custom-button'
                        // style={{ marginLeft: '0px'}}
                        onClick={() => {
                            navigate('/org')
                        }}
                    >
                        Вернуться
                    </button>
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
    const [currentTab, setCurrentTab] = useState('org-nested-org')

    return (
        <div className='custom-tabs'>
            <div className='tabs-header-wrapper'>
                <ul className='nav nav-pills'>
                    <li className='nav-item'>
                        <button
                            type='button'
                            className={`nav-link ${
                                currentTab === 'org-nested-org' ? 'active' : ''
                            }`}
                            onClick={() => setCurrentTab('org-nested-org')}
                        >
                            Организация
                        </button>
                    </li>
                    <li className='nav-item'>
                        <button
                            type='button'
                            className={`nav-link ${
                                currentTab === 'device-nested-org'
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => setCurrentTab('device-nested-org')}
                        >
                            Устройство
                        </button>
                    </li>
                    <li className='nav-item'>
                        <button
                            type='button'
                            className={`nav-link ${
                                currentTab === 'subscription-nested-org'
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() =>
                                setCurrentTab('subscription-nested-org')
                            }
                        >
                            Подписки
                        </button>
                    </li>
                </ul>
            </div>
            {currentTab !== 'device-nested-org' && (
                <div className='tabs-content'>
                    <Table endpoint={currentTab} id={id} />
                </div>
            )}
            {currentTab === 'device-nested-org' && (
                <div className='tabs-content'>
                    <PickListDevice orgId={id} />
                </div>
            )}
        </div>
    )
}

const Organization: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const { reducer, callSelector, title } = getEntity(endpoint)

    useEffect(() => {
        dispatch(regionReducer.fetch())
        switch (mode) {
            case 'edit':
                dispatch(reducer.fetchById(id))
                break
            case 'create':
                dispatch(fetchGuestWorker())
                break
            default:
                break
        }
    }, [])

    if (callSelector().isLoading === 'single') {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper flex-column'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormOrg id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
            {mode === 'edit' && (
                <div
                    className='default-wrapper'
                    style={{ paddingTop: '0px', paddingBottom: '50px' }}
                >
                    <CustomTabs id={Number(id)} />
                </div>
            )}
        </div>
    )
}

export default Organization
