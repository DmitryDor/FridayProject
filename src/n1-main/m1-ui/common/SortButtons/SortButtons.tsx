import React from 'react'
import s from './SortButtons.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons'
import {getCardPacksTC, setPaginationAC} from '../../../../n2-features/f5-packs/Packs-reduser'
import {useDispatch} from 'react-redux'

export const SortButtons = (props: { param: string }) => {
    const dispatch = useDispatch()

    const sortUp = (param: string) => {
        dispatch(setPaginationAC({sortPacks: `1` + param}))
        dispatch(getCardPacksTC())
    }
    const sortDown = (param: string) => {
        dispatch(setPaginationAC({sortPacks: `0` + param}))
        dispatch(getCardPacksTC())
    }
    return <div className={s.tableSortIcons}>
        <a type="submit" onClick={() => sortUp(props.param)}><FontAwesomeIcon icon={faSortUp} size="1x"/></a>
        <a type="submit" onClick={() => sortDown(props.param)}><FontAwesomeIcon icon={faSortDown} size="1x"/></a>
    </div>
}
