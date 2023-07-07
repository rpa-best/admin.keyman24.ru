import React, { FC, SVGProps, useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import getEntity from '../../helpers/fixMe'
import SpinnerSidebar from '../Spinner/SpinnerSidebar'
import SidebarLinkWithChildren from './SidebarLinkWithChildren'
import SidebarLinkActive from './SidebarLinkActive'
import SidebarLinkNonActive from './SidebarLinkNonActive'
import SidebarLinkWithoutChildren from './SidebarLinkWithoutChildren'

export interface SidebarLinkProps {
    title: string
    Icon: FC<SVGProps<SVGSVGElement>>
    link: string
    children: {
        title: string
        link: string
        endpoint: string
    }[]
    // eslint-disable-next-line react/require-default-props
    endpoint?: string
}

const SidebarLink: FC<SidebarLinkProps> = props => {
    const dispatch = useAppDispatch()
    const { title, Icon, link, children, endpoint } = props

    return children.length === 0 ? (
        <SidebarLinkWithoutChildren
            title={title}
            link={link}
            Icon={Icon}
            endpoint={endpoint || ''}
        />
    ) : (
        <SidebarLinkWithChildren {...props} />
    )
}

export default SidebarLink
