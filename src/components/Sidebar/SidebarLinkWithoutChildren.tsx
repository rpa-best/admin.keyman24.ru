import React, { FC, SVGProps, useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import getEntity from '../../helpers/fixMe'
import SpinnerSidebar from '../Spinner/SpinnerSidebar'
import SidebarLinkActive from './SidebarLinkActive'
import SidebarLinkNonActive from './SidebarLinkNonActive'

interface SidebarLinkWithoutChildrenProps {
    title: string
    Icon: FC<SVGProps<SVGSVGElement>>
    link: string
    endpoint: string
}

const SidebarLinkWithoutChildren: FC<
    SidebarLinkWithoutChildrenProps
> = props => {
    const dispatch = useAppDispatch()
    const {
        title, Icon, link, endpoint,
    } = props
    const match = useMatch({
        path: link,
        end: link.length === 1,
    })

    const { reducer, callSelector } = getEntity(endpoint)
    const { head, isLoading } = callSelector() || false

    useEffect(() => {
        const dispatchedThunk = dispatch(reducer.head())

        return () => {
            // eslint-disable-next-line no-unused-expressions
            dispatchedThunk && dispatchedThunk.abort()
        }
    }, [])

    if (isLoading === 'head') {
        return <SpinnerSidebar />
    }

    return head ? (
        <li>
            <Link to={link}>
                {match ? (
                    <SidebarLinkActive title={title} Icon={Icon} />
                ) : (
                    <SidebarLinkNonActive title={title} Icon={Icon} />
                )}
            </Link>
        </li>
    ) : null
}

export default SidebarLinkWithoutChildren
