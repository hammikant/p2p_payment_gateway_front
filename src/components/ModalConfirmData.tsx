import React from 'react';
import styles from './styles.module.scss'
import {changeStep} from '../store/app.slice';
import {useAppDispatch, useAppSelector} from "../hooks";
import {Button} from "../fields";

interface ModalConfirmData {
    isOpen: boolean;
    values: any;
    handleClose: () => void;
    handleConfirm: () => void;
    handleCancel: () => void;
}

export const ModalConfirmData = (
    {
        isOpen,
        values,
        handleConfirm,
        handleCancel,
        handleClose
    }:ModalConfirmData
) => {
    const dispatch = useAppDispatch()
    const {sum, comment} = useAppSelector(state => state.app)
    if(!isOpen) {
        return <></>
    }

    const startTransfer = () => {
        dispatch(changeStep(2));
        handleConfirm()
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal__overlay} onClick={handleClose} />
            <div className={styles.modal__content}>
                <h2 className={styles.modal__title}>Внимание!</h2>
                <p className={styles.modal__text}>В случае перевода неправильной суммы срок зачисления будет увеличен</p>
                <div className={styles.mt16}>
                    <label className={styles.label}>Переведите точную сумму</label>
                    <output className={styles.modal__output}>{sum}</output>
                </div>
                <div className={styles.mt16}>
                    <label className={styles.label}>с комментарием</label>
                    <output className={styles.modal__output}>{comment}</output>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.buttons__box}>
                        <Button
                            buttonStyle={'filled'}
                            type={'button'}
                            text={'Начать перевод'}
                            handler={startTransfer}/>
                    </div>
                    <div className={styles.buttons__box}>
                        <Button buttonStyle={'outline'} text={'Отмена'} handler={handleCancel}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
