import React, { FC, useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { workingAreaTypeReducer } from '../../store'
import Input from '../Input'
import Button from '../Button'
import getEntity from '../../helpers/fixMe'
import { IWorkingAreaType } from '../../models/workingAreaType'
import Spinner from '../Spinner'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'

interface FormWorkingAreaTypeProps {
    id: number
    title: string | null
    mode: string
}

const FormWorkingAreaType: FC<FormWorkingAreaTypeProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/working-area-type')

    const { id, title, mode } = props
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const data = isEdit
        ? useAppSelector(state => state.workingAreaType.single)
        : ({} as IWorkingAreaType)

    const formik = useFormik({
        initialValues: {
            name: data.name,
            slug: data.slug,
        },
        validationSchema: getValidationSchema('working-area-type'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            // try {
            //     dispatch(workingAreaTypeReducer.put(values))
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
                        Имя
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

                <div className='input-wrapper'>
                    {isEdit ? (
                        <Button
                            title='Сохранить изменения'
                            handleClick={() => {
                                dispatch(
                                    workingAreaTypeReducer.patch({
                                        id,
                                        ...formik.values,
                                    }),
                                )
                                goBack()
                            }}
                        />
                    ) : (
                        <Button
                            title='Добавить тип рабочего места'
                            handleClick={() => {
                                dispatch(
                                    workingAreaTypeReducer.create(formik.values),
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

const WorkingAreaType: FC = () => {
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
                        <FormWorkingAreaType id={id} title={title} mode={mode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkingAreaType
