export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ERROR = "ERROR";
export const START = "START";
export const CURRENT_USER = "CURRENT_USER";

import {
    currentUserApi,
    loginApi,
    logoutApi,
} from "../services/userApiServices";

const startLogin = ({ email, password }, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch(start());
            const res = await loginApi({ email, password });
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                    error: res.error,
                };
            }
            dispatch(login(res.data));
            onSuccess();
        } catch (error) {
            dispatch(error(error));
        }
    };
};

const startLogout = (onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch(start());
            const res = await logoutApi();
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                    error: res.error,
                };
            }
            dispatch(logout());
            onSuccess();
        } catch (error) {
            dispatch(error(error));
        }
    };
};

const startCurrentUser = () => {
    return async (dispatch) => {
        try {
            dispatch(start());
            const res = await currentUserApi();
            console.log("CURRENT USER => ", res);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                    error: res.error,
                };
            }
            dispatch(
                currentUser({
                    isAuthenticated: res.isAuthenticated,
                    user: res.data,
                })
            );
        } catch (err) {
            dispatch(error(err));
        }
    };
};

const login = (data) => {
    console.log("IN ACTION ==>", data);
    return {
        type: LOGIN,
        payload: data,
    };
};

const logout = () => {
    return {
        type: LOGOUT,
    };
};

const currentUser = (data) => {
    return {
        type: CURRENT_USER,
        payload: data,
    };
};

const error = (error) => {
    return {
        type: ERROR,
        payload: error,
    };
};

const start = () => {
    return {
        type: START,
    };
};

export { startLogin, startLogout, startCurrentUser, login, error, start };
