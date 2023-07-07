import React, { FC } from 'react'
import SVGSpinner from '../../assets/img/shared/spinner-30.svg'

const SpinnerSidebar: FC = () => {
    return (
        <li>
            <a href='/'>
                <span className='marker-link' />
                <span className='icon'>
                    <SVGSpinner />
                </span>
                <span className='link_name text-color-inactive'>
                    Loading...
                </span>
            </a>
        </li>
    )
}

export default SpinnerSidebar
