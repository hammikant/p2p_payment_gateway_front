import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BankNames, bankNames, IError, InitialState, ISuccess} from "./types";
import {instanceApi, mockInstanceApi} from "../api";

const initialState: InitialState = {
    loading: false,
    step: 1,
    sum: 0,
    payments_type: 'bank',
    bank: BankNames.akbars,
    comment: '',
    account_number: '',
    error: null,
    success: null,
    dateTransfer: new Date(),
    status: 'pending',
    numberTransfer: ''
}

interface IInitialResponse {
    sum: number;
}

const responseInitial:IInitialResponse = {
    sum: 2500,

}

export const getInitialData = createAsyncThunk(
    'app/getInitialData',
    async () => {
        try {
            await mockInstanceApi.onGet('/initial-data')
                .reply(200, responseInitial);
            const res = await instanceApi.get('/initial-data');
            console.log('@@@@@@@ ', res)
            return res.data as IInitialResponse;
        } catch (e) {
            console.log(e)
        }
    }
)

export interface IPayloadData {
    payments_type: 'bank' | 'spb',
    bankName?: string;
}

interface IPaymentsDataResponse {
    payments_type: 'bank' | 'spb',
    account_number: string;
    bank: bankNames;
    comment: string;
    sum: number;
}

const IPaymentsDataResponse:IPaymentsDataResponse = {
    payments_type: "bank",
    bank: BankNames.sber,
    sum: 2500,
    comment: 'Какой то комментарий с бека',
    account_number: '4364 4631 5588 2493'
}

export const sendPaymentsType = createAsyncThunk(
    'app/sendPayloadType',
    async (data:IPayloadData, {dispatch}) => {
        try {
            await mockInstanceApi.onPost('/payload-type')
                .reply(200, IPaymentsDataResponse);
            const res = await instanceApi.post<IPaymentsDataResponse>('/payload-type', data);

            return res.data as IPaymentsDataResponse;
        } catch (e) {
            dispatch(handleError({message: 'Какая то ошибка',  errors: {}}))
        }
    }
)

export const refreshTimer = createAsyncThunk(
    'app/refreshTimer',
    async (_, {dispatch}) => {
        try {
            await mockInstanceApi.onGet('/refresh-timer')
                .reply(200, {message: 'Время таймера обновлено. Добавлено 5 минут'});
            const res = await instanceApi.get<{message: string}>('/refresh-timer');

            dispatch(handleSuccess(res.data))
            return;
        } catch (e) {
            dispatch(handleError({message: 'Какая то ошибка',  errors: {}}))
        }
    }
)


interface TransferResponse {
    dateTransfer: Date;
    account_number: string;
    bank: bankNames;
    sum: number;
    status: 'pending' | 'success' | 'rejected',
    numberTransfer: string;
}

const transferResponse:TransferResponse = {
    dateTransfer: new Date(),
    account_number: '4364 4631 5588 2493',
    bank: BankNames.sber,
    sum: 2500,
    status: 'pending',
    numberTransfer: '№09876654123'
}

export const sendTransfer = createAsyncThunk(
    'app/sendTransfer',
    //@todo удалить добавление status оно не нужно на проде
    async ({status}:{status: 'pending' | 'success' | 'rejected'},{dispatch}) => {
        try {
            await mockInstanceApi.onGet('/transfer')
                .reply(200, {...transferResponse, status});
            const res = await instanceApi.get<TransferResponse>('/transfer');
            return res.data as TransferResponse;
        } catch (e) {
            dispatch(handleError({message: 'Какая то ошибка',  errors: {}}))
        }
    }
)

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeStep: (state, {payload}) => {
            state.step = payload
        },
        handleError: (state, {payload}: { payload: IError | null }) => {
            state.error = payload;
        },
        handleSuccess: (state, {payload}: { payload: ISuccess | null }) => {
            state.success = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getInitialData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getInitialData.fulfilled, (state, {payload}: any) => {
            state.loading = false;
            state.sum = payload.sum
        })
        builder.addCase(getInitialData.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(sendPaymentsType.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(sendPaymentsType.fulfilled, (state, {payload}: any) => {
            state.loading = false;
            state.sum = payload.sum;
            state.bank = payload.bank;
            state.comment = payload.comment;
            state.account_number = payload.account_number;
            state.payments_type = payload.payments_type
        })
        builder.addCase(sendPaymentsType.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(sendTransfer.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(sendTransfer.fulfilled, (state, {payload}: any) => {
            state.loading = false;
            state.sum = payload.sum;
            state.bank = payload.bank;
            state.account_number = payload.account_number;
            state.dateTransfer = payload.dateTransfer;
            state.status = payload.status;
            state.numberTransfer = payload.numberTransfer;
        })
        builder.addCase(sendTransfer.rejected, (state) => {
            state.loading = false;
        })

    }
});

export const {handleError,  handleSuccess, changeStep} = appSlice.actions;

export default appSlice.reducer
