import React, { FC, useState } from 'react'

interface FormProps {
    title: string
    handleClick: (username: string, pass: string) => void
}

const Form: FC<FormProps> = ({ title, handleClick }) => {
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')

    return (
        <div className='d-flex flex-column align-items-center justify-content-center min-vh-100'>
            <h1 className='h1'>Auth</h1>
            <input
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder='username'
                className='mt-5 p-3 rounded bg-dark border border-white'
            />
            <input
                type='password'
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder='password'
                className='mt-3 p-3 rounded bg-dark border border-white'
            />
            <button
                type='button'
                onClick={() => handleClick(username, pass)}
                className='mt-5 p-3 rounded bg-dark border border-white'
            >
                {title}
            </button>
        </div>
    )
}

export default Form
