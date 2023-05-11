import React, {useEffect} from 'react';
import styles from './App.module.scss'
import {Form, Transfer, WaitingTransfer} from "./components";
import {useAppAlert, useAppDispatch, useAppSelector} from "./hooks";
import {getInitialData} from "./store/app.slice";
import {alertTypes} from "./store/types";
import gazprom from "./assets/images/gazprom.png";
import raiffeisen from "./assets/images/raiffeisen.png";
import akbars from "./assets/images/akbars.png";
import vtb from "./assets/images/vtb.png";
import tinkoff from "./assets/images/tinkoff.png";
import alfa from "./assets/images/alfa.png";
import sber from "./assets/images/sber.png";
import sbp from "./assets/images/sbp.png";

const icons = {
    gazprom,
    raiffeisen,
    akbars,
    vtb,
    tinkoff,
    alfa,
    sber,
    sbp,
}
const App = () => {
    const dispatch = useAppDispatch()
    const {step, sum, bank} = useAppSelector(state => state.app);
    const {initAlert} = useAppAlert();

    useEffect(() => {
        dispatch(getInitialData())
    }, []);

    const {error, success} = useAppSelector(state => state.app);

    useEffect(() => {
        error !== null && initAlert({
            type: alertTypes.ERROR,
            text: error?.message ?? '',
        });
        success !== null && initAlert({
            type: alertTypes.SUCCESS,
            text: success?.message ?? '',
        });
    }, [error, success]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        {step !== 3 ? step === 1
                            ? <span>Детали перевода</span>
                            : <span>Перевод <img src={icons[bank]} alt={'bank'} /></span> : null}</h1>
                    { step !== 3 ? <span className={styles.steps}>Шаг {step} из 3</span> : null}
                </div>
                {step === 1 ? <Form sum={sum}/> : null}
                {step === 2 ? <Transfer/> : null}
                {step === 3 ? <WaitingTransfer/> : null}
            </div>
        </div>
    );
};

export default App;
