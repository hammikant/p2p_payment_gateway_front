import React, {useState} from 'react';
import styles from './styles.module.scss'
import classNames from "classnames";
import {CardIcon, SpbIcon} from "../icons";

interface ISwitcher {
    getIndex: (isSpb: boolean) => void;
    isSpb: boolean;
}

export const Switcher = ({getIndex, isSpb}:ISwitcher) => {

    const handleSwitcher = (idx: number) => {
        getIndex(!!idx);
    }

    return (
        <div className={styles.switcher}>
            <button type={'button'} className={
                classNames(styles.switcher__button, !isSpb ? styles.switcher__active : {})
            } onClick={() => handleSwitcher(0)}>
                <CardIcon color={isSpb ? '#69788C' : '#007AFF'} />
                По номеру карты
            </button>
            <button type={'button'} className={
                classNames(styles.switcher__button, isSpb ? styles.switcher__active : {})
            }  onClick={() => handleSwitcher(1)}>
                <SpbIcon isColor={isSpb} />
                СБП по номеру тел
            </button>
        </div>
    );
};
