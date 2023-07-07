import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../assets/styles/scss/topNav.scss'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks'
import { logout } from '../store/slices/userSlice'
import SVGNotifications from '../assets/img/topnav/notifications.svg'
import SVGMessages from '../assets/img/topnav/messages.svg'
import SVGAvatar from '../assets/img/topnav/avatar.svg'
import SVGDropdownArrow from '../assets/img/topnav/dropdown-arrow.svg'
import useTheme from '../hooks/useTheme'

const TopNav: FC = () => {
    const user = useAppSelector(state => state.account.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch(logout())
        navigate('/login')
    }

    const { theme, setTheme } = useTheme()

    const handleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className='topnav-wrapper d-flex'>
            <div className='topnav d-flex w-100 justify-content-between'>
                <div className='title-wrapper d-flex'>
                    <Link to='/'>
                        <h1>KeyMan24</h1>
                    </Link>
                    <span className='separator' />
                    <h2>Admin</h2>
                </div>
                <div className='tools-wrapper d-flex'>
                    {/* <input
                        className='search-line me-3'
                        readOnly
                        role='button'
                        value='Сменить тему'
                        onClick={() => handleTheme()}
                    />
                    <input
                        className='search-line'
                        readOnly
                        role='button'
                        value='Выйти'
                        onClick={() => handleClick()}
                    /> */}
                    <span className='separator' />
                    <div className='notifications tools-icon'>
                        <a href='/'>
                            <SVGNotifications
                                style={{ height: '24px', width: '22px' }}
                            />
                        </a>
                    </div>
                    <div
                        className='messages tools-icon'
                        style={{ marginLeft: '25px' }}
                    >
                        <a href='/'>
                            <SVGMessages
                                style={{ height: '22px', width: '24px' }}
                            />
                        </a>
                    </div>
                    <span className='separator' />
                    <div className='dropdown'>
                        <div
                            className='btn user-wrapper'
                            role='button'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                        >
                            <div className='avatar tools-icon'>
                                <SVGAvatar
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                    }}
                                />
                            </div>
                            <div className='user'>
                                <div className='name'>{`${user?.name} ${user?.surname}`}</div>
                                <div className='role'>{user?.username}</div>
                            </div>
                            <div className='dropdown-arr tools-icon'>
                                <SVGDropdownArrow
                                    style={{
                                        height: '15px',
                                        width: '15px',
                                    }}
                                />
                            </div>
                        </div>
                        <ul className='dropdown-menu'>
                            <li className='dropdown-item'>
                                <button
                                    type='button'
                                    onClick={() => handleTheme()}
                                >
                                    Сменить тему
                                </button>
                            </li>
                            <li className='dropdown-item'>
                                <button
                                    type='button'
                                    onClick={() => handleClick()}
                                >
                                    Выйти
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNav
