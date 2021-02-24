import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "../m2-bll/store";
import {RequestStatusType} from "../m2-bll/app-reduser";
import Preloader from "./common/Preloder/Preloader";
import {Routes} from "./routes/Routes";
import {ErrorSnackBar} from "./common/ErrorSnackBar/ErrorSnackBar";
import {Header} from "./header/Header";
import {getMe} from "../../n2-features/f1-auth/a1-login/login-reducer";


function App() {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    useEffect(() => {
        if (true) {
            dispatch(getMe())
        }
    }, [])

    return (
        <div>
            <HashRouter>
                <Header/>
                {status === 'loading' && <Preloader/>}
                <Routes/>
                {error && <ErrorSnackBar errorMessage={error}/>}
            </HashRouter>

        </div>
    );
}

export default App;
