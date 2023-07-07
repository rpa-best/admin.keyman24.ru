import React, { FC, forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import convertToISODate from '../helpers/convertToISODate'

interface CustomDatePickerProps {
    date: Date | null
    setDate: (date: Date | null) => void
}

const ExampleCustomInput = forwardRef(({ value, onClick, onChange }: any, ref: any) => (
    <input readOnly className='custom-input' onClick={onClick} ref={ref} value={value} />
))

const CustomDatePicker: FC<CustomDatePickerProps> = props => {
    const { date, setDate } = props

    const handleChange = (d: Date | null) => {
        setDate(d)
    }

    return (
        <DatePicker
            selected={date}
            onChange={handleChange}
            dateFormat='dd.MM.yyyy'
            customInput={<ExampleCustomInput />}
        />
    )
}

export default CustomDatePicker
