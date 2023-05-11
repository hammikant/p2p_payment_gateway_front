import React from 'react';
import styles from './styles.module.scss'
import {IOption} from "../../fields/types";
import gazprom from "../../assets/images/gazprom.png";
import raiffeisen from "../../assets/images/raiffeisen.png";
import akbars from "../../assets/images/akbars.png";
import vtb from "../../assets/images/vtb.png";
import tinkoff from "../../assets/images/tinkoff.png";
import alfa from "../../assets/images/alfa.png";
import sber from "../../assets/images/sber.png";
import sbp from "../../assets/images/sbp.png";
import {viewBankNames} from "../../store/types";

const icons = {
    gazprom,
    raiffeisen,
    akbars,
    vtb,
    tinkoff,
    alfa,
    sber,
    sbp,
}

export const List = ({listItems}:{listItems:IOption[]}) => {
    const Item = ({item}:{item:IOption}) => {

        if(item.value === 'Банк получателя') {
            return (
                <li className={styles.list__item}>
                    <span className={styles.list__label}>{item.value}</span>
                    <span className={styles.list__text}>
                        <img width={20} height={20} src={
                            //@ts-ignore
                            icons[item.label]
                        }/>
                        {viewBankNames[item.label]}
                    </span>
                </li>
            )
        }

        return (
            <li className={styles.list__item}>
                <span className={styles.list__label}>{item.value}</span>
                <span className={styles.list__text}>{item.label}</span>
            </li>
        )
    }

    return (
        <ul className={styles.list}>
            {listItems.map((l, index) => <Item key={index} item={l} />)}
        </ul>
    );
};
