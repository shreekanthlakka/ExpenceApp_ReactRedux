import { createContext, useContext, useReducer } from "react";
import { loginApi } from "../services/userApiServices";

const UserContext = createContext();

const initialState = {
    user: {},
    isLoggedIn: false,
    isLoading: false,
    error: "",
};

function userReducer(state, action) {
    switch (action.type) {
        case "start":
            return { ...state, isLoading: true, error: "" };
        case "login":
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                isLoading: false,
                error: "",
            };
        case "error":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                isLoggedIn: false,
                user: {},
            };
        case "default":
            return state;
    }
}

function UserContextProvider({ children }) {
    const [{ user, isLoggedIn, isLoading, error }, dispatch] = useReducer(
        userReducer,
        initialState
    );
    async function login(email, password) {
        try {
            dispatch({ type: "start" });
            const user = await loginApi(email, password);
            if (user.success) {
                dispatch({ type: "login", payload: user.user });
            }
        } catch (error) {
            dispatch({ type: "error", payload: error.message });
        }
    }

    const value = { login, user, isLoggedIn, isLoading, error };
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("context used outside the provider");
    }
    return context;
}

export { UserContextProvider, useUser };
