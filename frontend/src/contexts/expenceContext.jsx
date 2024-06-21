import { createContext, useContext, useReducer } from "react";
import {
    createExpenceApi,
    deleteAnExpenceApi,
    getAllExpencesApi,
    getExpenceApi,
    updateAnExpenceApi,
} from "../services/expenceApiServices";

const ExpenceContext = createContext();

const initialState = {
    expences: [],
    isLoading: false,
    error: "",
    selectedExpence: {},
};

function expenceReducer(state, action) {
    switch (action.type) {
        case "start":
            return { ...state, isLoading: true, error: "" };
        case "AddExpence":
            return {
                ...state,
                expences: [...state.expences, action.payload],
                isLoading: false,
            };
        case "ALL_EXPENCES":
            return { ...state, isLoading: false, expences: action.payload };
        case "UPDATE_EXPENCE":
            return {
                ...state,
                expences: state.expences.map((ele) =>
                    ele._id === action.payload._id ? action.payload : ele
                ),
            };
        case "DELETE_EXPENCE":
            return {
                ...state,
                expences: state.expences.filter(
                    (ele) => ele._id !== action.payload
                ),
            };
        case "selectOne":
            return {
                ...state,
                selectedExpence: action.payload,
                isLoading: false,
            };
        case "error":
            return { ...state, isLoading: false, error: "" };
        case "default":
            return state;
    }
}

function ExpenceContextProvider({ children }) {
    const [{ expences, isLoading, error, selectedExpence }, dispatch] =
        useReducer(expenceReducer, initialState);

    const createAnExpence = (Obj) => {
        dispatch({ type: "start" });
        createExpenceApi(Obj)
            .then((res) => {
                console.log(res, "<<<====");
                dispatch({ type: "AddExpences", payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: "error", payload: err.message });
            });
    };
    const getAllExpences = () => {
        dispatch({ type: "start" });
        getAllExpencesApi()
            .then((res) => {
                dispatch({ type: "ALL_EXPENCES", payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: "error", payload: err.message });
            });
    };
    const getAnExpence = (id) => {
        dispatch({ type: "start" });
        getExpenceApi(id)
            .then((res) => {
                dispatch({ type: "selectOne", payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: "error", payload: err.message });
            });
    };

    const updateAnExpence = (id, Obj) => {
        dispatch({ type: "start" });
        updateAnExpenceApi(id, Obj)
            .then((res) => {
                dispatch({ type: "UPDATE_EXPENCE", payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: "error", payload: err.message });
            });
    };
    const deleteAnExpence = (id) => {
        dispatch({ type: "start" });
        deleteAnExpenceApi(id)
            .then((res) => {
                dispatch({ type: "DELETE_EXPENCE", payload: res.data._id });
            })
            .catch((err) => {
                dispatch({ type: "error", payload: err.message });
            });
    };

    const val = {
        expences,
        isLoading,
        error,
        createAnExpence,
        getAllExpences,
        getAnExpence,
        updateAnExpence,
        deleteAnExpence,
        selectedExpence,
    };

    return (
        <ExpenceContext.Provider value={val}>
            {children}
        </ExpenceContext.Provider>
    );
}

function useExpence() {
    const context = useContext(ExpenceContext);
    if (!context) {
        throw new Error("useExpence must be used within the ExpenceContext");
    }
    return context;
}

export { ExpenceContextProvider, useExpence };
