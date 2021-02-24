import React from 'react'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperInput from "../../../n1-main/m1-ui/common/SuperInput/SuperInput";
import {verificationEmailTC} from "./recoveryPassword-reducer";
import {RequestStatusType} from "../../../n1-main/m2-bll/app-reduser";
import {DEV_VERSION} from "../../../config";


export const RecoveryPassword = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registeredEmail = useSelector<AppRootStateType, boolean>(state => state.recoveryPassword.registeredEmail)

    const from = "test-front-admin <ai73a@yandex.by>"
    const message = !DEV_VERSION
        ? "<div>password recovery link:<a" +
        " href='http://localhost:3000/#/new-password/$token$'>link</a></div>"
        : "<div>password recovery link:<a" +
        " href='https://potapov-eo.github.io/friday-day/#/new-password/$token$'>link</a></div>"


    type FormikErrorType = {
        email?: string
        from?: string
        message?: string
    }
    const disable = status === 'loading'

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors;
        },

        onSubmit: values => {

            dispatch(verificationEmailTC({email: values.email, from, message}))
            formik.resetForm()
        },
    })

    const {token} = useParams<{ token: string }>()

    if (registeredEmail) {
        return (
            <div>
                <div>Success!</div>
                <div>Click the link in the message in your email</div>
            </div>
        )
    }


    return <div className="App">

        <form onSubmit={formik.handleSubmit}>
            RecoveryPassword
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

            <SuperButton disabled={disable} type="submit" name='Send'/>

        </form>

    </div>
}