import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js'; // Importing the user reducer
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine all reducers
const rootReducers = combineReducers({ user: userReducer });

// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Configure the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for persistence
        }),
});

// Create a persistor to persist the store
export const persister = persistStore(store);
