import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {RequestStatusType} from "../../n1-main/m2-bll/app-reduser";
import {NavLink, Redirect, useParams} from "react-router-dom";
import s from "../f5-packs/Packs.module.css";
import {addCardTC, CardType, getCardTC, setCurrentIdAC, setCurrentPageAC} from "./Cards-reducer";
import {Card} from "./card/Card";
import {PackType} from "../f5-packs/Packs-reduser";
import {Paginator} from "../../n1-main/m1-ui/common/Paginator/Paginator";
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {Modal} from '../../n1-main/m1-ui/common/Modal/Modal'
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {AddCardForm, valueType} from "../../n1-main/m1-ui/common/AddCardForm/AddCardForm";

export const Cards = () => {
    const [activeAddCardModal, setActiveAddCardModal] = useState<boolean>(false)
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const page = useSelector<AppRootStateType, number>(state => state.cards.paginationCards.page)
    const pageSize = useSelector<AppRootStateType, number>(state => state.cards.paginationCards.pageCount)
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.cards.totalCardsCount)
    const [redirect, setRedirect] = useState<boolean>(false);
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const pack = packs.find(p => p._id === token)
    const createdUserId = pack ? pack.user_id : registerUserId
    const isMyPack = (createdUserId === registerUserId) && !(status === 'loading')


    useEffect(() => {

        if (isLoggedIn && token) {
            dispatch(setCurrentIdAC(token))
            dispatch(getCardTC())
        }
    }, [isLoggedIn,token])

    /*if (redirect && !isLoggedIn) return <Redirect to={PATH.LOGIN}/>
    if (redirect && !token) return <Redirect to={PATH.PACK}/>*/

    const addCard = (value: valueType) => {
        dispatch(addCardTC(token, value))
        setActiveAddCardModal(false)
    }

    const onPageChanged = (newNumber: number) => {
        dispatch(setCurrentPageAC(newNumber))
        dispatch(getCardTC())
    }
    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (

        <div className={s.table}>
            <h1>Cards</h1>
            {token && (cards.length > 0) &&
            <h2><NavLink to={`${PATH.LEARN}/${token}`} activeClassName={s.activeLink}>Learn</NavLink></h2>}
            <div>
                <Paginator currentPage={page} pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={3}
                           onPageChanged={onPageChanged}/>
            </div>
            {token ? <div className={s.tableString}>

                <div>question</div>
                <div>answer</div>
                <div>grade</div>
                <div>updated</div>
                <div>
                    <SuperButton onClick={() => {
                        setActiveAddCardModal(true)
                    }} disabled={!isMyPack} name={"add"}/>
                </div>


            </div> : <div>"Необходимо выбрать колоду"</div>}

            {token ? cards.map(card =>
                <Card card={card}/>
            ) : <div></div>}

            <Modal activeModal={activeAddCardModal} setActiveModal={setActiveAddCardModal}>
                <AddCardForm addCard={addCard} text={"Enter question and answer of new card"}/>
            </Modal>
        </div>
    )
}


