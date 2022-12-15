import React, { FC, SVGProps } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { motion } from 'framer-motion'

export interface SidebarLinkProps {
    title: string
    Icon: FC<SVGProps<SVGSVGElement>>
    link: string
}

const SidebarLink: FC<SidebarLinkProps> = (props: SidebarLinkProps) => {
    const { title, Icon, link } = props
    const match = useMatch({
        path: link,
        end: link.length === 1,
    })

    return (
        <li className='nav-link'>
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
                    </>
                ) : (
                    <>
                        <span className='marker-link' />
                        <span className='icon'>
                            <Icon fill='#A1A1A1' />
                        </span>
                    </>
                )}
                <span
                    className='text nav-text'
                    style={{
                        color: match
                            ? 'var(--text-color-active)'
                            : 'var(--text-color-inactive)',
                    }}
                >
                    {title}
                </span>
            </Link>
        </li>
    )
}

export default SidebarLink
