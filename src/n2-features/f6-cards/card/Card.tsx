import React from 'react'
import s from '../../f5-packs/Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardType, removeCardTC, updateCardTC} from "../Cards-reducer";
import {RequestStatusType} from "../../../n1-main/m2-bll/app-reduser";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";

type cardPropsType = {
    card: CardType
}
export const Card = (props: cardPropsType) => {
    const card = props.card
    const dispatch = useDispatch()
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isMyPack = (card.user_id === registerUserId) && !(status === 'loading')
    const removeCard = () => dispatch(removeCardTC(card.cardsPack_id, card._id))
    const updatedCard = () => dispatch(updateCardTC(card.cardsPack_id, card._id))
    return (

        <div className={s.tableString} key={card._id}>
            <div>{card.question}</div>
            <div>{card.answer}</div>
            <div>{card.grade}</div>
            <div>{card.updated}</div>
            <div>
                <SuperButton disabled={!isMyPack} onClick={removeCard} name={"del"}/>
            </div>
            <div>
                <SuperButton disabled={!isMyPack} onClick={updatedCard} name={"update"}/>
            </div>

        </div>

    )
}
