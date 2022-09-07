import {
    FSS_LOADING,
    FSS_FAILURE,
    FSS_LISTFILE,
    FSS_SHARE,
    FSS_LISTSHARE,
    FSS_CREATEDIR,
    FSS_DELETEFILE,
    FSS_CHANGEPATH,
    FSS_UPLOADFILE,
} from './fssActions';

const initialState = {
    path: "/",
    files:[],
    shares:[],
    isLoading: false,
};

export const fssReducer = (state = initialState, action) => {

    switch (action.type) {
        case FSS_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case FSS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case FSS_LISTFILE:
            return {
                ...state,
                files: action.files,
                isLoading: false,
            };
        case FSS_LISTSHARE:
            return {
                ...state,
                shares: action.shares,
                isLoading: false,
            };
        case FSS_CREATEDIR:
            return {
                ...state,
                isLoading: false,
            };
        case FSS_SHARE:
            return {
                ...state,
                isLoading: false,
            };
        case FSS_DELETEFILE:
            return {
                ...state,
                isLoading: false,
            };
        case FSS_CHANGEPATH:
            return {
                ...state,
                files: [],
                path: action.path,
                isLoading: false,
            };
        case FSS_UPLOADFILE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
