import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../f1-auth/a1-login/login-reducer";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {setAppErrorAC, UserDataType} from "../../n1-main/m2-bll/app-reduser";
import s from "./Profile.module.css";


export const Profile = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const userData = useSelector<AppRootStateType, UserDataType>(state => state.app.UserData)
   /* useEffect(() => {
        if (isLoggedIn) {
            dispatch(getMe())

        }
    }, [isLoggedIn])*/

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>

    }
     const avatar = "https://www.gravatar.com/avatar/c37e0453882ec1e1d40bb4387e27b1dc?s=200&r=g&d=mm"
    return (

        <div className={s.profile}>
            <h1>PROFILE</h1>
            <div className={s.profileContainer}>
                <img className={s.avatar} src = {avatar}/>
                {/* {userData.avatar} */}
                <div className={s.info}>
                    <div> Name: <span>{userData?userData.name:null}</span></div>
                    <div> Email: <span>{userData?userData.email:null}</span></div>
                    <div>Public Card Packs Count: <span>{userData?userData.publicCardPacksCount:null}</span></div>
                </div>
            </div>
        </div>
    )
}