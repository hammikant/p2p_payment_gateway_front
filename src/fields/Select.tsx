import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {IOption} from './types';
import {ChevronDown} from '../icons';
import {ISelect} from './types';
import styles from './styles.module.scss';
import {IBankName} from "../components/Form";
import {Tooltip} from "../components/atomic";

export const Select = (
    {
        label,
        control,
        register,
        errors,
        fieldName,
        setValue,
        options,
        customIcon,
        tooltip,
        ...props
    }: ISelect<IBankName[]>) => {

    const [showDrop, setShowDrop] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const handleSelect = (item: IOption) => {
        setShowDrop(false);
        setValue(fieldName, item.value);
        setText(item.label);
    };

    return (
        <Controller
            control={control}
            name={fieldName}
            render={({field: {name}, fieldState: {error}}) => (
                <>
                    <label className={styles.label}>
                        {label}
                        {tooltip ? <Tooltip text={tooltip}/> : null}
                    </label>
                    <div
                        className={styles.select}
                        onMouseEnter={() => setShowDrop(true)}
                        onMouseLeave={() => setShowDrop(false)}
                    >
                        {customIcon
                            ? (<span className={styles.selectCustomIcon}>
                                {customIcon}
                                </span>)
                            : null}
                        <output
                            className={styles.selectOutput}
                            {...register(fieldName)}
                        >{text}</output>
                        {customIcon === undefined ? <span className={styles.selectIcon}><ChevronDown/></span> : null}
                        {
                            showDrop
                                ? (
                                    <ul className={styles.selectList}>
                                        {options.map((item, index) => (
                                            <li key={index} className={styles.selectItem}
                                                onClick={() => handleSelect(item)}>
                                                {item.icon !== null
                                                    ? <img src={item.icon} className={styles.select__image} alt={'icon'}/>
                                                    : null}
                                                {item.label}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null
                        }
                    </div>
                </>
            )}
        />
    );
};
