import React from 'react'
import {NavLink} from "react-router-dom";
import s from "./nav.module.css"
import {PATH} from "../../routes/Routes";

export const Nav = () => {
    return (

        <div className={s.nav}>


            <span>
                <NavLink to={PATH.TEST} activeClassName={s.activeLink}>TEST</NavLink>
            </span>
            <span>
                <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}>LOGIN</NavLink>
            </span>
            <span>
                <NavLink to={PATH.REGISTER} activeClassName={s.activeLink}>REGISTER</NavLink>
            </span>
            <span>
                <NavLink to={PATH.RECOVERY_PASSWORD} activeClassName={s.activeLink}>RECOVERY_PASSWORD</NavLink>
            </span>
            <span>
                <NavLink to={PATH.NEW_PASSWORD} activeClassName={s.activeLink}>NEW_PASSWORD</NavLink>
            </span>
            <span>
                <NavLink to={PATH.PROFILE} activeClassName={s.activeLink}>PROFILE</NavLink>
            </span>
            <span>
                <NavLink to={PATH.PACK} activeClassName={s.activeLink}>PACKS</NavLink>
            </span>
            <span>
                <NavLink to={PATH.CARDS} activeClassName={s.activeLink}>CARDS</NavLink>
            </span>
        </div>


    )
}