import axios from "axios";

import {RegisterParamsType} from "../../n2-features/f1-auth/a2-register/register-reducer";
import {registeredEmailType} from "../../n2-features/f1-auth/a3-recoveryPassword/recoveryPassword-reducer";
import {SetPasswordType} from "../../n2-features/f1-auth/a4-newPassword/newPassword-reducer";

import {DEV_VERSION} from "../../config";

/*const DEVVERSION = store.getState().app.devVersion*/
export const baseURL = !DEV_VERSION
    ? "http://localhost:7542/2.0"
    : "https://neko-back.herokuapp.com/2.0"
export const instance = axios.create({baseURL, withCredentials: true})


export const AuthAPI = {
    getAuthMe() {
        return instance.post(`auth/me`,)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/me`)
    }
}

export const RegisterAPI = {
    register(data: RegisterParamsType) {
        return instance.post("/auth/register", data)
    }
}

export const recoveryPasswordAPI = {
    registeredEmail(data: registeredEmailType) {
        return instance.post('/auth/forgot', data)
    },
    setPassword(data: SetPasswordType) {
        return instance.post('/auth/set-new-password', data)
    }
}

export const CardsAPI = {
    getCardPacks(paginationData: any) {
        return instance.get(`cards/pack`, {params: paginationData})
    },

    createCardsPack(newPackName: string) {
        return instance.post(`cards/pack`, {cardsPack: {name: newPackName}})
    },
    deleteCardsPack(idCarsPack: string) {
        return instance.delete(`cards/pack/?id=${idCarsPack}`)
    },
    updateCardsPack(id: string, newNamePack: string) {
        return instance.put(`cards/pack/`, {cardsPack: {_id: id, name: newNamePack}})
    },
    getCards(paginationCardsData: any) {
        return instance.get(`cards/card/`, {params: paginationCardsData})
    },
    createCard(cardsPack_id: string, values: { question: string, answer: string }) {
        return instance.post(`cards/card`, {
            card:
                {
                    cardsPack_id: cardsPack_id,
                    ...values
                }
        })
    },
    deleteCard(idCarsPack: string) {
        return instance.delete(`cards/card/?id=${idCarsPack}`)
    },
    updateCard(cardId: string, question: string, answer: string) {
        return instance.put(`cards/card`, {
            card: {
                _id: cardId,
                question: question,
                answer: answer

            }
        })
    },
    gradeCard(grade: number, card_id: string) {
        return instance.put(`cards/grade`,
            {
                grade: grade,
                card_id: card_id

            }
        )
    },

}
export type cardsPackType = {
    _id: string
    name?: string
}

export type getCardPacksDataType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
}

export type getCardsDataType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number

}