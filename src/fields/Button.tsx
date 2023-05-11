import React from 'react';
import styles from './styles.module.scss'
import classNames from "classnames";
import {IButton} from "./types";

export const Button = ({text, buttonStyle, handler, ...props}:IButton) => {
    return (
        <button
            {...props}
            className={classNames(styles.button, styles[buttonStyle])} onClick={handler}>{text}</button>
    );
};
