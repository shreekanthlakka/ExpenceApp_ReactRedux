import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "../reducers/userReducer";
import categoriesReducer from "../reducers/categoriesReducer";
import expenceReducer from "../reducers/expenceReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            category: categoriesReducer,
            expence: expenceReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
        // applyMiddleware(thunk)
    );
    return store;
};

export default configureStore;
