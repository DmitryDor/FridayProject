import {CardsAPI, getCardPacksDataType, getCardsDataType} from "../../n1-main/m3-dal/instance";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../n1-main/m2-bll/app-reduser";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "../../n1-main/m2-bll/store";


const initialState = {
    cards: [] as Array<CardType>,
    paginationCards: {
        page: 1,
        pageCount: 2,
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 0,
        sortCards: ''
    },
    totalCardsCount: 0
}

export type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-CARDS':
            return {...state, cards: action.cards}
        case "SET-TOTAL-CADRS-COUNT":
            return {...state, totalCardsCount: action.packsCount}
        case "SET-CURRENT-PAGE":
            return {...state, paginationCards: {...state.paginationCards, page: action.currentPage}}
        case "SET-ID":
            return {...state, paginationCards: {...state.paginationCards, cardsPack_id: action.id}}
        default:
            return state
    }
}

//AC

export const setCardAC = (cards: Array<CardType>) => ({type: 'SET-CARDS', cards} as const)
export const setTotalCardsCountAC = (packsCount: number) => ({type: "SET-TOTAL-CADRS-COUNT", packsCount} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)
export const setCurrentIdAC = (id: string) => ({type: 'SET-ID', id} as const)

//TC


export const getCardTC = () =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))

            const paginationData = getState().cards.paginationCards
            const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
            const cards = response.data.cards

            dispatch(setTotalCardsCountAC(response.data.cardsTotalCount))
            dispatch(setCardAC(cards))
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
export const addCardTC = (cardsPack_id: string) =>
    async (dispatch: Dispatch , getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))

            const addResponse = <AxiosResponse<any>>await CardsAPI.createCard(cardsPack_id)
            const paginationData = getState().cards.paginationCards
            const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
            const cards = response.data.cards
            dispatch(setCardAC(cards))
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
export const removeCardTC = (cardsPack_id: string, cardId: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const removeResponse = <AxiosResponse<any>>await CardsAPI.deleteCard(cardId)
            const paginationData = getState().cards.paginationCards
            const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
            const cards = response.data.cards
            dispatch(setCardAC(cards))
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
export const updateCardTC = (cardsPack_id: string, cardId: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const removeResponse = <AxiosResponse<any>>await CardsAPI.updateCard(cardId)

            const paginationData = getState().cards.paginationCards
            const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
            const cards = response.data.cards
            dispatch(setCardAC(cards))
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
type ActionsType = ReturnType<typeof setCardAC>
    | ReturnType<typeof setTotalCardsCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setCurrentIdAC>

export type GetCardsResponseType = {
    cards: Array<CardType>
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    token: string
    tokenDeathTime: Date
}
export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
    answerImg: string
    questionImg: string
    questionVideo: string
}
