import React, {useEffect} from 'react';
import styles from './styles.module.scss'
import {useAppDispatch, useAppSelector} from "../hooks";
import {List} from "./atomic/List";
import {IOption} from "../fields/types";
import {formatDate} from "../helpers/formatDate";
import {Info} from "./atomic/Info";
import {Button} from "../fields";
import {changeStep, sendTransfer} from "../store/app.slice";

export const WaitingTransfer = () => {
    const dispatch = useAppDispatch()
    const {sum, bank, account_number, dateTransfer, status, numberTransfer} = useAppSelector(state => state.app);

    useEffect(() => {
        //@todo только для демонстрации setTimout

        setTimeout(() => {
            //@todo удалить добавление status оно не нужно на проде
            dispatch(sendTransfer({status: 'success', bank}))
        }, 1000);
        setTimeout(() => {
            //@todo удалить добавление status оно не нужно на проде
            dispatch(sendTransfer({status: 'rejected', bank}))
        }, 2000);
    }, [])

    const {date, time} = formatDate(dateTransfer)

    const list:IOption[] = [
        {value: 'Дата перевода', label: `${date} в ${time}`},
        {value: 'Карта получателя', label: account_number},
        {value: 'Банк получателя', label: bank},
        {value: 'Сумма перевода', label: `${sum} RUB`},
    ]
    return (
        <div className={styles.form}>
            <Info status={status} numberTransfer={numberTransfer} />
            <List listItems={list} />
            <div className={styles.mt48}>
                <Button buttonStyle={'filled'} text={'В личный кабинет'} handler={() => dispatch(changeStep(1))} />
            </div>
        </div>
    );
};
