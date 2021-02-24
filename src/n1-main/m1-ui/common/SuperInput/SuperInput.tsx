import React, { DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from "./SuperInput.module.css";
import './SuperInput.module.css'


// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
name?:string
}

const SuperInput: React.FC<SuperButtonPropsType> = (
    {
      
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {


    return (
        <input {...restProps} className={s.input}
            />
    );
}

export default SuperInput;
