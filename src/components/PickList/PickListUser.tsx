/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { permissionReducer } from '../../store'
import {
    createPermissionUserNested,
    deletePermissionUserNested,
    fetchWithParamsPermissionUserNested,
} from '../../store/slices/permissionUserNestedSlice'
import { getModeName, modes } from '../../helpers/modeHelper'
import PickList from './PickList'

interface PickListProps {
    username: string
}

const PickListUser: FC<PickListProps> = props => {
    const { username } = props
    const dispatch = useAppDispatch()

    const isLoading = {
        available:
            useAppSelector(state => state.permission.isLoading) === 'list',
        selected:
            useAppSelector(state => state.permissionUserNested.isLoading)
            === 'list',
    }

    useEffect(() => {
        dispatch(permissionReducer.fetchWithParams({ filter: 'level=1' }))
        dispatch(
            fetchWithParamsPermissionUserNested({
                username,
            }),
        )
    }, [])

    const fetchedPerms = useAppSelector(state => state.permission.list)
    const fetchedPermsUserNested = useAppSelector(
        state => state.permissionUserNested.list,
    )

    function contains(arr: any, elem: any) {
        return (
            arr.filter(
                (i: any) =>
                    i.permission?.id === elem.id
                    && i.type === elem.type,
            ).length === 0
        )
    }

    const selected = fetchedPermsUserNested.map(permUser => {
        return {
            ...permUser,
            name: `${permUser?.permission?.name} ( ${permUser?.permission?.level?.name} )`,
            desc: getModeName(permUser.type),
        }
    })

    const available = fetchedPerms
        .map(perm => {
            return modes.map(mode => {
                return {
                    ...perm,
                    type: mode.mode,
                    name: `${perm?.name} ( ${perm?.level?.name} )`,
                    desc: mode.name,
                }
            })
        })
        .flat()
        .filter(item => contains(selected, item))

    const handleRight = (arr: any) => {
        const data = arr.map((item: any) => {
            return { type: item.type, permission: item.id }
        })

        if (data.length !== 1) return

        dispatch(
            createPermissionUserNested({
                data,
                params: { username },
            }),
        ).then(() =>
            dispatch(
                fetchWithParamsPermissionUserNested({
                    username,
                }),
            ))
    }

    const handleLeft = (arr: any) => {
        const data = arr.map((item: any) => {
            return item.id
        })

        if (data.length !== 1) return

        dispatch(
            deletePermissionUserNested({
                id: data[0],
                params: { username },
            }),
        ).then(() =>
            dispatch(
                fetchWithParamsPermissionUserNested({
                    username,
                }),
            ))
    }

    return (
        <PickList
            title='Настройка прав пользователя'
            selected={selected}
            available={available}
            handleArrowRight={handleRight}
            handleArrowLeft={handleLeft}
            isLoading={isLoading}
        />
    )
}

export default PickListUser
