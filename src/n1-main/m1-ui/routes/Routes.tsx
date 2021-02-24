import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {Error404} from "../../../n2-features/f4-404/Error404";
import {Test} from "../../../n2-features/f0-test/test";
import {Login} from "../../../n2-features/f1-auth/a1-login/LoginFormik";
import {Register} from "../../../n2-features/f1-auth/a2-register/Register";
import {RecoveryPassword} from "../../../n2-features/f1-auth/a3-recoveryPassword/RecoveryPassword";
import {Profile} from "../../../n2-features/f2-profile/Profile";
import {NewPassword} from "../../../n2-features/f1-auth/a4-newPassword/NewPassword";
import { Packs } from '../../../n2-features/f5-packs/Packs';
import {Cards} from "../../../n2-features/f6-cards/Cards";


export const PATH = {
    HOME: "/home",
    TEST: "/test",
    LOGIN: "/login",
    REGISTER: "/register",
    RECOVERY_PASSWORD: "/recovery-password",
    NEW_PASSWORD: "/new-password",
    PROFILE: "/profile",
    PACK: "/packs",
    CARDS: "/cards"
}

export const Routes = () => {
    return (
        <div>

            <Switch>

                <Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTER} render={() => <Register/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
                <Route path={`${PATH.NEW_PASSWORD}/:token`} render={() => <NewPassword/> }/>
                <Route path={PATH.NEW_PASSWORD} exact render={ () => <RecoveryPassword/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PACK} render={() => <Packs />}/>
                <Route path={`${PATH.CARDS}/:token`} render={() => <Cards/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    )
}