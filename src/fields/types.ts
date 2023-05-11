import {ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode} from "react";
import {Control, UseFormRegister, UseFormSetValue} from "react-hook-form";

export interface IOption {
    label: string;
    value: string;
}

export interface ISelect<Opt> extends HTMLAttributes<HTMLDivElement> {
    label: string;
    control: Control;
    register: UseFormRegister<any>;
    fieldName: string;
    errors: any;
    watch: any;
    setValue: UseFormSetValue<any>;
    customIcon?: ReactNode;
    options: Opt;
    tooltip?: string;
}

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
    control: Control;
    register: UseFormRegister<any>;
    fieldName: string;
    errors: any;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonStyle: 'filled' | 'outline';
    text: string;
    handler: () => void;
}
