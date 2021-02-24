import {setAppErrorACType, setAppStatusAC, setAppStatusACType} from "../../../n1-main/m2-bll/app-reduser";
import {Dispatch} from "redux";
import {recoveryPasswordAPI} from "../../../n1-main/m3-dal/instance";

const initialState = {
    newPassword: ''
}
type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-PASSWORD": {
            return {...state, newPassword: action.newPassword}
        }
        default:
            return state
    }
}

const setPasswordAC = (newPassword: string) => ({type: "APP/SET-PASSWORD", newPassword} as const)

export const setPasswordTC1 = (data: SetPasswordType) => {
    return (dispatch: Dispatch) => {
        recoveryPasswordAPI.setPassword(data).then(res => dispatch(setPasswordAC(data.password)))
    }
}
export const setPasswordTC = (data: SetPasswordType) => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        return recoveryPasswordAPI.setPassword(data)
            .then(res => {
                dispatch(setPasswordAC(data.password))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export type SetPasswordType = {
    password: string
    resetPasswordToken: string
}

type ActionsType = ReturnType<typeof setPasswordAC> | setAppStatusACType | setAppErrorACType