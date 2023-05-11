import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import styles from './styles.module.scss'
import {Button, InputField, Select} from "../fields";
import {IOption} from "../fields/types";
import gazprom from '../assets/images/gazprom.png';
import raiffeisen from '../assets/images/raiffeisen.png';
import akbars from '../assets/images/akbars.png';
import vtb from '../assets/images/vtb.png';
import tinkoff from '../assets/images/tinkoff.png';
import alfa from '../assets/images/alfa.png';
import sber from '../assets/images/sber.png';
import sbp from '../assets/images/sbp.png';
import {Switcher} from "./Switcher";
import {ModalConfirmData} from "./ModalConfirmData";
import {useAppDispatch} from "../hooks";
import {IPayloadData, sendPaymentsType} from "../store/app.slice";

const schemaSpb = yup.object({
    sum: yup.string()
});

const schema = yup.object({
    sum: yup.number().required(),
    bank: yup.string().required()
});

export interface IBankName extends IOption {
    icon: string | null;
}

export const bankNames: IBankName[] = [
    {label: 'Любой', icon: null, value: 'any'},
    {label: 'Газпром', icon: gazprom, value: 'gazprom'},
    {label: 'Райфайзен', icon: raiffeisen, value: 'raiffeisen'},
    {label: 'Акбарс', icon: akbars, value: 'akbars'},
    {label: 'ВТБ', icon: vtb, value: 'vtb'},
    {label: 'Tinkoff', icon: tinkoff, value: 'tinkoff'},
    {label: 'Альфа', icon: alfa, value: 'alfa'},
    {label: 'Сбербанк', icon: sbp, value: 'sber'},
]

export const Form = ({sum}:{sum: number}) => {
    const dispatch = useAppDispatch()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [isConfirm, setConfirm] = useState<boolean>(false)
    const [isSpb, setSpb] = useState<boolean>(false)
    const {control, register, watch, setValue, getValues, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(isSpb ? schemaSpb : schema)
    });

    useEffect(() => {
        setValue('sum', sum)
    }, [sum])

    const renderIcon = () => {
        return <span className={styles.form__icon}>RUB</span>
    }

    const handleNext = handleSubmit((values) => {
        if (isConfirm) {
        } else {

        }
    })

    const handleConfirmation = () => {
        const bank = getValues('bank')
        const data:IPayloadData = { payments_type:  isSpb ? 'spb' : 'bank', bankName: bank}
        dispatch(sendPaymentsType(data));
        setOpen(true)
    }

    return (

            <form className={styles.form}>
                <label className={styles.label}>Способ перевода</label>
                <Switcher getIndex={isSpb1 => setSpb(isSpb1)} isSpb={isSpb}/>
                <div className={styles.mt16}>
                    <output className={styles.modal__output}>{sum} {renderIcon()}</output>
                </div>
                {!isSpb
                    ? (
                        <div className={styles.mt16}>
                            <Select
                                label={'Банк получателя'}
                                control={control}
                                register={register}
                                fieldName={'bank'}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                options={bankNames}
                                tooltip={'Выберите наиболее удобный для вас банк. Внутри банка переводы происходят быстрее и как правило, без комиссии.'}
                            />
                        </div>
                    ) : (
                        <div className={styles.mt16}>
                            <p className={styles.form__spbTooltip}>
                                Для перевода, выберите в мобильном приложении или на сайте банка перевод «По номеру
                                телефона»
                                или
                                «Через Систему Быстрых Платежей (СПБ)»
                            </p>
                        </div>
                    )}

                <div className={styles.buttons}>
                    <div className={styles.buttons__box}>
                        <Button
                            buttonStyle={'filled'}
                            type={'button'}
                            text={'Продолжить'}
                            handler={
                                () => isConfirm ? handleNext : handleConfirmation()
                            }/>
                    </div>
                    <div className={styles.buttons__box}>
                        <Button buttonStyle={'outline'} text={'Отмена'} handler={() => {
                        }}/>
                    </div>
                </div>
                <ModalConfirmData
                    handleConfirm={() => setConfirm(true)}
                    isOpen={isOpen}
                    values={getValues()}
                    handleClose={() => setOpen(false)}
                    handleCancel={() => setConfirm(false)}
                />
            </form>
    );
};
