import React, { FC } from 'react'

interface ButtonProps {
    title: string
    handleClick: () => void
}

const Button: FC<ButtonProps> = ({ title, handleClick }) => {
    return (
        <button
            type='button'
            onClick={handleClick}
            className='ms-3 custom-button'
        >
            {title}
        </button>
    )
}

export default Button
