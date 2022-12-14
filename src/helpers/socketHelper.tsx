import React from 'react'
import { toast } from 'react-toastify'
import ToastMessage from '../components/ToastMessage'
import { IWebSocketNotification } from '../models/webSocketNotification'

const socketHelper = (socket: WebSocket, dispatch: () => any) => {
    socket.onopen = () => {
        console.log('WS onopen')
    }
    socket.onmessage = event => {
        const data: IWebSocketNotification = JSON.parse(JSON.parse(event.data))
        if (
            data.type === 'info'
            && data.data.desc === 'organization_upload_started'
        ) {
            toast.warn(
                <ToastMessage
                    text1='Загрузка организации...'
                    text2={`type: ${data.type}`}
                    text3={`desc: ${data.data.desc}`}
                />,
                {
                    position: 'bottom-right',
                    toastId: 'customId1',
                    theme: 'colored',
                },
            )
        }
        if (
            data.type === 'success'
            && data.data.desc === 'organization_upload_successed'
        ) {
            dispatch()
            toast.success(
                <ToastMessage
                    text1='Организация загружена'
                    text2={`type: ${data.type}`}
                    text3={`desc: ${data.data.desc}`}
                />,
                {
                    position: 'bottom-right',
                    toastId: 'customId2',
                    theme: 'colored',
                },
            )
        }
        if (
            data.type === 'error'
            && data.data.desc === 'organization_upload_failed'
        ) {
            toast.error(
                <ToastMessage
                    text1='Ошибка загрузки'
                    text2={`type: ${data.type}`}
                    text3={`desc: ${data.data.desc}`}
                />,
                {
                    position: 'bottom-right',
                    toastId: 'customId2',
                    theme: 'colored',
                },
            )
        }
        console.log('WS onmessage', data)
    }
    socket.onclose = () => {
        console.log('WS onclose')
    }
    socket.onerror = () => {
        console.log('WS onerror')
    }
}

export default socketHelper
