import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import './assets/styles/scss/app.scss'
import useTheme from './hooks/useTheme'
import router from './router'

const App: FC = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div className='app-wrapper d-flex h-100'>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
