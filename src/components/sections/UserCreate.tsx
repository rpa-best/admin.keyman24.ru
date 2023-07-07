import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { userReducer } from '../../store'
import Button from '../Button'
import Input from '../Input'
import getEntity from '../../helpers/fixMe'
import Spinner from '../Spinner'
import { IUser, IUserInput, IUserSingle } from '../../models/user'
import $api from '../../http'
import PickListUser from '../PickList/PickListUser'
import PickListGroupUser from '../PickList/PickListGroupUser'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import getValidationSchema from '../../config/getValidationSchema'

const UserCreate: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { endpoint, id, mode } = loaderData
    const isEdit = mode === 'edit'
    const isCreate = mode === 'create'
    const title = 'Пользователи'
    const [data, setData] = useState({} as IUserInput)
    const navigate = useNavigate()
    const goBack = () => navigate('/user')

    const formik = useFormik({
        initialValues: {
            username: data.username,
            password1: data.password1,
            password2: data.password2,
        },
        validationSchema: getValidationSchema('user-create'),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            // try {
            //     dispatch(userReducer.put(values))
            // } catch (e) {
            //     console.log(e)
            // }
            return setSubmitting(false)
        },
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
    })

    const createUser = async () => {
        try {
            const response = await $api.post('admin/user/', formik.values)

            if (response.status !== 201) {
                throw new Error('Failed to create user')
            }

            goBack()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='outlet-wrapper flex-column'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
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
                                        style={{
                                            color: 'var(--text-color-my)',
                                        }}
                                    >
                                        Username
                                    </h3>
                                    <input
                                        name='username'
                                        className='custom-input'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                    />
                                </div>
                                <div className='input-wrapper flex-column'>
                                    <h3
                                        className='h5'
                                        style={{
                                            color: 'var(--text-color-my)',
                                        }}
                                    >
                                        Пароль
                                    </h3>
                                    <input
                                        name='password1'
                                        className='custom-input'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password1}
                                    />
                                </div>
                                <div className='input-wrapper flex-column'>
                                    <h3
                                        className='h5'
                                        style={{
                                            color: 'var(--text-color-my)',
                                        }}
                                    >
                                        Подтверждение пароля
                                    </h3>
                                    <input
                                        name='password2'
                                        className='custom-input'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password2}
                                    />
                                </div>

                                <div className='input-wrapper'>
                                    <Button
                                        title='Добавить пользователя'
                                        handleClick={() => {
                                            createUser()
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCreate
