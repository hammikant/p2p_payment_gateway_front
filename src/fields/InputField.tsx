import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Controller} from 'react-hook-form';
import styles from './styles.module.scss';
import {IInput} from "./types";

export const InputField = (
    {
        label,
        control,
        icon,
        register,
        fieldName,
        errors,
        placeholder,
        ...props
    }: IInput) => {
    return (
        <Controller
            control={control}
            name={fieldName}
            render={({field: {name}, fieldState: {error}}) => (
                <div className={styles.inputWrapper}>
                    <label className={styles.label}>{label}</label>
                    <input
                        {...register(name)}
                        {...props}
                        className={styles.input}
                        placeholder={placeholder}
                    />
                    {icon ? <span className={styles.icon}>{icon}</span> : null}
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({message}: { message: string }) => <p className={styles.errorText}>{message}</p>}
                    />
                </div>
            )}/>
    );
};
