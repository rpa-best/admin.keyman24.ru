/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import getEntity from '../helpers/fixMe'
import { currentOffset, currentPageByOffset, pagesLength } from '../helpers/tablePaginationHelper'
import { useAppDispatch } from '../hooks/useReduxHooks'
import SVGBrowse from '../assets/img/table/browse.svg'
import SVGEdit from '../assets/img/table/edit.svg'
import SVGDelete from '../assets/img/table/delete.svg'
import Spinner from './Spinner'
import getTableRowId from '../helpers/getTableRowId'

const TableSubscriptionService: FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const endpoint = 'subscription-service'
    const {
        reducer, callSelector, columns, title, showButtons,
    } = getEntity(endpoint)

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
    } = useTable({
        columns: columns.default,
        data: JSON.parse(JSON.stringify(callSelector().list)),
    })

    const pagesCount = pagesLength(callSelector().count)
    const offsetValue = callSelector().offset
    // const currentPage = currentPageByOffset(callSelector().offset)
    const currentOrderBy = callSelector().orderBy

    useEffect(() => {
        dispatch(
            reducer.fetchWithParams({
                offset: offsetValue,
                orderBy: currentOrderBy,
            }),
        )
        // dispatch(reducer.fetchById(1))

        // return () => setPage(1)
    }, [offsetValue, currentOrderBy, endpoint])

    const handleOrderBy = (field: string) => {
        dispatch(
            reducer.changeOrdering(
                currentOrderBy === field ? `-${field}` : field,
            ),
        )
    }

    if (callSelector().isLoading === 'list') {
        return <Spinner />
    }

    return (
        <>
            <h1 className='section-header'>{`${title} / Список`}</h1>
            <div className='table-wrapper w-100'>
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
                                            <span
                                                onClick={() => {
                                                    handleOrderBy(column.id)
                                                }}
                                            >
                                                {column.render('Header')}
                                            </span>
                                        </th>
                                    ))}
                                    {showButtons.add && (
                                        <th>
                                            <Link to={`/${endpoint}/create`}>
                                                <div className='search-line'>
                                                    Добавить
                                                </div>
                                            </Link>
                                        </th>
                                    )}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
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
                                                    key={
                                                        cell.getCellProps().key
                                                    }
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })}

                                        <td>
                                            <div className='actions-wrapper'>
                                                {/* {showButtons.read && (
                                                    <Link
                                                        // to={`/${endpoint}/${row.cells?.[0].value}`}
                                                        to='/'
                                                    >
                                                        <span>
                                                            <SVGBrowse />
                                                        </span>
                                                    </Link>
                                                )} */}
                                                {showButtons.edit && (
                                                    <Link
                                                        to={`/${endpoint}/${getTableRowId(row, 'slug')}/edit`}
                                                    >
                                                        <span>
                                                            <SVGEdit />
                                                        </span>
                                                    </Link>
                                                )}
                                                {/* {showButtons.delete && (
                                                    <a
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            dispatch(
                                                                reducer.delete(
                                                                    row
                                                                        .cells?.[0]
                                                                        .value,
                                                                ),
                                                            )}
                                                    >
                                                        <span>
                                                            <SVGDelete />
                                                        </span>
                                                    </a>
                                                )} */}
                                            </div>
                                        </td>
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
                                    onClick={() =>
                                        dispatch(
                                            reducer.changeOffset(
                                                currentOffset(page),
                                            ),
                                        )}
                                    key={page}
                                    className={
                                        page
                                        === currentPageByOffset(offsetValue)
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
        </>
    )
}

export default TableSubscriptionService
