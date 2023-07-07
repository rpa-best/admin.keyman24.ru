/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { organizationReducer } from '../../store'
import { selectStyles, themeUnset } from '../../config/selectStyles'
import Button from '../Button'
import '../../assets/styles/scss/section.scss'
import getEntity from '../../helpers/fixMe'
import { IOrganizationNested } from '../../models/organization'
import Spinner from '../Spinner'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'
import CustomDatePicker from '../DatePicker'
import isEmptyString from '../../helpers/isEmptyString'
import $api from '../../http'
import SVGShare from '../../assets/img/shared/share.svg'

interface FormOrgNestedOrgProps {
    id: number
    mode: string
    endpoint: string
}

const FormOrgNestedOrg: FC<FormOrgNestedOrgProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { id, mode, endpoint } = props
    const { reducer, title, endpointOriginal, endpointNested } =
        getEntity(endpoint)
    const fetchedOrgs = useAppSelector(state => state.organization.list)
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.orgNestedOrg.single)
        : ({} as IOrganizationNested)

    const temp = fetchedOrgs.map(item => {
        return {
            value: item.id,
            label: item.name,
        }
    })

    const formik = useFormik({
        initialValues: {
            from_date: data.from_date,
            to_date: data.to_date,
            to_org: data.to_org?.id,
        },
        validationSchema: getValidationSchema('org-nested-org'),
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
            `admin/org/${id}/${endpointNested}/`,
            {
                ...formik.values,
                file,
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
                <h1>{`${title} / Добавление`}</h1>

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
                        defaultOptions={temp}
                        theme={theme => themeUnset(theme)}
                        name='to_org'
                        value={
                            (temp
                                ? temp.find(
                                      option =>
                                          option.value === formik.values.to_org,
                                  )
                                : '') as any
                        }
                        onChange={e => formik.setFieldValue('to_org', e.value)}
                    />
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Дата начала
                    </h3>
                    <CustomDatePicker
                        date={
                            isEmptyString(formik.values.from_date)
                                ? null
                                : new Date(formik.values.from_date as any)
                        }
                        setDate={e =>
                            formik.setFieldValue('from_date', e?.toISOString())
                        }
                    />
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Дата конца
                    </h3>
                    <CustomDatePicker
                        date={
                            isEmptyString(formik.values.to_date)
                                ? null
                                : new Date(formik.values.to_date as any)
                        }
                        setDate={e =>
                            formik.setFieldValue('to_date', e?.toISOString())
                        }
                    />
                </div>

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

                {/* <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Дата начала
                    </h3>
                    <input
                        name='from_date'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={nullToEmptyString(formik.values.from_date)}
                    />
                </div> */}

                {/* <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Дата конца
                    </h3>
                    <input
                        name='to_date'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={nullToEmptyString(formik.values.to_date)}
                    />
                </div> */}

                <div className='input-wrapper'>
                    {isEdit && (
                        <Button
                            title='Добавить организацию'
                            handleClick={() => {
                                handleAdd()
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

const OrgNestedOrg: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { id, mode, endpointOriginal, endpointNested } = loaderData
    const isLoading = useAppSelector(state => state.organization.isLoading)

    useEffect(() => {
        dispatch(organizationReducer.fetch())
    }, [])

    if (isLoading === 'list') {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper flex-column'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormOrgNestedOrg
                            id={id}
                            mode={mode}
                            endpoint={`${endpointOriginal}-nested-${endpointNested}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrgNestedOrg
