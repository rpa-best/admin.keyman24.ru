import React, { FC, useEffect, useState } from 'react'
import '../../assets/styles/scss/sidebar.scss'
import { LayoutGroup } from 'framer-motion'
import SVGDropdownArrow from '../../assets/img/shared/arrows/arrow-left.svg'
import getSidebarData from '../../helpers/getSidebarData'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import useLocalStorage from '../../hooks/useLocalStorage'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import isEmptyString from '../../helpers/isEmptyString'
import SidebarLink from './SidebarLink'

const Sidebar: FC = () => {
    const dispatch = useAppDispatch()
    const [sidebarIsActive, setSidebarIsActive] = useLocalStorage<string>(
        'sidebarActive',
        nullToEmptyString(localStorage.getItem('sidebarActive')),
    )

    useEffect(() => {
        if (isEmptyString(localStorage.getItem('sidebarActive'))) {
            setSidebarIsActive(
                nullToEmptyString(localStorage.getItem('sidebarActive')),
            )
        }
    }, [])

    return (
        <div className='sidebar-wrapper d-flex'>
            <nav className={`sidebar d-flex flex-column ${sidebarIsActive}`}>
                <div className='toggle-wrapper d-flex'>
                    <button
                        type='button'
                        className='toggle'
                        onClick={() =>
                            setSidebarIsActive(prev =>
                                prev === '' ? 'close' : '',
                            )
                        }
                    >
                        <SVGDropdownArrow stroke='var(--text-color-my)' />
                    </button>
                </div>

                <div className='menu-bar d-flex h-100 flex-column justify-content-between'>
                    <div className='menu'>
                        <ul className='nav-links'>
                            {/* {isLoading && <InlineSpinner textColor='#fff' />}
                            {!isLoading && (
                                <LayoutGroup>
                                    {id
                                        && showLinks.map(item => {
                                            return (
                                                <SidebarLink
                                                    key={item.title}
                                                    {...item}
                                                />
                                            )
                                        })}
                                </LayoutGroup>
                            )} */}
                            <LayoutGroup>
                                {getSidebarData().map(item => {
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
