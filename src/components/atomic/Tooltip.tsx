import React from 'react';
import {InfoIcon} from "../../icons";
import styles from './styles.module.scss'

export const Tooltip = ({text}:{text: string}) => {
    return (
        <div className={styles.tooltip}>
            <InfoIcon />
            <div className={styles.tooltipTextWrapper}>
                <p className={styles.tooltip__text}>{text}</p>
            </div>
        </div>
    );
};
