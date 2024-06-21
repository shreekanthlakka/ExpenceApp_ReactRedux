import { useEffect } from "react";
import {
    CURRENT_USER,
    ERROR,
    LOGIN,
    LOGOUT,
    START,
} from "../actions/userActions";

const initialState = {
    userAccount: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
    isAuthenticated: false,
};

function userReducer(
    state = localStorage.getItem("initUserState")
        ? JSON.parse(localStorage.getItem("initUserState"))
        : initialState,
    action
) {
    switch (action.type) {
        case START:
            return { ...state, isLoading: true, error: null };
        case ERROR:
            return { ...state, isLoading: false, error: action.payload };
        case LOGIN:
            return {
                ...state,
                isLoading: false,
                userAccount: action.payload,
                isLoggedIn: true,
            };
        case LOGOUT:
            return { ...initialState };
        case CURRENT_USER:
            return {
                ...state,
                isLoading: false,
                userAccount: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated,
            };

        default:
            return state;
    }
}

export default userReducer;
