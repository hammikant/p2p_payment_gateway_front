import {useAlert} from 'react-alert';
import {handleError, handleSuccess} from '../store/app.slice';
import {useAppDispatch} from "./storeHooks";
import {alertTypes, IAlert} from "../store/types";

export const useAppAlert = () => {
    const alert = useAlert();
    const dispatch = useAppDispatch();

    function initAlert({text, type}: IAlert) {
        switch (type) {
            case alertTypes.SUCCESS:
                return alert.success(text, {
                    onClose: () => {
                        dispatch(handleSuccess(null));
                    }
                });
            case alertTypes.ERROR:
                return alert.error(text, {
                    onClose: () => {
                        dispatch(handleError(null));
                    }
                });
            default:
                return alert.info(text, {
                    onClose: () => {
                        dispatch(handleError(null));
                    }
                });
        }
    }

    return {initAlert};
};
