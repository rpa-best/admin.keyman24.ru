/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { permissionGroupReducer } from '../../store'
import {
    createPermissionGroupUserNested,
    deletePermissionGroupUserNested,
    fetchWithParamsPermissionGroupUserNested,
} from '../../store/slices/permissionGroupUserNestedSlice'
import PickList from './PickList'

interface PickListGroupUserProps {
    username: string
}

const PickListGroupUser: FC<PickListGroupUserProps> = props => {
    const { username } = props
    const dispatch = useAppDispatch()

    const isLoading = {
        available:
            useAppSelector(state => state.permissionGroup.isLoading) === 'list',
        selected:
            useAppSelector(
                state => state.permissionGroupUserNested.isLoading,
            ) === 'list',
    }

    useEffect(() => {
        dispatch(permissionGroupReducer.fetchWithParams({ filter: 'level=1' }))
        dispatch(
            fetchWithParamsPermissionGroupUserNested({
                username,
            }),
        )
    }, [])

    const fetchedGroups = useAppSelector(state => state.permissionGroup.list)
    const fetchedPermsGroupUserNested = useAppSelector(
        state => state.permissionGroupUserNested.list,
    )

    function contains(arr: any, elem: any) {
        return arr.filter((i: any) => i.group?.id === elem.id).length === 0
    }

    const selected = fetchedPermsGroupUserNested.map(group => {
        return {
            ...group,
            content: group?.group?.name,
        }
    })

    const available = fetchedGroups
        .map(group => {
            return {
                ...group,
                content: group?.name,
            }
        })
        .filter(item => contains(selected, item))

    const handleRight = (arr: any) => {
        const data = arr.map((item: any) => {
            return { group: item.id }
        })

        if (data.length !== 1) return

        // console.log(data)

        dispatch(
            createPermissionGroupUserNested({
                data,
                params: { username },
            }),
        ).then(() =>
            dispatch(
                fetchWithParamsPermissionGroupUserNested({
                    username,
                }),
            ),
        )
    }

    const handleLeft = (arr: any) => {
        const data = arr.map((item: any) => {
            return item.id
        })

        if (data.length !== 1) return

        dispatch(
            deletePermissionGroupUserNested({
                id: data[0],
                params: { username },
            }),
        ).then(() =>
            dispatch(
                fetchWithParamsPermissionGroupUserNested({
                    username,
                }),
            ),
        )
    }

    return (
        <PickList
            title='Настройка группы прав'
            selected={selected}
            available={available}
            handleArrowRight={handleRight}
            handleArrowLeft={handleLeft}
            isLoading={isLoading}
        />
    )
}

export default PickListGroupUser
