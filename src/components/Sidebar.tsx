/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useEffect, useState } from 'react'
import '../assets/styles/scss/sidebar.scss'
import { LayoutGroup } from 'framer-motion'
import SVGHome from '../assets/img/sidebar/home.svg'
import SVGBuilding from '../assets/img/sidebar/building.svg'
import SVGFingerprint from '../assets/img/sidebar/fingerprint.svg'
import SVGMarker from '../assets/img/sidebar/marker.svg'
import SVGBox from '../assets/img/sidebar/box.svg'
import SVGUsers from '../assets/img/sidebar/users.svg'
import SVGMail from '../assets/img/sidebar/mail.svg'
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
        },
        {
            title: 'Устройство',
            link: '/device',
            Icon: SVGFingerprint,
        },
        {
            title: 'Тип устройства',
            link: '/device-type',
            Icon: SVGFingerprint,
        },
        {
            title: 'Регион',
            link: '/region',
            Icon: SVGMarker,
        },
        {
            title: 'Тип региона',
            link: '/region-type',
            Icon: SVGMarker,
        },
        {
            title: 'Тип инвернтаря',
            link: '/inventory-type',
            Icon: SVGBox,
        },
        {
            title: 'Права доступа',
            link: '/permission',
            Icon: SVGUsers,
        },
        {
            title: 'Группа Права доступа',
            link: '/permission-group',
            Icon: SVGUsers,
        },
        {
            title: 'Уровень Права доступа',
            link: '/permission-level',
            Icon: SVGUsers,
        },
        {
            title: 'Системные сообщения',
            link: '/system-message',
            Icon: SVGMail,
        },
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
                    <span className='toggle' onClick={handleClose}>
                        <SVGDropdownArrow />
                    </span>
                </div>

                <div className='menu-bar d-flex h-100 flex-column justify-content-between'>
                    <div className='menu'>
                        <ul className='menu-links'>
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
