import React from 'react';
import styles from "./styles.module.scss";
import {Button} from "../fields";

interface ModalCancel {
    isOpen: boolean;
    handleClose: () => void;
}

export const ModalCancel = ({isOpen, handleClose}: ModalCancel) => {
    if(!isOpen) {
        return <></>
    }
    return (
        <div className={styles.modal}>
            <div className={styles.modal__overlay} onClick={handleClose}/>
            <div className={styles.modal__content} style={{minHeight: '248px'}}>
                <h2 className={styles.modal__title}>Вы уверены?</h2>
                <p className={styles.modal__text}>После отмены перевода вы сможете создать его заново в личном кабинете</p>
                    <div className={styles.buttons}>
                        <div className={styles.buttons__box50}>
                            <Button
                                buttonStyle={'filled'}
                                type={'button'}
                                text={'Отмена перевода'}
                                handler={() => {}}/>
                        </div>
                        <div className={styles.buttons__box50}>
                            <Button buttonStyle={'outline'} text={'Назад'} handler={handleClose}/>
                        </div>
                    </div>
            </div>


        </div>
    );
};
