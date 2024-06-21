import { createContext, useContext, useReducer } from "react";
import {
    createCategoryApi,
    deleteACategoryApi,
    getAllCategoriesApi,
    getCategoryApi,
    updateACategoryApi,
} from "../services/categoryApiServices";

const CategoryContext = createContext();

const initialState = {
    categories: [],
    error: "",
    isLoading: false,
    selectedCategory: null,
};

function categoryReducer(state, action) {
    switch (action.type) {
        case "start":
            return { ...state, isLoading: true, error: "" };
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload],
                isLoading: false,
                error: "",
            };
        case "FETCH_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
                error: "",
            };
        case "REMOVE_CATEGORY":
            return {
                ...state,
                categories: state.categories.filter(
                    (ele) => ele._id !== action.payload
                ),
                isLoading: false,
                error: "",
            };
        case "SEL_CATEGORY":
            return {
                ...state,
                selectedCategory: action.payload,
                isLoading: false,
                error: "",
            };
        case "UPDATE_CATEGORY":
            return {
                ...state,
                categories: state.categories.map((ele) =>
                    ele._id === action.payload._id ? action.payload : ele
                ),
            };
        case "ERROR":
            return { ...state, error: action.payload, isLoading: false };
        case "default":
            return state;
    }
}

function CategoryContextProvider({ children }) {
    const [{ categories, isLoading, selectedCategory }, dispatch] = useReducer(
        categoryReducer,
        initialState
    );

    const addCategory = (obj) => {
        dispatch({ type: "start" });
        createCategoryApi(obj)
            .then((res) => {
                dispatch({ type: "ADD_CATEGORY", payload: res.data });
            })
            .catch((err) => dispatch({ type: "ERROR", payload: err.message }));
    };

    const getAllCategories = () => {
        dispatch({ type: "start" });
        getAllCategoriesApi()
            .then((res) =>
                dispatch({ type: "FETCH_CATEGORIES", payload: res.data })
            )
            .catch((err) => dispatch({ type: "ERROR", payload: err.message }));
    };

    const getSingleCategory = (id) => {
        dispatch({ type: "start" });
        getCategoryApi(id)
            .then((res) => {
                dispatch({ type: "SEL_CATEGORY", payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: "ERROR", payload: err.message });
            });
    };
    const updateCategory = (id, updatedObj) => {
        dispatch({ type: "start" });
        updateACategoryApi(id, updatedObj)
            .then((res) => {
                dispatch({ type: "UPDATE_CATEGORY", payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: "ERROR", payload: err.message });
            });
    };

    const deleteCategory = (id) => {
        dispatch({ type: "start" });
        deleteACategoryApi(id)
            .then((res) =>
                dispatch({ type: "REMOVE_CATEGORY", payload: res.data._id })
            )
            .catch((err) => dispatch({ type: "ERROR", payload: err.message }));
    };

    const value = {
        categories,
        addCategory,
        getAllCategories,
        getSingleCategory,
        updateCategory,
        deleteCategory,
        isLoading,
        selectedCategory,
    };
    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
}

function useCategory() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within the CategoryContext");
    }
    return context;
}

export { CategoryContextProvider, useCategory };
