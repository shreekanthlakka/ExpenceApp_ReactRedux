import {
    createExpenceApi,
    deleteAnExpenceApi,
    getAllExpencesApi,
    updateAnExpenceApi,
} from "../services/expenceApiServices";
import { CustomError } from "../utils/customError";
export const START_ISLOADING = "START_ISLOADING";
export const START_ISADDING = "START_ISADDING";
export const START_ISDELETING = "START_ISDELETING";
export const START_ISUPDATING = "START_ISUPDATING";

export const ADD_EXPENCE = "ADD_EXPENCE";
export const DELETE_EXPENCE = "DELETE_EXPENCE";
export const UPDATE_EXPENCE = "UPDATE_EXPENCE";
export const SET_EXPENCES = "SET_EXPENCES";

export const ERROR = "ERROR";
export const SET_EXPENCE_ID = "SET_EXPENCE_ID";
export const RESET_EXPENCE_ID = "RESET_EXPENCE_ID";

export const START_ADD_EXPENCE = "START_ADD_EXPENCE";
export const START_DELETE_EXPENCE = "START_DELETE_EXPENCE";

export const START_EXPENCE = "START_EXPENCE";

const startGetAllExpences = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_ISLOADING });
            const res = await getAllExpencesApi();
            if (!res.success) {
                throw new CustomError(res.statusCode, res.message, res.error);
            }
            dispatch(getAllExpences(res.data));
        } catch (err) {
            dispatch(error(err));
        }
    };
};

const startAddExpences = (obj, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_ISADDING });
            const res = await createExpenceApi(obj);
            if (!res.success) {
                throw new CustomError(res.statusCode, res.message, res.error);
            }
            dispatch(addExpences(res.data));
            onSuccess();
        } catch (err) {
            dispatch(error(err));
        }
    };
};

const startDeleteExpences = (id, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_ISDELETING });
            const res = await deleteAnExpenceApi(id);
            if (!res.success) {
                throw new CustomError(res.statusCode, res.message, res.error);
            }
            dispatch(deleteExpences(res.data._id));
            onSuccess();
        } catch (err) {
            dispatch(error(err));
        }
    };
};

const startUpdateExpences = (id, updatedObj, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_ISUPDATING });
            const res = await updateAnExpenceApi(id, updatedObj);
            if (!res.success) {
                throw new CustomError(res.statusCode, res.message, res.error);
            }
            dispatch(updateExpences(res.data));
            onSuccess();
        } catch (err) {
            dispatch(error(err));
        }
    };
};

const resetExpenceId = () => {
    return {
        type: RESET_EXPENCE_ID,
    };
};

const setExpenceId = (id) => {
    return {
        type: SET_EXPENCE_ID,
        payload: id,
    };
};

const updateExpences = (updatedObj) => {
    return {
        type: UPDATE_EXPENCE,
        payload: updatedObj,
    };
};

const deleteExpences = (id) => {
    return {
        type: DELETE_EXPENCE,
        payload: id,
    };
};

const addExpences = (data) => {
    return {
        type: ADD_EXPENCE,
        payload: data,
    };
};

const getAllExpences = (data) => {
    return {
        type: SET_EXPENCES,
        payload: data,
    };
};

const error = (err) => {
    return {
        type: ERROR,
        payload: err,
    };
};

export {
    startGetAllExpences,
    startAddExpences,
    startDeleteExpences,
    startUpdateExpences,
    setExpenceId,
    resetExpenceId,
};
