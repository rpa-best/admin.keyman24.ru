/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/scss/sidebar.scss'

const Sidebar: FC = () => {
    const [close, setClose] = useState('close')

    const handleClose = () => {
        return close === '' ? setClose('close') : setClose('')
    }

    return (
        <div className='sidebar-wrapper d-flex'>
            <nav className={`sidebar d-flex flex-column ${close}`}>
                <div className='toggle-wrapper d-flex'>
                    <span className='toggle' onClick={handleClose}>
                        <img
                            alt='sidebar-toggle'
                            src={require('../assets/img/topnav/dropdown-arrow.svg')}
                        />
                    </span>
                </div>

                <div className='menu-bar d-flex h-100 flex-column justify-content-between'>
                    <div className='menu'>
                        <ul className='menu-links'>
                            <li className='nav-link'>
                                <Link to='/'>
                                    <span className='marker-link active' />
                                    <span className='icon'>
                                        <img
                                            alt='sidebar-toggle'
                                            src={require('../assets/img/sidebar/home.svg')}
                                        />
                                    </span>
                                    <span className='text nav-text'>
                                        Главная
                                    </span>
                                </Link>
                            </li>
                            <li className='nav-link'>
                                <Link to='org'>
                                    <span className='marker-link' />
                                    <span className='icon'>
                                        <img
                                            alt='sidebar-toggle'
                                            src={require('../assets/img/sidebar/building.svg')}
                                        />
                                    </span>
                                    <span className='text nav-text'>
                                        Организация
                                    </span>
                                </Link>
                            </li>
                            <li className='nav-link'>
                                <Link to='device'>
                                    <span className='marker-link' />
                                    <span className='icon'>
                                        <img
                                            alt='sidebar-toggle'
                                            src={require('../assets/img/sidebar/marker.svg')}
                                        />
                                    </span>
                                    <span className='text nav-text'>
                                        Устройство
                                    </span>
                                </Link>
                            </li>
                            <li className='nav-link'>
                                <Link to='device-type'>
                                    <span className='marker-link' />
                                    <span className='icon'>
                                        <img
                                            alt='sidebar-toggle'
                                            src={require('../assets/img/sidebar/layout-fluid.svg')}
                                        />
                                    </span>
                                    <span className='text nav-text'>
                                        Тип устройства
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
