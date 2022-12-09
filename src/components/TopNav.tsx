import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../assets/styles/scss/topNav.scss'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { logout } from '../store/slices/userSlice'
import SVGNotifications from '../assets/img/topnav/notifications.svg'
import SVGMessages from '../assets/img/topnav/messages.svg'
import SVGAvatar from '../assets/img/topnav/avatar.svg'
import SVGDropdownArrow from '../assets/img/topnav/dropdown-arrow.svg'

const TopNav: FC = () => {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className='topnav-wrapper d-flex'>
            <div className='topnav d-flex w-100 justify-content-between'>
                <div className='title-wrapper d-flex'>
                    <Link to='/'>
                        <h1>KeyMan24</h1>
                    </Link>
                    {/* <span className='separator' /> */}
                    {/* <h2>Название системы</h2> */}
                </div>
                <div className='tools-wrapper d-flex'>
                    <input
                        className='search-line'
                        readOnly
                        role='button'
                        value='Выйти'
                        onClick={() => handleClick()}
                    />
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
                    <div className='user-wrapper d-flex'>
                        <div className='avatar tools-icon'>
                            <a href='/'>
                                <SVGAvatar
                                    style={{ height: '40px', width: '40px' }}
                                />
                            </a>
                        </div>
                        <div className='user d-flex flex-column justify-content-center align-items-center'>
                            <div className='name'>{`${user?.name} ${user?.surname}`}</div>
                            <div className='role'>{user?.username}</div>
                        </div>
                        <span className='dropdown-arr' />
                        <div className='dropdown-arr tools-icon d-flex align-items-center'>
                            <a href='/'>
                                <SVGDropdownArrow
                                    style={{ height: '7px', width: '14px' }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNav
