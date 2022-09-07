import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {LoginScreen} from "./LoginScreen";
import {RegisterScreen} from "./RegisterScreen";
import {ForgetPWScreen} from "./ForgetPWScreen";
import {ResetPWScreen} from "./ResetPWScreen";
import {NotFound} from "../NotFoundScreen";

const routes = [
    {
        path: "/",
        exact:true,
        strict:true,
        main: () => <Navigate to="/auth/login" />
    },
    {
        path: "/login",
        exact:true,
        strict:true,
        main: () => <LoginScreen/>
    },
    {
        path: "/register",
        exact:true,
        strict:true,
        main: () => <RegisterScreen/>
    },
    {
        path: "/forget_password",
        exact:true,
        strict:true,
        main: () => <ForgetPWScreen/>
    },
    {
        path: "/reset_password",
        exact:true,
        strict:true,
        main: () => <ResetPWScreen/>
    },
    {
        path: "*",
        main: () => <NotFound />
    }
];

export const AuthScreen = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    element={<route.main/>}
                />
            ))}
        </Routes>
    );
}
