import {
    ADD_EXPENCE,
    DELETE_EXPENCE,
    ERROR,
    RESET_EXPENCE_ID,
    SET_EXPENCE_ID,
    SET_EXPENCES,
    START_ISADDING,
    START_ISDELETING,
    START_ISLOADING,
    START_ISUPDATING,
    UPDATE_EXPENCE,
} from "../actions/expenceActions";

const initialStatuValues = {
    isLoading: false,
    isDeleting: false,
    isAdding: false,
    isUpdating: false,
};

const initialState = {
    expences: [],
    status: initialStatuValues,
    error: null,
    selectedExpenceId: null,
};

function expenceReducer(state = initialState, action) {
    switch (action.type) {
        case START_ISLOADING:
            return {
                ...state,
                error: null,
                status: { ...state.status, isLoading: true },
            };
        case ERROR:
            return {
                ...state,
                error: action.payload,
                status: initialStatuValues,
            };
        case SET_EXPENCES:
            return {
                ...state,
                expences: action.payload,
                status: { ...state.status, isLoading: false },
            };
        case START_ISADDING:
            return {
                ...state,
                status: { ...state.status, isAdding: true },
                error: null,
            };

        case ADD_EXPENCE:
            return {
                ...state,
                expences: [...state.expences, action.payload],
                status: { ...state.status, isAdding: false },
            };
        case START_ISDELETING:
            return {
                ...state,
                status: { ...state.status, isDeleting: true },
                error: null,
            };
        case DELETE_EXPENCE:
            return {
                ...state,
                status: { ...state.status, isDeleting: false },
                expences: state.expences.filter(
                    (ele) => ele._id !== action.payload
                ),
            };
        case START_ISUPDATING:
            return {
                ...state,
                status: { ...state.status, isUpdating: true },
                error: action.payload,
            };

        case UPDATE_EXPENCE:
            return {
                ...state,
                status: { ...state.status, isUpdating: false },
                expences: state.expences.map((ele) =>
                    ele._id === action.payload._id
                        ? { ...action.payload }
                        : { ...ele }
                ),
            };
        case SET_EXPENCE_ID:
            return { ...state, selectedExpenceId: action.payload };
        case RESET_EXPENCE_ID:
            return { ...state, selectedExpenceId: null };
        default:
            return state;
    }
}

export default expenceReducer;
