import React, {useState} from 'react'
import s from '../../f5-packs/Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardType, removeCardTC, updateCardTC} from "../Cards-reducer";
import {RequestStatusType} from "../../../n1-main/m2-bll/app-reduser";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {Modal} from "../../../n1-main/m1-ui/common/Modal/Modal";
import {BooleanForm} from "../../../n1-main/m1-ui/common/BooleanModal/BooleanForm";
import {AddCardForm, valueType} from "../../../n1-main/m1-ui/common/AddCardForm/AddCardForm";

type cardPropsType = {
    card: CardType
}
export const Card = (props: cardPropsType) => {
    const card = props.card
    const dispatch = useDispatch()
    const [activeAddCardModal, setActiveAddCardModal] = useState<boolean>(false)
    const [activeDelPackModal, setActiveDelPackModal] = useState<boolean>(false)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isMyPack = (card.user_id === registerUserId) && !(status === 'loading')
    const removeCard = (isDel: boolean) => {
        setActiveDelPackModal(false)
        isDel && dispatch(removeCardTC(card.cardsPack_id, card._id))
    }
    const updatedCard = (value: valueType) => {
        setActiveAddCardModal(false)
        dispatch(updateCardTC(card._id, value))
    }

    return (
        <div>
            <div className={s.tableString} key={card._id}>
                <div>{card.question}</div>
                <div>{card.answer}</div>
                <div>{card.grade}</div>
                <div>{card.updated.slice(0,10)}</div>
                <div><SuperButton disabled={!isMyPack} onClick={() => {
                    setActiveDelPackModal(true)
                }} name={"del"}/></div>

                <div>
                    <SuperButton disabled={!isMyPack} onClick={() => setActiveAddCardModal(true)} name={"update"}/>
                </div>

            </div>
            <Modal activeModal={activeDelPackModal} setActiveModal={setActiveDelPackModal}>
                <BooleanForm question={`you want to remove the card with the question: "${card.question}"`}
                             push={removeCard}/>
            </Modal>
            <Modal activeModal={activeAddCardModal} setActiveModal={setActiveAddCardModal}>
                <AddCardForm addCard={updatedCard} text={"Enter new question and new answer"}/>
            </Modal>
        </div>
    )
}
