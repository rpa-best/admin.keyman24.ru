import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { userReducer } from '../../store'
import Button from '../Button'
import Input from '../Input'
import Spinner from '../Spinner'
import { IUser, IUserSingle } from '../../models/user'
import $api from '../../http'
import PickListUser from '../PickList/PickListUser'
import PickListGroupUser from '../PickList/PickListGroupUser'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'
import CustomDatePicker from '../DatePicker'
import isEmptyString from '../../helpers/isEmptyString'

interface FormUserProps {
    username: string
    title: string | null
    mode: string
    data: IUserSingle
}

const FormUser: FC<FormUserProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/user')

    const {
        username, title, mode, data,
    } = props
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    // const data = isEdit
    //     ? useAppSelector(state => state.user.single)
    //     : ({} as IUser)

    // type IOP = yup.TypeOf

    const formik = useFormik({
        initialValues: {
            name: data.name,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
            surname: data.surname,
            birthday: data.birthday,
            bio: data.bio,
        },
        validationSchema: getValidationSchema('user'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(userReducer.put(values))
            } catch (e) {
                console.log(e)
            }
            return setSubmitting(false)
        },
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
    })

    const patchUser = async () => {
        try {
            const response = await $api.patch(`admin/user/${username}/`, {
                ...formik.values,
            })

            if (response.status !== 200) {
                throw new Error('Failed to patch user')
            }

            goBack()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Form onSubmit={formik.handleSubmit} autoComplete='off'>
            <fieldset disabled={formik.isSubmitting}>
                {isEdit ? (
                    <h1>{`${title} / Редактирование`}</h1>
                ) : (
                    <h1>{`${title} / Добавление`}</h1>
                )}

                <div className='d-flex row row-cols-3 justify-content-between'>
                    <div className='input-row-wrapper flex-column'>
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
                            value={nullToEmptyString(formik.values.name)}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Lastname
                        </h3>
                        <input
                            name='lastname'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.lastname)}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Surname
                        </h3>
                        <input
                            name='surname'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.surname)}
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
                            Email
                        </h3>
                        <input
                            name='email'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.email)}
                        />
                    </div>

                    <div className='input-row-wrapper flex-column'>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            Дата рождения
                        </h3>
                        {/* <input
                            name='birthday'
                            className='custom-input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={nullToEmptyString(formik.values.birthday)}
                        /> */}
                        <CustomDatePicker
                            date={
                                isEmptyString(formik.values.birthday)
                                    ? null
                                    : new Date(formik.values.birthday as any)
                            }
                            setDate={e =>
                                formik.setFieldValue(
                                    'birthday',
                                    e?.toISOString(),
                                )
                            }
                        />
                    </div>
                </div>

                <div className='input-wrapper flex-column'>
                    <h3
                        className='h5'
                        style={{ color: 'var(--text-color-my)' }}
                    >
                        Описание
                    </h3>
                    <input
                        name='bio'
                        className='custom-input'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={nullToEmptyString(formik.values.bio)}
                    />
                </div>

                <div className='input-wrapper'>
                    <Button
                        title='Сохранить изменения'
                        handleClick={() => {
                            patchUser()
                        }}
                    />
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

const User: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({} as IUserSingle)
    // const { reducer, callSelector, title } = getEntity(endpoint)

    const getData = async () => {
        try {
            const response = await $api.get<IUserSingle>(`admin/user/${id}/`)

            if (response.status !== 200) {
                throw new Error('Failed to get user')
            }

            setData(response.data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        switch (mode) {
        case 'edit':
            getData()
            break
        default:
            break
        }
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper flex-column'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormUser
                            username={id}
                            title='Пользователи'
                            mode={mode}
                            data={data}
                        />
                    </div>
                </div>
            </div>
            {mode === 'edit' && (
                <>
                    <div
                        className='default-wrapper'
                        style={{ paddingTop: '0px' }}
                    >
                        <PickListUser username={id} />
                    </div>
                    <div
                        className='default-wrapper'
                        style={{ paddingTop: '0px', paddingBottom: '50px' }}
                    >
                        <PickListGroupUser username={id} />
                    </div>
                </>
            )}
        </div>
    )
}

export default User
