export interface InitialState {
    loading: boolean;
    step: number;
    sum: number;
    payments_type: 'bank' | 'spb',
    account_number: string;
    bank: bankNames;
    comment: string;
    error: IError | null;
    success: ISuccess | null;
    dateTransfer: Date;
    status: 'pending' | 'success' | 'rejected';
    numberTransfer: string;
}

export const enum BankNames {
    gazprom = 'gazprom',
    raiffeisen = 'raiffeisen',
    akbars = 'akbars',
    vtb = 'vtb',
    tinkoff = 'tinkoff',
    alfa = 'alfa',
    sber = 'sber',
    sbp = 'sbp'
}

export type bankNames =
    BankNames.akbars
    | BankNames.sbp
    | BankNames.alfa
    | BankNames.vtb
    | BankNames.gazprom
    | BankNames.raiffeisen
    | BankNames.tinkoff
    | BankNames.sber

export interface IError {
    message: string;
    errors: {};
}

export interface ISuccess {
    message: string;
}

export interface IAlert {
    type: string;
    text: string;
}
export const alertTypes = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error'
};


export const viewBankNames: { [key: string]: string } = {
    [BankNames.akbars]: 'Акбарс',
    [BankNames.sbp]: 'СПБ',
    [BankNames.alfa]: 'Альфа',
    [BankNames.vtb]: 'ВТБ',
    [BankNames.gazprom]: 'Газпром',
    [BankNames.raiffeisen]: 'Райфайзен',
    [BankNames.tinkoff]: 'Tinkoff',
    [BankNames.sber]: 'Сбербанк',
};
