import {CardsAPI, getCardPacksDataType} from '../../../src/n1-main/m3-dal/instance'
import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC} from "../../n1-main/m2-bll/app-reduser";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {setIsLoggedIn} from "../f1-auth/a1-login/login-reducer";


let initialState = {
    cardPacks: [] as Array<PackType>,
    pagination:
        {
            packName: "",//совпадение по имени
            min: 0,
            max: 0,//количество карточек в колоде
            sortPacks: "0updated",// сортировка
            page: 1, //номер страницы
            pageCount: 5,//кол-во элем на странице
            user_id: "",

        },
    totalPacksCount: 0  //кол-во колод
}
export type InitialStateType = typeof initialState
export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'CARDS/SET-CARD-PACKS':
            return {...state, cardPacks: action.cardPacks}

        case 'SET-PAGINATION-PROPERTY':
            return {...state, pagination: {...state.pagination, ...action.property}}

        case "SET-TOTAL-PACKS-COUNT":
            return {...state,  totalPacksCount: action.packsCount}

        case "SET-CURRENT-PAGE":
            return {...state, pagination: {...state.pagination, page: action.currentPage}}
        default:
            return state
    }
}

//AC
export const setCardPacksAC = (cardPacks: Array<PackType>) => ({type: 'CARDS/SET-CARD-PACKS', cardPacks} as const)
export const removePackAC = (packId: string) => ({type: 'CARDS/REMOVE-PACK', packId} as const)
export const addPackAC = (pack: PackType) => ({type: 'CARDS/ADD-PACK', pack} as const)
export const updatePackAC = (packId: string, pack: PackType) => ({type: 'CARDS/UPDATE-PACK', packId, pack} as const)

export const setPaginationAC = (property: setPaginationType) => ({type: 'SET-PAGINATION-PROPERTY', property} as const)

export const setTotalPacksCountAC = (packsCount: number) => ({type: "SET-TOTAL-PACKS-COUNT", packsCount} as const)

export const setCurrentPageAC = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)

//TC


export const getCardPacksTC = (getData: getCardPacksDataType = {}) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const paginationData = getState().packs.pagination
            const response = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(paginationData)
            const packs = response.data.cardPacks

            const cardPacksTotalCount = response.data.cardPacksTotalCount

            const currentPage = getData.page

            currentPage && dispatch(setCurrentPageAC(currentPage))
            dispatch(setTotalPacksCountAC(cardPacksTotalCount))
            dispatch(setCardPacksAC(packs))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
            dispatch(setIsLoggedIn(true))

        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')

            dispatch(setAppErrorAC(error))
        }
    }
export const addCardPacksTC = () =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const createResponse = await CardsAPI.createCardsPack()
            const paginationData = getState().packs.pagination
            const getResponse = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(paginationData)
            const packs = getResponse.data.cardPacks
            dispatch(setCardPacksAC(packs))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            debugger
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')

            dispatch(setAppErrorAC(error))
        }
    }
export const removePackTC = (idCarsPack: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const deleteResponse = await CardsAPI.deleteCardsPack(idCarsPack)
            const paginationData = getState().packs.pagination
            const getResponse = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(paginationData)
            const packs = getResponse.data.cardPacks
            dispatch(setCardPacksAC(packs))
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
export const updateTC = (id: string, getData: getCardPacksDataType = {}) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const updateResponse = await CardsAPI.updateCardsPack(id)
            const paginationData = getState().packs.pagination
            const getResponse = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(paginationData)
            const packs = getResponse.data.cardPacks
            dispatch(setCardPacksAC(packs))
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


//types
type ActionsType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof removePackAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof setPaginationAC>
    | ReturnType<typeof setTotalPacksCountAC>
    | ReturnType<typeof setCurrentPageAC>

export type PackType = {
    _id: string
    user_id: string
    user_name?: string
    private?: boolean
    name: string
    path?: string
    grade?: number
    shots?: number
    cardsCount?: number
    type?: string
    rating?: number
    created?: string
    updated?: string
    more_id?: string
    __v?: number
}
export type getCardPacksResponseType = {
    cardPacks: Array<PackType>
    page: number
    pageCount: number
    cardPacksTotalCount: number                  // totalItemsCount
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: Date
}
export type setPaginationType =
    { packName: string }
    | { min: number }
    | { max: number }
    | { sortPacks: string }
    | { page: number }
    | { pageCount: number }
    | { user_id: string }

