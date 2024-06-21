import {
    createCategoryApi,
    deleteACategoryApi,
    getAllCategoriesApi,
    updateACategoryApi,
} from "../services/categoryApiServices";
import { CustomError } from "../utils/customError";

export const START_CATEGORY_ISLOADING = "START_CATEGORY_ISLOADING";
export const START_CATEGORY_ISADDING = "START_CATEGORY_ISADDING";
export const START_CATEGORY_ISDELETING = "START_CATEGORY_ISDELETING";
export const START_CATEGORY_ISUPDATING = "START_CATEGORY_ISUPDATING";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const CATEGORY_START = "CATEGORY_START";
export const CATEGORY_ERROR = "CATEGORY_ERROR";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const SET_SELECTED_CATEGORY_ID = "SET_SELECTED_CATEGORY_ID";
export const RESET_SELECTED_CATEGORY_ID = "RESET_SELECTED_CATEGORY_ID";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

const startAddCategory = (Obj, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_CATEGORY_ISADDING });
            // dispatch(categoryStart);
            const res = await createCategoryApi(Obj);
            if (!res.success) {
                throw new CustomError(res.statusCode, res.message, res.error);
            }
            dispatch(addCategory(res.data));
            onSuccess();
        } catch (error) {
            dispatch(categoryError(error));
        }
    };
};

const startGetAllCategories = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_CATEGORY_ISLOADING });
            // dispatch(categoryStart());
            const res = await getAllCategoriesApi();
            if (!res.success) {
                throw new CustomError(res.statusCode, res.message, res.error);
            }
            dispatch(getAllCategories(res.data));
        } catch (error) {
            dispatch(categoryError(error));
        }
    };
};

const startDeleteCategory = (id, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_CATEGORY_ISDELETING });
            dispatch(categoryStart());
            const res = await deleteACategoryApi(id);
            if (!res.success) {
                throw new CustomError(res.statusCode, res.message, res.error);
            }
            dispatch(deleteCategory(res.data._id));
            onSuccess();
        } catch (error) {
            dispatch(categoryError(error));
        }
    };
};

const startUpdateCategory = (id, updatedObj, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_CATEGORY_ISUPDATING });
            const res = await updateACategoryApi(id, updatedObj);
            if (!res.success) {
                throw new CustomError(res.statusCode, res.message, res.error);
            }
            dispatch(updateCategory(res.data));
            onSuccess();
        } catch (error) {
            dispatch(categoryError(error));
        }
    };
};

const updateCategory = (data) => {
    return {
        type: UPDATE_CATEGORY,
        payload: data,
    };
};

const editCategory = (id) => {
    return {
        type: SET_SELECTED_CATEGORY_ID,
        payload: id,
    };
};

const resetEditCategory = () => {
    return {
        type: RESET_SELECTED_CATEGORY_ID,
    };
};

const deleteCategory = (id) => {
    return {
        type: DELETE_CATEGORY,
        payload: id,
    };
};

const getAllCategories = (data) => {
    return {
        type: GET_ALL_CATEGORIES,
        payload: data,
    };
};

const addCategory = (data) => {
    return {
        type: ADD_CATEGORY,
        payload: data,
    };
};

const categoryStart = () => {
    return {
        type: CATEGORY_START,
    };
};

const categoryError = (error) => {
    return {
        type: CATEGORY_ERROR,
        payload: error,
    };
};

export {
    startAddCategory,
    startGetAllCategories,
    startDeleteCategory,
    editCategory,
    resetEditCategory,
    startUpdateCategory,
};
