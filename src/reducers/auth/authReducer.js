import {
    AUTH_LOADING,
    LOGIN,
    LOGOUT,
    SIGN_UP,
    AUTH_FAILURE,
    EDIT_INFO,
    RESET_PASSWORD,
    FORGET_PASSWORD
} from './authActions';

const initialState = {
    user: {},
    token: "",
    isLoading: false,
    loggedIn: false,
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case AUTH_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case LOGIN:
            return {
                user: action.user,
                token: action.token,
                loggedIn: true,
                isLoading: false,
            };
        case SIGN_UP: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case RESET_PASSWORD:
            return {
                ...state,
                isLoading: false,
            };
        case FORGET_PASSWORD:
            return {
                ...state,
                user: {...state.user,question:action.user.question},
                isLoading: false,
            };
        case EDIT_INFO:
            return {
                ...state,
                user: action.user,
                isLoading: false,
            };
        case LOGOUT:
            return {
                token: "",
                user: {},
                isLoading: false,
                loggedIn: false,
            };
        default:
            return state;
    }
};
