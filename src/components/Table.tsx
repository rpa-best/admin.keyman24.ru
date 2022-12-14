/* eslint-disable operator-linebreak */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTable } from 'react-table'
import '../assets/styles/scss/table.scss'

export default function Table({
    columns,
    data,
    pagesCount,
    currentPage,
    handleSetPage,
}: {
        columns: any
        data: any
        pagesCount: number
        currentPage: number
        handleSetPage: (value: number) => void
}) {
    const location = useLocation()

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data: JSON.parse(JSON.stringify(data)),
        })

    // const tempRows = rows.filter(
    //     e =>
    //         currentPage * rowsDisplayed - rowsDisplayed <= e.index &&
    //         e.index < currentPage * rowsDisplayed,
    // )

    const tempRows = rows

    return (
        <div className='table-wrapper w-100 mt-5 mb-5'>
            <div className='table-content'>
                <table className='table' {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                key={headerGroup.getHeaderGroupProps().key}
                            >
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                                <th>
                                    <div className='search-line'>Добавить</div>
                                </th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {tempRows.map(row => {
                            prepareRow(row)
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    key={row.getRowProps().key}
                                >
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                key={cell.getCellProps().key}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}

                                    <td />
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='pagination-wrapper'>
                <div className='page-switch'>
                    {Array.from(
                        { length: pagesCount >= 1 ? pagesCount : 1 },
                        (_, index) => index + 1,
                    ).map(page => {
                        return (
                            <Link
                                to={location}
                                onClick={() => handleSetPage(page)}
                                key={page}
                                className={
                                    page === currentPage
                                        ? 'active-action'
                                        : 'table-page-link'
                                }
                            >
                                <span>{page}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
