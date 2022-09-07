import React, {Suspense} from "react";
import {Route, Routes, Navigate} from "react-router-dom";

//Redux
import {useSelector} from 'react-redux';

import './i18n';
import {AuthScreen, MainScreen} from "./screens";

function App() {
    const auth = useSelector(state => state.auth)
    return (
        <Suspense fallback="loading...">
            <Routes>
                <Route exact path="/" element={<Navigate to="/fss" />}/>
                <Route exact path="fss/*" element={auth.loggedIn ? <MainScreen/> : <Navigate to="/auth" />}/>
                <Route path="auth/*" element={<AuthScreen/>}/>
            </Routes>
        </Suspense>
    );
}

export default App;
