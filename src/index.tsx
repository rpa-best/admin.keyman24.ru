import React from 'react'
import ReactDOM from 'react-dom/client'
// import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import App from './App'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement,
)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)
