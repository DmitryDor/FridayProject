import {Dispatch} from 'redux'
import {recoveryPasswordAPI} from "../../../n1-main/m3-dal/instance";
import {
    setAppErrorAC,
    setAppErrorACType,
    setAppStatusAC,
    setAppStatusACType
} from "../../../n1-main/m2-bll/app-reduser";


const initialState = {
    registeredEmail: false
}
type InitialStateType = typeof initialState

export const recoveryPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "VERIFICATION-EMAIL":
            return {...state, registeredEmail: action.value}

        default:
            return state
    }
}

const verificationEmailAC = (value: boolean) => {
    return {type: 'VERIFICATION-EMAIL', value} as const
}

export const verificationEmailTC = (data: registeredEmailType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        return recoveryPasswordAPI.registeredEmail(data).then(res => {
            if (res.data.success) {
                dispatch(verificationEmailAC(true))
            }
            dispatch(setAppStatusAC('succeeded'))
        })

            .catch((e) => {
                dispatch(setAppStatusAC('failed'))
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                dispatch(setAppErrorAC(error))
            })
    }
}


export type registeredEmailType = {
    email: string
    from: string
    message: string
}


type ActionsType = ReturnType<typeof verificationEmailAC> | setAppStatusACType | setAppErrorACType