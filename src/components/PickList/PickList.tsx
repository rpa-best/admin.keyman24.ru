/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect, useState } from 'react'
import SVGArrowLeft from '../../assets/img/shared/arrows/arrow-left.svg'
import SVGArrowsLeft from '../../assets/img/shared/arrows/arrows-left.svg'
import SVGArrowRight from '../../assets/img/shared/arrows/arrow-right.svg'
import SVGArrowsRight from '../../assets/img/shared/arrows/arrows-right.svg'
import Spinner from '../Spinner'
import '../../assets/styles/scss/pickList.scss'
import Header from '../Header'

interface DefaultElem {
    content?: string | null
    name?: string | null
    desc?: string | null
}

interface ListViewProps<ElemType> {
    isLoading: boolean
    arr: ElemType[]
    arrClicked: ElemType[]
    handleArrClick: (elem: ElemType) => void
}

const ListView = <ElemType extends DefaultElem>(
    props: ListViewProps<ElemType>,
) => {
    const { isLoading, arr, arrClicked, handleArrClick } = props

    // useEffect(() => {}, [isLoading])

    return (
        <ul>
            {isLoading && <Spinner />}
            {!isLoading && arr.length === 0 ? (
                <div className='empty-list'>Пустой список</div>
            ) : (
                arr.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => handleArrClick(item)}
                            className={
                                arrClicked.includes(item) ? 'clicked' : ''
                            }
                        >
                            {item.name && item.desc && (
                                <div className='elem-wrapper'>
                                    <div className='elem-name'>{item.name}</div>
                                    <p className='elem-desc'>{item.desc}</p>
                                </div>
                            )}
                            {item.content && (
                                <div className='elem-content'>
                                    {item.content}
                                </div>
                            )}
                        </li>
                    )
                })
            )}
        </ul>
    )
}

// const PickList: FC = <PickElem extends DefaultElem, >(
//     props: React.PropsWithChildren<PickListProps<PickElem>>,
// ) => {

interface PickListProps<
    SelectedElem extends DefaultElem,
    AvailableElem extends DefaultElem,
    > {
    // eslint-disable-next-line react/require-default-props
    title?: string | null
    available: AvailableElem[]
    selected: SelectedElem[]
    handleArrowRight: (arr: AvailableElem[]) => void
    handleArrowLeft: (arr: SelectedElem[]) => void
    isLoading: {
        available: boolean
        selected: boolean
    }
}

const PickList = <
    SelectedElem extends DefaultElem,
    AvailableElem extends DefaultElem,
>(
    props: PickListProps<SelectedElem, AvailableElem>,
) => {
    const {
        title,
        selected,
        available,
        handleArrowRight,
        handleArrowLeft,
        isLoading,
    } = props

    const [selectedClicked, setSelectedClicked] = useState<SelectedElem[]>([])
    const [availableClicked, setAvailableClicked] = useState<AvailableElem[]>(
        [],
    )

    const handleAvailableClick = (elem: AvailableElem) => {
        // setAvailableClicked(prev =>
        //     !prev.includes(elem)
        //         ? [...prev, elem]
        //         : prev.filter(item => item !== elem),
        // )
        setAvailableClicked(prev => (prev.includes(elem) ? [] : [elem]))
    }

    const handleSelectedClick = (elem: SelectedElem) => {
        // setSelectedClicked(prev =>
        //     !prev.includes(elem)
        //         ? [...prev, elem]
        //         : prev.filter(item => item !== elem),
        // )
        setSelectedClicked(prev => (prev.includes(elem) ? [] : [elem]))
    }

    // useEffect(() => {}, [isLoading.available, isLoading.selected])

    return (
        <>
            {title && <Header title={title} />}
            <div className='picklist-wrapper'>
                <div className='list-view-wrapper'>
                    <div className='header-wrapper'>
                        <span>Доступ запрещен</span>
                    </div>
                    <div className='list-view-content'>
                        <ListView
                            isLoading={isLoading.available}
                            arr={available}
                            arrClicked={availableClicked}
                            handleArrClick={elem => handleAvailableClick(elem)}
                        />
                    </div>
                </div>
                <div className='actions-separator-wrapper'>
                    <ul>
                        <li onClick={() => handleArrowRight(availableClicked)}>
                            <SVGArrowRight stroke='#31d79b' />
                        </li>
                        <li onClick={() => handleArrowLeft(selectedClicked)}>
                            <SVGArrowLeft stroke='#31d79b' />
                        </li>
                    </ul>
                </div>
                <div className='list-view-wrapper'>
                    <div className='header-wrapper'>
                        <span>Доступ разрешен</span>
                    </div>
                    <div className='list-view-content'>
                        <ListView
                            isLoading={isLoading.selected}
                            arr={selected}
                            arrClicked={selectedClicked}
                            handleArrClick={elem => handleSelectedClick(elem)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PickList
