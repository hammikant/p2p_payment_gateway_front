import React, {useState} from 'react';
import styles from './styles.module.scss'
import {useAppDispatch, useAppSelector} from "../hooks";
import {bankNames} from "./Form";
import gazprom from '../assets/images/gazprom.png';
import raiffeisen from '../assets/images/raiffeisen.png';
import akbars from '../assets/images/akbars.png';
import vtb from '../assets/images/vtb.png';
import tinkoff from '../assets/images/tinkoff.png';
import alfa from '../assets/images/alfa.png';
import sber from '../assets/images/sber.png';
import sbp from '../assets/images/sbp.png';
import classNames from "classnames";
import {Copy} from "../icons";
import { useTimer } from 'react-timer-hook';
import {Timer} from "./atomic/Timer";
import {changeStep, handleSuccess, refreshTimer, sendTransfer} from "../store/app.slice";
import {Button} from "../fields";
import {ModalCancel} from "./ModalCancel";

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

export const Transfer = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState<boolean>(false);
    const {sum, comment, bank, account_number, payments_type} = useAppSelector(state => state.app);
    const bankName = bankNames.find(b => b.value === bank)?.label;
    const time = new Date();
    time.setSeconds(time.getSeconds() + 599);

    const renderIcon = () => {
        return <img width={20} height={20} src={icons[bank]} />
    }

    const renderClipBoard = (text: string) => {
        const readClipboard = async () => {
            await navigator.clipboard.writeText(text);
            dispatch(handleSuccess({message: 'Скопировано в буфер обмена'}))
        }
        return (
            <span className={styles.clipboard} onClick={readClipboard}>
                <Copy color={'#007AFF'} />
            </span>
        )
    }

    const handelRefresh = () => {
        dispatch(refreshTimer())
    }

    const transferCompleted = () => {
        dispatch(changeStep(3));
        dispatch(sendTransfer({status: 'success', bank}))
    }

    return (
        <div className={styles.form}>
            <div className={styles.form__header}>
                <div>
                    <p className={styles.form__headerTitle}>Переведите сумму</p>
                    <p className={styles.form__headerText}>{sum} RUB</p>
                </div>
                <Timer time={time} handelRefresh={handelRefresh} isRefreshed={true} />
            </div>
            <div className={styles.mt16}>
                <label className={styles.label}>{payments_type === 'bank' ? 'На номер карты' : 'По номеру телефона'} </label>
                <output className={styles.modal__output}>{account_number} {renderClipBoard(account_number)}</output>
            </div>
            <div className={styles.mt16}>
                <label className={styles.label}>Банк получатель</label>
                <output className={classNames(styles.modal__output, styles.modal__output__flexStart)}>{renderIcon()} {bankName}</output>
            </div>
            <div className={styles.mt16}>
                <label className={styles.label}>с комментарием</label>
                <output className={styles.modal__output}>{comment} {renderClipBoard(comment)}</output>
            </div>
            <p className={styles.label}>После совершения перевода нажмите кнопку «Перевод выполнен»</p>
            <div className={styles.buttons}>
                <div className={styles.buttons__box}>
                    <Button
                        buttonStyle={'filled'}
                        type={'button'}
                        text={'Перевод выполнен'}
                        handler={transferCompleted}/>
                </div>
                <div className={styles.buttons__box}>
                    <Button buttonStyle={'outline'} text={'Отмена'} handler={() =>  setOpen(true)}/>
                </div>
            </div>
            <ModalCancel isOpen={isOpen} handleClose={() => setOpen(false)} />
        </div>
    );
};
