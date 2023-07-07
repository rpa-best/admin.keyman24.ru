/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import getEntity from '../helpers/fixMe'
import { useAppDispatch } from '../hooks/useReduxHooks'

export function SinglePage() {
    const loaderData: any = useLoaderData()
    const { endpoint } = loaderData
    const dispatch = useAppDispatch()
    const { reducer, callSelector, columns, title } = getEntity(endpoint)
    const data = callSelector().single

    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    // console.log(callSelector().single)

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    //     useTable({
    //         columns: columns.default,
    //         data: JSON.parse(JSON.stringify(callSelector().single)),
    //     })

    useEffect(() => {
        dispatch(reducer.fetchById(loaderData.id))

        return () => dispatch(reducer.clearSingle())
    }, [])

    // const tryThis = (foo: unknown) => {
    //     console.log(foo)
    //     if (typeof foo !== typeof 'string') {
    //         const res = () => foo
    //         return <h1>{foo() as void}</h1>
    //     }
    //     return <h1>{foo as string}</h1>
    // }

    return (
        <div className='outlet-wrapper'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <h1>{`${title} / Просмотр`}</h1>
                        {/* <div className='d-flex flex-column'> */}
                        {columns.full.map((column: any, index: number) => (
                            <div
                                className='input-wrapper flex-column'
                                key={index}
                            >
                                <h3
                                    className='h5 w-100 d-flex'
                                    style={{ color: 'var(--text-color-my)' }}
                                >
                                    {column.Header}
                                </h3>
                                {data !== undefined && data !== null && (
                                    <input
                                        className='custom-input'
                                        placeholder=''
                                        readOnly
                                        defaultValue={data[
                                            column.accessor
                                        ]?.toString()}
                                    />
                                )}
                            </div>
                        ))}
                        {/* {headerGroups.map(headerGroup =>
                    headerGroup.headers.map(some => (
                        <th>
                            <span>{some.render('Header')}</span>
                        </th>
                    )),
                )}
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} key={row.getRowProps().key}>
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
                        </tr>
                    )
                })} */}
                        <div className='input-wrapper'>
                            <button
                                type='button'
                                className='custom-button'
                                onClick={goBack}
                            >
                                Вернуться
                            </button>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TryThis = () => {}

const singleLoader = async ({
    params,
    request,
}: {
    params: any
    request: any
}) => {
    return {
        id: params.id,
        endpoint: request.url.split('/')[3],
    }
}

export { singleLoader }
