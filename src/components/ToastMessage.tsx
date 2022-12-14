/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'

interface IToastMessageProps {
    text1: string
    text2: string
    text3: string
}

const ToastMessage: FC<IToastMessageProps> = (props: IToastMessageProps) => {
    const { text1, text2, text3 } = { ...props }

    return (
        <div style={{ width: '300px' }}>
            <h1 style={{ fontSize: '20px', color: '#000' }}>{text1}</h1>
            <p style={{ color: '#000' }}>{text2}</p>
            <p style={{ color: '#000' }}>{text3}</p>
        </div>
    )
}

export default ToastMessage
