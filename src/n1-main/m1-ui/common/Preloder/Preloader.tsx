import React from 'react';
import style from './Preloader.module.css'
import preloader from '../images/Infinity-1s-200px.svg'


let Preloader = () => {
    return <div className={style.pre} >
        <img src={preloader}  style={ { height: 200 } }/>
    </div>
}

export default Preloader;
