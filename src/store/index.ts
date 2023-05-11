import { configureStore } from '@reduxjs/toolkit'
import app from './app.slice';

export const store = configureStore({
    reducer: {
        app
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
