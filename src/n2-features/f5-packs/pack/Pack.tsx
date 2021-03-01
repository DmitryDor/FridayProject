import React, {useState} from 'react'
import s from '../Packs.module.css'
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {removePackTC, updateTC} from "../Packs-reduser";
import {RequestStatusType} from "../../../n1-main/m2-bll/app-reduser";
import {Modal} from '../../..//n1-main/m1-ui/common/Modal/Modal'
import {BooleanForm} from "../../../n1-main/m1-ui/common/BooleanModal/BooleanForm";
import {AddForm} from "../../../n1-main/m1-ui/common/AddForm/AddForm";


type packPropsType = {
    name: string
    cardsCount?: number
    updated?: string
    pack_id: string
    userId: string
    activeModal: boolean
    setActiveModal: (activeModal: boolean) => void
}
export const Pack = (props: packPropsType) => {
    const [activeUpdatePackModal, setActiveUpdatePackModal] = useState<boolean>(false)
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isMyPack = (props.userId === registerUserId) && !(status === 'loading')
    const [activeDelPackModal, setActiveDelPackModal] = useState<boolean>(false)
    const del = (isDel: boolean) => {
        setActiveDelPackModal(false)
        isDel && dispatch(removePackTC(props.pack_id))
    }

    const updatePack = (newNamePack: string) => {
        debugger
        dispatch(updateTC(props.pack_id, newNamePack))
        setActiveUpdatePackModal(false)
    }

    return (
        <div>
            <div className={s.tableString} key={props.pack_id}>
                <div>{props.name} </div>
                <div>{props.cardsCount}</div>
                <div>{props.updated}</div>
                <div><SuperButton disabled={!isMyPack} onClick={() => {
                    setActiveDelPackModal(true)
                }} name={"del"}/></div>
                <div><SuperButton disabled={!isMyPack} name={"update"} onClick={() => {
                    setActiveUpdatePackModal(true)
                }}/></div>
                <div><NavLink to={`${PATH.CARDS}/${props.pack_id}`} activeClassName={s.activeLink}>CARDS</NavLink></div>
                <div><NavLink to={`${PATH.LEARN}/${props.pack_id}`} activeClassName={s.activeLink}>Learn</NavLink></div>
            </div>

            <Modal activeModal={activeUpdatePackModal} setActiveModal={setActiveUpdatePackModal}>
                {/* <AddItemForm addItem={updatePack} buttonName={"update"}/>*/}
                <AddForm addItem={updatePack} buttonName={"update"} itemName={"new name"} text={"Enter new name"}/>
            </Modal>
            <Modal activeModal={activeDelPackModal} setActiveModal={setActiveDelPackModal}>
                <BooleanForm question={`you want to remove the pack with the name: "${props.name}". Are you sure`}
                             push={del}/>
            </Modal>
        </div>


    )
}
