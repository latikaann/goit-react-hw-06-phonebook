import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer } from './slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
