import React, { FC } from 'react'
import { Link, useMatch } from 'react-router-dom'

interface Children {
    title: string
    link: string
    endpoint: string
}

interface SidebarLinkChildrenProps {
    children: Children
}

const SidebarLinkChildren: FC<SidebarLinkChildrenProps> = props => {
    const { children } = props
    const isActive = useMatch({
        path: children.link,
        end: children.link.length === 1,
    })

    return (
        <li>
            <Link
                to={children.link}
                className={
                    isActive ? 'text-color-active' : 'text-color-inactive'
                }
            >
                {children.title}
            </Link>
        </li>
    )
}

export default SidebarLinkChildren
