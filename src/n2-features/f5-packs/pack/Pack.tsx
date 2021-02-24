import React from 'react'
import s from '../Packs.module.css'
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import { removePackTC, updateTC} from "../Packs-reduser";
import {RequestStatusType} from "../../../n1-main/m2-bll/app-reduser";

type packPropsType = {
    name: string
    cardsCount?: number
    updated?: string
    pack_id: string
    userId: string
}
export const Pack = (props: packPropsType) => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isMyPack = (props.userId === registerUserId) && !(status === 'loading')
    const del = () => {
        dispatch(removePackTC(props.pack_id))
    }
    const update = () => {
        dispatch(updateTC(props.pack_id))
    }



    return (

        <div className={s.tableString} key={props.pack_id}>
            <div>{props.name}</div>
            <div>{props.cardsCount}</div>
            <div>{props.updated}</div>
            <div><SuperButton disabled={!isMyPack} name={"del"} onClick={del}/></div>
            <div><SuperButton disabled={!isMyPack} name={"update"} onClick={update}/></div>
            <NavLink to={`${PATH.CARDS}/${props.pack_id}`} activeClassName={s.activeLink}>CARDS</NavLink>
        </div>

    )
}


