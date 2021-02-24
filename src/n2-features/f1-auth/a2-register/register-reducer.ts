import {RegisterAPI} from "../../../n1-main/m3-dal/instance";
import {Dispatch} from "redux";
import {
    setAppErrorAC,
    setAppErrorACType,
    setAppStatusAC,
    setAppStatusACType
} from "../../../n1-main/m2-bll/app-reduser";


const initialState = {
    isRegister: false
}
type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTER':
            return {...state, isRegister: action.value}

        default:
            return state
    }
}
export const setIsRegister = (value: boolean) => ({type: 'SET-IS-REGISTER', value} as const)

export const RegisterTC = (data: RegisterParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await RegisterAPI.register(data)
        dispatch(setIsRegister(true))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppErrorAC(null))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')

        dispatch(setAppErrorAC(error))
    }

}

export type RegisterParamsType = {
    email: string
    password: string
}

type ActionsType = ReturnType<typeof setIsRegister> | setAppStatusACType | setAppErrorACType

