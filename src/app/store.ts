import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { initStorageListener } from 'src/entities/session/lib/storageListener';
import { sessionReducer } from '../entities/session';
import { transactionsReducer } from '../entities/transaction';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const useAppDispatch = () => useDispatch<AppDispatch>();

initStorageListener();
