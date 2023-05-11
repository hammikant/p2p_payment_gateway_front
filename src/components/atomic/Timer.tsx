import React from 'react';
import {useTimer} from "react-timer-hook";
import styles from './styles.module.scss'
import {Rotate} from "../../icons";

interface TimerProps {
    time:Date,
    handelRefresh: () => void;
    isRefreshed: boolean
}

export const Timer = ({time, handelRefresh, isRefreshed}:TimerProps) => {
    const {
        seconds,
        minutes,
        isRunning,
        restart,
    } = useTimer({ expiryTimestamp: time, onExpire: () => console.warn('onExpire called') });
    const timeR = new Date();
    timeR.setSeconds(time.getSeconds() + 599);
    return (
        <div className={styles.timer}>
            <div className={styles.timer__time}>
                <span className={styles.timer__text}>0{minutes}:</span>
                <span className={styles.timer__text}>{seconds < 10 ? `0${seconds}` : seconds }</span>
            </div>
            <span className={styles.timer__rotate} onClick={() => {
                if(!isRunning) {
                    restart(timeR);
                    handelRefresh()
                }
            }}>
                <Rotate />
            </span>
        </div>
    );
};
