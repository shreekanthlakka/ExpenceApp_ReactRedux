import { createStore } from "redux";
import { applyMiddleware, combineReducers } from "redux";
import categoriesReducer from "../reducers/categoriesReducer";
import { thunk } from "redux-thunk";

const configurStore = () => {
    const store = createStore(
        combineReducers({
            categories: categoriesReducer,
        }),
        applyMiddleware(thunk)
    );
    return store;
};

export { configurStore };
