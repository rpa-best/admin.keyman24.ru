import React, { FC } from 'react'

interface HeaderProps {
    title: string
}

const Header: FC<HeaderProps> = props => {
    const { title } = props

    return <h1 className='custom-header'>{title}</h1>
}

export default Header
