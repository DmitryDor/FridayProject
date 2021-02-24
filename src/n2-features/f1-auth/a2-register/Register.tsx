import React from 'react'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RegisterTC} from "./register-reducer";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {RequestStatusType, setAppErrorAC} from "../../../n1-main/m2-bll/app-reduser";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperInput from "../../../n1-main/m1-ui/common/SuperInput/SuperInput";

export const Register = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    type FormikErrorType = {
        email?: string
        password?: string
    }
    const disable = status === 'loading'
    const formik = useFormik({
        initialValues: {
            email: 'potapov.eo@yandex.ru',
            password: 'jekajeka',
            password2: 'jekajeka',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'email Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'password Required';
            } else if (values.password.length < 7) {
                errors.password = 'Invalid email address';
            } else if (values.password2 !== values.password) {
                errors.password = 'Passwords do not match';
            }
            return errors;
        },


        onSubmit: values => {

            /*dispatch(RegisterTC(values))*/
            dispatch(RegisterTC({email: values.email, password: values.password}))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
     /*   dispatch(setAppErrorAC("you are already logged in"))*/
        return <Redirect to={PATH.PROFILE}/>
    }
    if (isRegister) {

        return <Redirect to={PATH.LOGIN}/>
    }

    return <div className="App">

        <form onSubmit={formik.handleSubmit}>
           <h1>REGISTRATION</h1> 
            <div>
                <SuperInput
                    placeholder={"email"}
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ?
                    <div style={{color: "red"}}>{formik.errors.email}</div> : null}
            </div>
            <div>
                <SuperInput
                    placeholder={"password"}
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </div>
            <div>
                <SuperInput
                    placeholder={"password2"}
                    type="password"
                    name="password2"
                    onChange={formik.handleChange}
                    value={formik.values.password2}
                />
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            </div>
            <SuperButton disabled={disable} type="submit"/>

        </form>


    </div>
}