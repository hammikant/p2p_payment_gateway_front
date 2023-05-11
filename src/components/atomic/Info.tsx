import React from 'react';
import {useTimer} from "react-timer-hook";
import styles from './styles.module.scss'
import {Error, Success} from "../../icons";

interface IInfoProps {
    status: 'pending' | 'success' | 'rejected',
    numberTransfer: string
}

export const Info = ({status, numberTransfer}:IInfoProps) => {
    const timeR = new Date();
    timeR.setSeconds(timeR.getSeconds() + 599);
    const {
        seconds,
        minutes,
        isRunning,
        restart,
    } = useTimer({ expiryTimestamp: timeR, onExpire: () => console.warn('onExpire called') });

    if(status === 'rejected') {
        return (
            <div className={styles.info}>
                <div className={styles.info__timerWrapper}>
                   <Error />
                </div>
                <span className={styles.info__rejected}>Перевод не получен</span>
                <span className={styles.info__subtext}>{numberTransfer}</span>
            </div>
        )
    }

    if(status === 'success') {
        return (
            <div className={styles.info}>
                <div className={styles.info__timerWrapper}>
                    <Success />
                </div>
                <span className={styles.info__success}>Перевод получен</span>
                <span className={styles.info__subtext}>{numberTransfer}</span>
            </div>
        )
    }

    return (
        <div className={styles.info}>
            <div className={styles.info__timerWrapper}>
                <span className={styles.info__timer}>0{minutes}:</span>
                <span className={styles.info__timer}>{seconds < 10 ? `0${seconds}` : seconds }</span>
            </div>
            <span className={styles.info__pending}>Ожидаем перевод</span>
            <span className={styles.info__subtext}>{numberTransfer}</span>
        </div>
    )
};
