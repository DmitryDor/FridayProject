import style from './ErrorSnackBar.module.css'
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../../m2-bll/app-reduser";

type ErrorSnackBarPropsType = {
    errorMessage: string
}

export const ErrorSnackBar = (props: ErrorSnackBarPropsType) => {
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(setAppErrorAC(null))

    return (
        <div className={style.notification}>
        <div className={style.text}> {props.errorMessage} </div>
        <div className={`${style.close}`}>
            <div className={style.text} onClick={onClickHandler}>X</div>
        </div>
    </div>)
};

