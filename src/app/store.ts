// store configure
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import { pokemonApi } from '@api/pokemonApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  // add other reducers here
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [pokemonApi.reducerPath], // persist the RTK Query cache
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
