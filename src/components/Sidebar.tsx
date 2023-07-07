/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useEffect, useState } from 'react'
import '../assets/styles/scss/sidebar.scss'
import { LayoutGroup } from 'framer-motion'
import SVGHome from '../assets/img/sidebar/home.svg'
import SVGBuilding from '../assets/img/sidebar/building.svg'
import SVGFingerprint from '../assets/img/sidebar/fingerprint.svg'
import SVGMarker from '../assets/img/sidebar/marker.svg'
import SVGGlobe from '../assets/img/sidebar/globe.svg'
import SVGBox from '../assets/img/sidebar/box.svg'
import SVGUsers from '../assets/img/sidebar/users.svg'
import SVGFluid from '../assets/img/sidebar/layout-fluid.svg'
import SVGMail from '../assets/img/sidebar/mail.svg'
import SVGBackpack from '../assets/img/sidebar/backpack.svg'
import SVGWorker from '../assets/img/sidebar/worker.svg'
import SVGBriefcase from '../assets/img/sidebar/briefcase.svg'
import SVGUserLock from '../assets/img/sidebar/user-lock.svg'
import SVGListCheck from '../assets/img/sidebar/list-check.svg'
import SVGDropdownArrow from '../assets/img/topnav/dropdown-arrow.svg'
import SidebarLink, { SidebarLinkProps } from './SidebarLink'

const Sidebar: FC = () => {
    const menuData: SidebarLinkProps[] = [
        // {
        //     title: 'Главная',
        //     link: '/',
        //     Icon: SVGHome,
        // },
        {
            title: 'Организация',
            link: '/org',
            Icon: SVGBuilding,
            children: [],
        },
        {
            title: 'Устройство',
            link: '/device',
            Icon: SVGFingerprint,
            children: [
                {
                    title: 'Список устройств',
                    link: '/device',
                },
                {
                    title: 'Тип устройства',
                    link: '/device-type',
                },
            ],
        },
        {
            title: 'Регион',
            link: '/region',
            Icon: SVGGlobe,
            children: [
                {
                    title: 'Список регионов',
                    link: '/region',
                },
                {
                    title: 'Тип региона',
                    link: '/region-type',
                },
            ],
        },
        {
            title: 'Тип инвентаря',
            link: '/inventory-type',
            Icon: SVGBriefcase,
            children: [],
        },
        {
            title: 'Тип рабочего места',
            link: '/working-area-type',
            Icon: SVGBackpack,
            children: [],
        },
        {
            title: 'Права доступа',
            link: '/permission',
            Icon: SVGUserLock,
            children: [
                {
                    title: 'Список прав доступа',
                    link: '/permission',
                },
                {
                    title: 'Группа Права доступа',
                    link: '/permission-group',
                },
                {
                    title: 'Уровень Права доступа',
                    link: '/permission-level',
                },
            ],
        },
        {
            title: 'Подписки',
            link: '/subscription',
            Icon: SVGListCheck,
            children: [
                {
                    title: 'Список подписок',
                    link: '/subscription',
                },
                {
                    title: 'Подписки Сервис',
                    link: '/subscription-service',
                },
                {
                    title: 'Тип тарифа',
                    link: '/service-rate-key',
                },
                {
                    title: 'Запросы на подписку',
                    link: '/subscription-request',
                },
            ],
        },
        {
            title: 'Системные сообщения',
            link: '/system-message',
            Icon: SVGMail,
            children: [],
        },
        {
            title: 'Пользователи',
            link: '/user',
            Icon: SVGUsers,
            children: [],
        },
        // {
        //     title: 'Работники',
        //     link: '/worker',
        //     Icon: SVGWorker,
        //     children: [],
        // },
    ]

    const [close, setClose] = useState(localStorage.getItem('sidebarActive'))

    const handleClose = () => {
        if (close === '' || null) {
            setClose('close')
            localStorage.setItem('sidebarActive', 'close')
        } else {
            setClose('')
            localStorage.setItem('sidebarActive', '')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('sidebarActive')) {
            setClose(localStorage.getItem('sidebarActive'))
        }
    }, [close])

    return (
        <div className='sidebar-wrapper d-flex'>
            <nav className={`sidebar d-flex flex-column ${close}`}>
                <div className='toggle-wrapper d-flex'>
                    <button
                        type='button'
                        className='toggle'
                        onClick={() => handleClose()}
                    >
                        <SVGDropdownArrow />
                    </button>
                </div>

                <div className='menu-bar d-flex h-100 flex-column justify-content-between'>
                    <div className='menu'>
                        <ul className='nav-links'>
                            <LayoutGroup>
                                {menuData.map(item => {
                                    return (
                                        <SidebarLink
                                            key={item.title}
                                            {...item}
                                        />
                                    )
                                })}
                            </LayoutGroup>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
