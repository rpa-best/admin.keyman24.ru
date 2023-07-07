import { type SidebarLinkProps } from '../components/Sidebar/SidebarLink'
import SVGHome from '../assets/img/sidebar/home.svg'
import SVGBuilding from '../assets/img/sidebar/building.svg'
import SVGFingerprint from '../assets/img/sidebar/fingerprint.svg'
import SVGMarker from '../assets/img/sidebar/marker.svg'
import SVGGlobe from '../assets/img/sidebar/globe.svg'
import SVGBox from '../assets/img/sidebar/box.svg'
import SVGUsers from '../assets/img/sidebar/users.svg'
import SVGFluid from '../assets/img/sidebar/layout-fluid.svg'
import SVGMail from '../assets/img/sidebar/mail.svg'
import SVGBackpack from '../assets/img/sidebar/backpack.svg'
import SVGWorker from '../assets/img/sidebar/worker.svg'
import SVGBriefcase from '../assets/img/sidebar/briefcase.svg'
import SVGUserLock from '../assets/img/sidebar/user-lock.svg'
import SVGListCheck from '../assets/img/sidebar/list-check.svg'

const sidebarData = [
    // {
    //     title: 'Главная',
    //     link: '/',
    //     Icon: SVGHome,
    // },
    {
        title: 'Организация',
        link: '/org',
        Icon: SVGBuilding,
        children: [],
        endpoint: 'org',
    },
    {
        title: 'Устройство',
        link: '/device',
        Icon: SVGFingerprint,
        children: [
            {
                title: 'Список устройств',
                link: '/device',
                endpoint: 'device',
            },
            {
                title: 'Тип устройства',
                link: '/device-type',
                endpoint: 'device-type',
            },
        ],
    },
    // {
    //     title: 'Регион',
    //     link: '/region',
    //     Icon: SVGGlobe,
    //     children: [
    //         {
    //             title: 'Список регионов',
    //             link: '/region',
    //             endpoint: 'region',
    //         },
    //         {
    //             title: 'Тип региона',
    //             link: '/region-type',
    //             endpoint: 'region-type',
    //         },
    //     ],
    // },
    {
        title: 'Тип инвентаря',
        link: '/inventory-type',
        Icon: SVGBriefcase,
        children: [],
        endpoint: 'inventory-type',
    },
    {
        title: 'Тип рабочего места',
        link: '/working-area-type',
        Icon: SVGBackpack,
        children: [],
        endpoint: 'working-area-type',
    },
    {
        title: 'Права доступа',
        link: '/permission',
        Icon: SVGUserLock,
        children: [
            {
                title: 'Список прав доступа',
                link: '/permission',
                endpoint: 'permission',
            },
            {
                title: 'Группа Права доступа',
                link: '/permission-group',
                endpoint: 'permission-group',
            },
            {
                title: 'Уровень Права доступа',
                link: '/permission-level',
                endpoint: 'permission-level',
            },
        ],
    },
    {
        title: 'Подписки',
        link: '/subscription',
        Icon: SVGListCheck,
        children: [
            {
                title: 'Список подписок',
                link: '/subscription',
                endpoint: 'subscription',
            },
            {
                title: 'Подписки Сервис',
                link: '/subscription-service',
                endpoint: 'subscription-service',
            },
            {
                title: 'Тип тарифа',
                link: '/service-rate-key',
                endpoint: 'service-rate-key',
            },
            {
                title: 'Запросы на подписку',
                link: '/subscription-request',
                endpoint: 'subscription-request',
            },
        ],
    },
    {
        title: 'Системные сообщения',
        link: '/system-message',
        Icon: SVGMail,
        children: [],
        endpoint: 'system-message',
    },
    {
        title: 'Пользователи',
        link: '/user',
        Icon: SVGUsers,
        children: [],
        endpoint: 'user',
    },
    // {
    //     title: 'Работники',
    //     link: '/worker',
    //     Icon: SVGWorker,
    //     children: [],
    // },
]

const getSidebarData = (): SidebarLinkProps[] => {
    // return []
    return sidebarData
}

export default getSidebarData
