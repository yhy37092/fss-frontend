import {API_URL} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';

export const AUTH_LOADING = 'AUTH_LOADING';
export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT = 'LOGOUT';
export const EDIT_INFO = 'EDIT_INFO ';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';

export const Register = (username, password, question, answer) => {
  return async dispatch => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/auth/user_register`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
            question,
            answer,
          }),
        }),
      );
      const resData = await response.json();
      if (!response.ok) {
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(resData.error);
      }
      dispatch({
        type: SIGN_UP,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Login
export const Login = (username, password) => {
  return async dispatch => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/auth/user_login`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
          }),
        }),
      );
      const resData = await response.json();
      if (!response.ok) {

        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(resData.error);
      }
      const token = resData.token;
      dispatch({
        type: LOGIN,
        user: {username},
        token: token,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const GetInfo = username => {
  return async dispatch => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/auth/user`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            username,
          }),
        }),
      );
      const resData = await response.json();
      if (!response.ok) {
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(resData.error);
      }
      const question = resData.question;
      dispatch({
        type: EDIT_INFO,
        user: {username, question},
      });
    } catch (err) {
      throw err;
    }
  };
};

export const ForgetPassword = (username) => {
  return async dispatch => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
          fetch(`${API_URL}/auth/forget_password`, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              username,
            }),
          }),
      );
      const resData = await response.json();
      if (!response.ok) {
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(resData.error);
      }
      dispatch({
        type: FORGET_PASSWORD,
        user:{question: resData.question},
      });
    } catch (err) {
      throw err;
    }
  };
};

export const ResetPassword = (username, password, answer) => {
  return async dispatch => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/auth/reset_password`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
            answer,
          }),
        }),
      );
      const resData = await response.json();
      if (!response.ok) {
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(resData.error);
      }
      dispatch({
        type: RESET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Logout
export const Logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT,
    });
  };
};
