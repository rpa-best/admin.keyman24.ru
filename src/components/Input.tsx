import React, { FC } from 'react'

interface InputProps {
    placeholder: string
    value: any,
    onChange: (e: any) => void
}

const Input: FC<InputProps> = ({ placeholder, value, onChange }) => {
    return (
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className=' custom-input'
        />
    )
}

export default Input
