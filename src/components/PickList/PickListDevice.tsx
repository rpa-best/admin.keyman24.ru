/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import {
    deviceNestedOrgReducer,
    deviceReducer,
    permissionGroupReducer,
} from '../../store'
import {
    createPermissionGroupUserNested,
    deletePermissionGroupUserNested,
    fetchWithParamsPermissionGroupUserNested,
} from '../../store/slices/permissionGroupUserNestedSlice'
import PickList from './PickList'

interface PickListDeviceProps {
    orgId: number
}

const PickListDevice: FC<PickListDeviceProps> = props => {
    const { orgId } = props
    const dispatch = useAppDispatch()

    const isLoading = {
        available: useAppSelector(state => state.device.isLoading) === 'list',
        selected:
            useAppSelector(state => state.deviceNestedOrg.isLoading) === 'list',
    }

    useEffect(() => {
        dispatch(deviceReducer.fetchWithParams({ filter: 'place=org' }))
        dispatch(
            deviceNestedOrgReducer.fetchWithParamsNested({
                id: orgId,
                endpoint: 'device',
            }),
        )
    }, [])

    const fetchedDevices = useAppSelector(state => state.device.list)
    const fetchedNestedDevices = useAppSelector(
        state => state.deviceNestedOrg.list,
    )

    function contains(arr: any, elem: any) {
        return arr.filter((i: any) => i.device?.id === elem.id).length === 0
    }

    const selected = fetchedNestedDevices.map(device => {
        return {
            ...device,
            content: device?.device?.name,
        }
    })

    const available = fetchedDevices
        .map(device => {
            return {
                ...device,
                content: device?.name,
            }
        })
        .filter(item => contains(selected, item))

    const handleRight = (arr: any) => {
        const data = arr.map((item: any) => {
            return { device: item.id }
        })

        if (data.length !== 1) return

        // console.log(data)

        dispatch(
            deviceNestedOrgReducer.createNested(data[0], {
                id: orgId,
                endpoint: 'device',
            }),
        ).then(() => {
            dispatch(deviceReducer.fetchWithParams({ filter: 'place=org' }))
            dispatch(
                deviceNestedOrgReducer.fetchWithParamsNested({
                    id: orgId,
                    endpoint: 'device',
                }),
            )
        })
    }

    const handleLeft = (arr: any) => {
        const data = arr.map((item: any) => {
            return item.id
        })

        if (data.length !== 1) return

        dispatch(
            deviceNestedOrgReducer.deleteNested(data[0], {
                id: orgId,
                endpoint: 'device',
            }),
        ).then(() => {
            dispatch(deviceReducer.fetchWithParams({ filter: 'place=org' }))
            dispatch(
                deviceNestedOrgReducer.fetchWithParamsNested({
                    id: orgId,
                    endpoint: 'device',
                }),
            )
        })
    }

    return (
        <PickList
            selected={selected}
            available={available}
            handleArrowRight={handleRight}
            handleArrowLeft={handleLeft}
            isLoading={isLoading}
        />
    )
}

export default PickListDevice
