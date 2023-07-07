/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import Spinner from '../components/Spinner'
import getEntity from '../helpers/fixMe'
import { useAppDispatch } from '../hooks/useReduxHooks'

const EditContent = ({
    some,
    headers,
    endpoint,
    handleSave,
}: {
    some: any
    headers: any
    endpoint: string
    handleSave: (data: any) => void
}) => {
    const navigate = useNavigate()
    const goBack = () => navigate(`/${endpoint}`)

    const { rows, prepareRow } = useTable({
        columns: headers.full,
        data: [JSON.parse(JSON.stringify(some))],
    })

    const [tempData, setTempData] = useState(rows.at(0)?.original)

    const handleEdit = (column: any, event: any) => {
        tempData[column.accessor] = event.target.value
        setTempData(tempData)
    }

    return (
        <>
            {headers.full
                .filter(
                    (item: any) =>
                        item.accessor !== 'id' && item.accessor !== 'create_at',
                )
                .map((column: any, index: number) => (
                    <div className='input-wrapper flex-column' key={index}>
                        <h3
                            className='h5'
                            style={{ color: 'var(--text-color-my)' }}
                        >
                            {column.Header}
                        </h3>
                        <input
                            className='custom-input'
                            defaultValue={tempData[column.accessor]}
                            onChange={handleEdit.bind(null, column)}
                        />
                    </div>
                ))}
            <div className='input-wrapper'>
                <button
                    type='button'
                    className='ms-3 custom-button'
                    onClick={() => handleSave(tempData)}
                >
                    Сохранить
                </button>
                <button
                    type='button'
                    className='custom-button'
                    onClick={goBack}
                >
                    Вернуться
                </button>
            </div>
        </>
    )
}

const EditPage = () => {
    const loaderData: any = useLoaderData()
    const { endpoint } = loaderData
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { reducer, callSelector, columns, title } = getEntity(endpoint)
    const data = callSelector().single
    const { isLoading } = callSelector()

    const getData = async () => {
        await dispatch(reducer.fetchById(loaderData.id))
    }

    useEffect(() => {
        getData()

        // return () => dispatch(reducer.clearSingle())
    }, [])

    const onSave = (newData: any) => {
        dispatch(reducer.put(newData))
        navigate(`/${endpoint}`)
    }

    return isLoading ? (
        <Spinner />
    ) : (
        <div className='outlet-wrapper'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <h1>{`${title} / Редактирование`}</h1>
                        {/* <div className='d-flex flex-column mt-5'> */}
                        {data !== undefined && data !== null && (
                            <EditContent
                                some={data}
                                headers={columns}
                                endpoint={endpoint}
                                handleSave={onSave}
                            />
                        )}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const editLoader = async ({
    params,
    request,
}: {
    params: any
    request: any
}) => {
    return {
        id: params.id,
        endpoint: request.url.split('/')[3],
        mode: 'edit',
    }
}

const createLoader = async ({ request }: { request: any }) => {
    return {
        id: null,
        endpoint: request.url.split('/')[3],
        mode: 'create',
    }
}

const editCreateNestedLoader = async ({
    params,
    request,
}: {
    params: any
    request: any
}) => {
    return {
        id: params.id,
        endpointOriginal: request.url.split('/')[3],
        endpointNested: request.url.split('/')[6],
        mode: 'edit',
    }
}

export { EditPage, editLoader, createLoader, editCreateNestedLoader }
