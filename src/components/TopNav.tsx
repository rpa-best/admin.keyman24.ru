import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/scss/topNav.scss'

const TopNav: FC = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenRefresh')
        navigate('/login')
    }

    return (
        <div className='topnav-wrapper d-flex'>
            <div className='topnav d-flex w-100 justify-content-between'>
                <div className='title-wrapper d-flex'>
                    <h1>KeyMan24</h1>
                    {/* <span className='separator' /> */}
                    {/* <h2>Название системы</h2> */}
                </div>
                <div className='tools-wrapper d-flex'>
                    <input className='search-line' readOnly role='button' value='Купить подписку' onClick={() => handleClick()} />
                    <span className='separator' />
                    <div className='notifications tools-icon'>
                        <a href='/'>
                            <img
                                alt='notifications'
                                src={require('../assets/img/topnav/notifications.svg')}
                                style={{ height: '24px', width: '22px' }}
                            />
                        </a>
                    </div>
                    <div
                        className='messages tools-icon'
                        style={{ marginLeft: '25px' }}
                    >
                        <a href='/'>
                            <img
                                alt='messages'
                                src={require('../assets/img/topnav/messages.svg')}
                                style={{ height: '22px', width: '24px' }}
                            />
                        </a>
                    </div>
                    <span className='separator' />
                    <div className='user-wrapper d-flex'>
                        <div className='avatar tools-icon'>
                            <a href='/'>
                                <img
                                    alt='avatar'
                                    src={require('../assets/img/topnav/avatar.svg')}
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                    }}
                                />
                            </a>
                        </div>
                        <div className='user d-flex flex-column justify-content-center align-items-center'>
                            <div className='name'>Иван Иванов</div>
                            <div className='role'>Директор</div>
                        </div>
                        <span className='dropdown-arr' />
                        <div className='dropdown-arr tools-icon d-flex align-items-center'>
                            <a href='/'>
                                <img
                                    alt='dropdown-arr'
                                    src={require('../assets/img/topnav/dropdown-arrow.svg')}
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
