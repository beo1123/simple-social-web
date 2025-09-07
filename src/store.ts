import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/authSlice'
import storage from '@/utils/storage';
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Chỉ persist auth
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;