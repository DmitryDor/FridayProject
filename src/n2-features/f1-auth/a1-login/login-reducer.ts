import {Dispatch} from 'redux'
import {AuthAPI} from '../../../n1-main/m3-dal/instance'
import {receivedResponseAC, setAppErrorAC, setAppStatusAC, UserDataType} from "../../../n1-main/m2-bll/app-reduser";
import {setCardPacksAC} from "../../f5-packs/Packs-reduser";
import {setCardAC} from "../../f6-cards/Cards-reducer";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_ISLOGGEDIN = 'SET_ISLOGGEDIN'

const initialState = {}

export const loginReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        default:
            return state
    }
}

//AC
export const setUserData = (userData: UserDataType) =>
    ({
        type: SET_USER_DATA, userData
    } as const)

export const setIsLoggedIn = (value: boolean) => ({type: SET_ISLOGGEDIN, value} as const)

//TC

export const getMe = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let response = await AuthAPI.getAuthMe()
        let userData = response.data
        dispatch(receivedResponseAC(userData, 'succeeded', null, true))

    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppErrorAC(error))
    }
}

export const login = (mail: string, password: string, remember_Me: boolean) =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'))
            let response = await AuthAPI.login(mail, password, remember_Me)
            let userData = response.data
            dispatch(receivedResponseAC(userData, 'succeeded', null, true))

        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
        }
    }

export const logout = () =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await AuthAPI.logout()
            dispatch(receivedResponseAC(null, 'succeeded', null, false))
            dispatch(setCardPacksAC([]))
            dispatch(setCardAC([]))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
        }

    }

//types
type ActionsType = | ReturnType<typeof setUserData> | ReturnType<typeof setIsLoggedIn>
type InitialStateType = typeof initialState
