import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./SuperButton.module.css";
import './SuperButton.module.css'


// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {

    name?:string

}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        name="push",
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {


    return (
        <button className={s.button}
                {...restProps}
            //  {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >{name} </button>
    );
}

export default SuperButton;
