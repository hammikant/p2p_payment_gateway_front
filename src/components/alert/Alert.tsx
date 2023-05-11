import React from 'react';
import classNames from 'classnames';
import {Close} from '../../icons';
import styles from './styles.module.scss';

export const Alert = ({style, options, message, close}: any) => {
    return (
        <div className={
            options.type === 'success'
                ? classNames(styles.wrapper, styles.success) : classNames(styles.wrapper, styles.error)} style={style}>
            <div className={styles.alert}>
                <span className={styles.alertText}>{message}</span>
                <span onClick={close} className={styles.alertClose}><Close width={'18'} height={'18'}
                                                                           color={'#ffffff'}/></span>
            </div>
        </div>
    );
};
