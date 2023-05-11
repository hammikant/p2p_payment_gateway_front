import React, {useEffect} from 'react';
import styles from './App.module.scss'
import {Form, Transfer, WaitingTransfer} from "./components";
import {useAppAlert, useAppDispatch, useAppSelector} from "./hooks";
import {getInitialData} from "./store/app.slice";
import {alertTypes} from "./store/types";


const App = () => {
    const dispatch = useAppDispatch()
    const {step, sum} = useAppSelector(state => state.app);
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
                        {step !== 3 ? step === 1 ? 'Детали перевода' : 'Перевод' : null}</h1>
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
