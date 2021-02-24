import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../src/n1-main/m2-bll/store'
import {addCardPacksTC, getCardPacksTC, PackType, setPaginationAC} from './/Packs-reduser'
import s from './Packs.module.css'
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {Pack} from "./pack/Pack";
import {RequestStatusType} from "../../n1-main/m2-bll/app-reduser";
import {SortButtons} from '../../n1-main/m1-ui/common/SortButtons/SortButtons'
import {Paginator} from "../../n1-main/m1-ui/common/Paginator/Paginator";
import {getCardPacksDataType} from "../../n1-main/m3-dal/instance";


export const Packs = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const userId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const cardPacks = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const page = useSelector<AppRootStateType, number>(state => state.packs.pagination.page)

    const dispatch = useDispatch()
    const [isChange, setIsChange] = useState<boolean>(false)
    const [idTimeout, setIdTimeout] = useState<number>(0)
    const [searchName, setSearchName] = useState<string>("")
    const isLoading = status === 'loading'

    const setChange = useCallback(() => {
        clearTimeout(idTimeout)
        const id = window.setTimeout(() => {
            setIsChange(true)
            setIdTimeout(0)
        }, 1500)
        setIdTimeout(id)
    }, [idTimeout])

    useEffect(() => {
        if (isChange && !isLoading) {
            dispatch(setPaginationAC({packName: searchName}))
            dispatch(getCardPacksTC())
            setIsChange(false)
        }
    }, [setChange, isChange, setIsChange, setPaginationAC, isLoading])


    useEffect(() => {

        if (isLoggedIn) {
            dispatch(getCardPacksTC())
        }
    }, [isLoggedIn])

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            dispatch(setPaginationAC({user_id: userId}))
            dispatch(getCardPacksTC())

        } else {
            dispatch(setPaginationAC({user_id: ""}))
            dispatch(getCardPacksTC())
        }
    }

    const addPack = () => dispatch(addCardPacksTC())

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
        setChange()
    }

    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pagination.pageCount)
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.packs.totalPacksCount)

    const onPageChanged = (pageNumber: number) => {
        dispatch(setPaginationAC({page: pageNumber}))
        dispatch(getCardPacksTC())
    }

    return (

        <div className={s.table}>
            <h1>Packs</h1>
            <div> my Pack <input type={"checkbox"} onChange={change}/></div>
            <div>
                <Paginator currentPage={page} pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={10}
                           onPageChanged={onPageChanged}/>
            </div>

            <div> Pack name search: <input value={searchName} onChange={onChangeCallback}/></div>
            {isLoggedIn ? <div className={s.tableString}>


                <div className={s.tableColumnTitle}>
                    <SortButtons param="name"/>
                    <h2> Name</h2>
                </div>
                <div className={s.tableColumnTitle}>
                    <SortButtons param="cardsCount"/>
                    <h2> CardsCount</h2>
                </div>
                <div className={s.tableColumnTitle}>
                    <SortButtons param="updated"/>
                    <h2> Updated</h2>
                </div>
                <div><SuperButton onClick={addPack} name={"add"}/></div>
                <h2>Cards</h2>

            </div> : <div>"you are not authorized"</div>}

            {cardPacks.map(packs =>
                <Pack name={packs.name} cardsCount={packs.cardsCount} updated={packs.updated} pack_id={packs._id}
                      userId={packs.user_id}/>
            )}

            <Paginator currentPage={page} pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={10}
                       onPageChanged={onPageChanged}/>

        </div>
    )
}


