import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {Provider} from "react-redux";
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authReducer,fssReducer} from "./reducers";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {PersistGate} from 'redux-persist/integration/react'

import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

// WHITELIST
const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['token'] // only token will be persisted
};
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    fss:fssReducer,
});

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'] // only auth will be persisted
}

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <Router>
                    <Routes>
                        <Route exact path="/*" element={<App/>}/>
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
