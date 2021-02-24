import React, {ChangeEvent, useState} from 'react'
import s from "./Header.module.css"
import {Nav} from "./nav/nav";
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../n2-features/f1-auth/a1-login/login-reducer'
import {AppRootStateType} from "../../m2-bll/store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDAndD} from "@fortawesome/free-brands-svg-icons"
import {setDevVersionAC} from "../../m2-bll/app-reduser";


export const Header = () => {
    const dispatch = useDispatch()
    const UserName = useSelector<AppRootStateType, string | null>(state => state.app.UserData ? state.app.UserData.name : null)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const dev = useSelector<AppRootStateType, boolean>(state => state.app.devVersion)// для переключения м-ду локальным бэком и хироку
    const changeDev = (e: ChangeEvent<HTMLInputElement>) => {dispatch(setDevVersionAC(e.currentTarget.checked))
    }
    const logoutOnClick = () => {
        const thunk = logout()
        dispatch(thunk)
    }

    return (
        <div className={s.header}>
           {/* <div className={s.devInput}><input type={"checkbox"}
                                               onChange={changeDev}/> {dev ? "https://neko-back.herokuapp.com/2.0" : "http://localhost:7542/2.0/"}
            </div>*/}
            <FontAwesomeIcon icon={faDAndD} size="4x"/>
            <Nav/>


            <div className={s.burger}>
                <a href="" className={s.a}>
                    <span className={s.burgerToggle}>
                        <span className={s.nk1}></span>
                        <span className={s.nk2}></span>
                        <span className={s.nk3}></span>
                    </span>
                </a>
            </div>
            {isLoggedIn && < SuperButton onClick={logoutOnClick} name="logout"/>}
            {isLoggedIn &&
            <div style={{margin: "10px", color: "#e08821", fontWeight: "bold", fontSize: "20px"}}> {UserName} </div>}
        </div>
    )
}


