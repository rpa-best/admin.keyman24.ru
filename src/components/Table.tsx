/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { FC, useEffect, useState } from 'react'
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { Row, useTable } from 'react-table'
import '../assets/styles/scss/table.scss'
import getEntity from '../helpers/fixMe'
import {
    currentOffset,
    currentPageByOffset,
    pagesLength,
} from '../helpers/tablePaginationHelper'
import { useAppDispatch } from '../hooks/useReduxHooks'
import SVGBrowse from '../assets/img/table/browse.svg'
import SVGEdit from '../assets/img/table/edit.svg'
import SVGDelete from '../assets/img/table/delete.svg'
import SVGCheck from '../assets/img/table/check.svg'
import Spinner from './Spinner'
import getTableRowId from '../helpers/getTableRowId'

export interface TableProps {
    endpoint?: string
    id?: number
} 

const Temp: FC<TableProps> = props => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { endpoint } = props
    const {
        reducer,
        callSelector,
        columns,
        title,
        showButtons,
        tableInitialState,
    } = getEntity(endpoint)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns: columns.default,
            data: JSON.parse(JSON.stringify(callSelector().list)),
            initialState: tableInitialState,
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
                filter: 'limit=10',
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
                                                {showButtons.request && (
                                                    <Link
                                                        to={`/${endpoint}/${getTableRowId(
                                                            row,
                                                            'id',
                                                        )}/edit`}
                                                    >
                                                        <span>
                                                            <SVGCheck />
                                                        </span>
                                                    </Link>
                                                )}
                                                {showButtons.read && (
                                                    <Link
                                                        // to={`/${endpoint}/${row.cells?.[0].value}`}
                                                        to='/'
                                                    >
                                                        <span>
                                                            <SVGBrowse />
                                                        </span>
                                                    </Link>
                                                )}
                                                {showButtons.edit && (
                                                    <Link
                                                        to={`/${endpoint}/${getTableRowId(
                                                            row,
                                                            'id',
                                                        )}/edit`}
                                                    >
                                                        <span>
                                                            <SVGEdit />
                                                        </span>
                                                    </Link>
                                                )}
                                                {showButtons.delete && (
                                                    <a
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            dispatch(
                                                                reducer.delete(
                                                                    getTableRowId(
                                                                        row,
                                                                        'id',
                                                                    ),
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        <span>
                                                            <SVGDelete />
                                                        </span>
                                                    </a>
                                                )}
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
                                        )
                                    }
                                    key={page}
                                    className={
                                        page ===
                                        currentPageByOffset(offsetValue)
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

const Temp2: FC<TableProps> = props => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { endpoint, id } = props
    const {
        reducer,
        callSelector,
        columns,
        endpointOriginal,
        endpointNested,
        showButtons,
    } = getEntity(endpoint)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns: columns.default,
            data: JSON.parse(JSON.stringify(callSelector().list)),
        })

    const pagesCount = pagesLength(callSelector().count)
    const offsetValue = callSelector().offset
    const currentOrderBy = callSelector().orderBy

    useEffect(() => {
        if (id !== 0) {
            dispatch(
                reducer.fetchWithParamsNested({
                    offset: offsetValue,
                    orderBy: currentOrderBy,
                    id,
                    endpoint: endpointNested,
                }),
            )
        }
    }, [offsetValue, currentOrderBy, endpoint, id])

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
        <div className='w-100'>
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
                                        <Link
                                            to={`/${endpointOriginal}/${id}/edit/${endpointNested}/create`}
                                        >
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
                                                key={cell.getCellProps().key}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}

                                    <td>
                                        <div className='actions-wrapper'>
                                            {showButtons.edit && (
                                                <Link
                                                    to={`/${endpointOriginal}/${id}/edit/${endpointNested}/${getTableRowId(
                                                        row,
                                                        'id',
                                                    )}/edit`}
                                                >
                                                    <span>
                                                        <SVGEdit />
                                                    </span>
                                                </Link>
                                            )}
                                            {showButtons.delete && (
                                                <a
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        dispatch(
                                                            reducer.deleteNested(
                                                                getTableRowId(
                                                                    row,
                                                                    'id',
                                                                ),
                                                                {
                                                                    id,
                                                                    endpoint:
                                                                        endpointNested,
                                                                },
                                                            ),
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        <SVGDelete />
                                                    </span>
                                                </a>
                                            )}
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
                                    )
                                }
                                key={page}
                                className={
                                    page === currentPageByOffset(offsetValue)
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

const Table: FC<TableProps> = props => {
    const loaderData: any = useLoaderData()

    if (loaderData && loaderData.mode === 'list') {
        // console.log('without props')
        const { endpoint } = loaderData
        return <Temp endpoint={endpoint} />
    }

    // console.log('with props')

    return <Temp2 {...props} />
}

export default Table

const tableLoader = async ({
    // params,
    request,
}: {
    // params: any
    request: any
}) => {
    return {
        // id: params.id,
        endpoint: request.url.split('/')[3],
        mode: 'list',
    }
}

export { tableLoader }
