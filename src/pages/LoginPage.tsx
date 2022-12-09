import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppDispatch } from '../hooks/redux-hooks'
import { auth, setAuth } from '../store/slices/userSlice'
import '../assets/styles/scss/loginPage.scss'

const circleAnimation = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: (custom: any) => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    }),
}

const LoginPage: FC = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'

    const [name, setUsername] = useState('')
    const [pass, setPass] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setAuth()).then(() => {
                navigate(fromPage)
            })
        }
    }, [])

    const handleLogin = (username: string, password: string) => {
        dispatch(auth({ username, password })).then(() => {
            dispatch(setAuth()).then(() => {
                navigate(fromPage)
            })
        })
    }

    // return <Form title='Login' handleClick={handleLogin} />
    return (
        <motion.div
            initial='hidden'
            whileInView='visible'
            className='login-wrapper d-flex min-vh-100'
        >
            <motion.span
                custom={1}
                variants={circleAnimation}
                className='circle c-1'
            />
            <motion.span
                custom={2}
                variants={circleAnimation}
                className='circle c-2'
            />
            <motion.span
                custom={3}
                variants={circleAnimation}
                className='circle c-3'
            />
            <motion.span
                custom={4}
                variants={circleAnimation}
                className='circle c-4'
            />
            <div className='preview-wrapper flex-column w-100'>
                <h1 className='logo'>KeyMan24</h1>
                <div className='preview-content d-flex flex-column justify-content-center h-100'>
                    <h1>Lorem ipsum </h1>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tempora blanditiis eveniet quis eaque quisquam
                        repudiandae. Inventore enim, odio unde velit dicta
                        deserunt! Provident ullam reprehenderit recusandae a,
                        vel quia aperiam.
                    </span>
                </div>
            </div>
            <div className='form-wrapper d-flex flex-column w-100'>
                <h1 className='logo'>KeyMan24</h1>
                <div className='form-content-wrapper d-flex justify-content-center align-items-center h-100 w-100'>
                    <div className='form-content d-flex flex-column'>
                        <h1 className='h1'>Вход</h1>
                        <input
                            type='text'
                            value={name}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Введите логин'
                            style={{ marginTop: '35px' }}
                        />
                        <input
                            type='password'
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            placeholder='Введите пароль'
                            style={{ marginTop: '30px' }}
                        />
                        <span style={{ textDecorationLine: 'underline' }}>
                            <a href='/'>Забыли пароль</a>
                        </span>
                        <button
                            type='button'
                            onClick={() => handleLogin(name, pass)}
                            style={{ marginTop: '29px' }}
                        >
                            Войти
                        </button>
                        <span>
                            Вводя свой логин, вы подтверждаете, что согласны с
                            нашими
                            <a href='/' className='text-green'>
                                {' '}
                                Условиями предоставления услуг.
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default LoginPage
