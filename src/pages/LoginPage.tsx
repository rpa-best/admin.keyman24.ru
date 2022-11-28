import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux-hooks'
import { login, checkAuth } from '../store/slices/userSlice'
import Form from '../components/Form'

const LoginPage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth()).then(() => {
                navigate('/')
            })
        }
    }, [localStorage.getItem('token')])

    const handleLogin = (username: string, password: string) => {
        dispatch(login({ username, password })).then(() => {
            navigate('/')
        })
    }

    return <Form title='Login' handleClick={handleLogin} />
}

export default LoginPage
