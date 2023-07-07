/* eslint-disable react/no-array-index-key */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, SVGProps, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { motion } from 'framer-motion'
import SVGDropdownArrow from '../assets/img/topnav/dropdown-arrow.svg'

export interface SidebarLinkProps {
    title: string
    Icon: FC<SVGProps<SVGSVGElement>>
    link: string
    children: {
        title: string
        link: string
    }[]
}

const SidebarLink: FC<SidebarLinkProps> = props => {
    const { title, Icon, link, children } = props
    const match = useMatch({
        path: link,
        end: link.length === 1,
    })

    const temp =
        children.filter(item => {
            return useMatch({ path: item.link, end: item.link.length === 1 }) ? item : ''
        }).length !== 0

    const [showMenu, setShowMenu] = useState(temp ? 'showMenu' : '')

    const handleShowMenu = () => {
        if (showMenu === '' || null) {
            setShowMenu('showMenu')
        } else {
            setShowMenu('')
        }
    }

    return children.length === 0 ? (
        <li>
            <Link to={link}>
                {match ? (
                    <>
                        <motion.span
                            layoutId='activeItem'
                            className='marker-link active'
                        />
                        <span className='icon'>
                            <Icon fill='#31D79B' />
                        </span>
                        <span className='link_name text-color-active'>
                            {title}
                        </span>
                    </>
                ) : (
                    <>
                        <span className='marker-link' />
                        <span className='icon'>
                            <Icon fill='#A1A1A1' />
                        </span>
                        <span className='link_name text-color-inactive'>
                            {title}
                        </span>
                    </>
                )}
            </Link>
            {/* <ul className='sub-menu blank'>
                <li>
                    <a className='link_name' href='#'>
                        {title}
                    </a>
                </li>
            </ul> */}
        </li>
    ) : (
        <li className={showMenu}>
            <div className='iocn-link'>
                <Link to={link}>
                    {temp ? (
                        <>
                            <motion.span
                                layoutId='activeItem'
                                className='marker-link active'
                            />
                            <span className='icon'>
                                <Icon fill='#31D79B' />
                            </span>
                            <span className='link_name text-color-active'>
                                {title}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className='marker-link' />
                            <span className='icon'>
                                <Icon fill='#A1A1A1' />
                            </span>
                            <span className='link_name text-color-inactive'>
                                {title}
                            </span>
                        </>
                    )}
                </Link>
                <SVGDropdownArrow className='arrow' onClick={() => handleShowMenu()} />
            </div>

            <span className='marker-link' />
            <ul className='sub-menu'>
                {/* <li>
                    <a className='link_name'>{title}</a>
                </li> */}
                {children.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link
                                to={item.link}
                                className={
                                    useMatch({
                                        path: item.link,
                                        end: item.link.length === 1,
                                    })
                                        ? 'text-color-active'
                                        : 'text-color-inactive'
                                }
                            >
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

export default SidebarLink
