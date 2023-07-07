/* eslint-disable react/no-array-index-key */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, SVGProps, useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import SVGDropdownArrow from '../../assets/img/topnav/dropdown-arrow.svg'
import getEntity from '../../helpers/fixMe'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import SpinnerSidebar from '../Spinner/SpinnerSidebar'
import SidebarLinkNonActive from './SidebarLinkNonActive'
import SidebarLinkActive from './SidebarLinkActive'
import SidebarLinkChildren from './SidebarLinkChildren'

interface Children {
    title: string
    link: string
    endpoint: string
}

interface SidebarLinkWithChildrenProps {
    title: string
    Icon: FC<SVGProps<SVGSVGElement>>
    link: string
    children: Children[]
}

const SidebarLinkWithChildren: FC<SidebarLinkWithChildrenProps> = props => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const { title, Icon, link, children } = props

    const [showChildren, setShowChildren] = useState<Children[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const isActive =
        showChildren.filter(item => matchPath(location.pathname, item.link))
            .length > 0
    const [showMenu, setShowMenu] = useState(isActive ? 'showMenu' : '')

    const handleShowMenu = () => {
        if (showMenu === '' || null) {
            setShowMenu('showMenu')
        } else {
            setShowMenu('')
        }
    }

    const validateLinks = async () => {
        const links = children
        const reducers = links.map(item => ({
            endpoint: item.endpoint,
            reducer: getEntity(item.endpoint).reducer,
        }))
        const validLinks = await Promise.all(
            reducers.map(async reducer => {
                try {
                    const result = await dispatch(
                        reducer.reducer.head(),
                    ).unwrap()
                    return (
                        result &&
                        links.find(item => item.endpoint === reducer.endpoint)
                    )
                } catch {
                    return undefined
                }
            }),
        )

        const emptyCheck = validLinks.filter(item => item !== undefined)

        setShowChildren(emptyCheck)
        setIsLoading(false)
        if (
            emptyCheck.filter(item => matchPath(location.pathname, item.link))
                .length > 0
        ) {
            handleShowMenu()
        }
    }

    useEffect(() => {
        validateLinks()
    }, [])

    if (isLoading) {
        return <SpinnerSidebar />
    }

    if (showChildren.length === 0) {
        return null
    }

    return (
        <li className={showMenu}>
            <div className='iocn-link'>
                <Link to={link}>
                    {isActive ? (
                        <SidebarLinkActive title={title} Icon={Icon} />
                    ) : (
                        <SidebarLinkNonActive title={title} Icon={Icon} />
                    )}
                </Link>
                <SVGDropdownArrow
                    className='arrow'
                    onClick={() => handleShowMenu()}
                />
            </div>

            <span className='marker-link' />
            <ul className='sub-menu'>
                {showChildren.map((item, index) => {
                    // eslint-disable-next-line react/no-children-prop
                    return <SidebarLinkChildren children={item} key={index} />
                })}
            </ul>
        </li>
    )
}

export default SidebarLinkWithChildren
