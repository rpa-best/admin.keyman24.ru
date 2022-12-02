import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux-hooks'
import { login, setAuth } from '../store/slices/userSlice'
import Form from '../components/Form'

const LoginPage: FC = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setAuth()).then(() => {
                navigate(fromPage)
            })
        }
    }, [])

    const handleLogin = (username: string, password: string) => {
        dispatch(login({ username, password })).then(() => {
            navigate(fromPage)
        })
    }

    return <Form title='Login' handleClick={handleLogin} />
}

export default LoginPage
