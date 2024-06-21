import {
    ADD_CATEGORY,
    CATEGORY_ERROR,
    DELETE_CATEGORY,
    GET_ALL_CATEGORIES,
    RESET_SELECTED_CATEGORY_ID,
    SET_SELECTED_CATEGORY_ID,
    START_CATEGORY_ISADDING,
    START_CATEGORY_ISDELETING,
    START_CATEGORY_ISLOADING,
    START_CATEGORY_ISUPDATING,
    UPDATE_CATEGORY,
} from "../actions/categoryActions";

const initialLoadingStatus = {
    isLoading: false,
    isAdding: false,
    isDeleting: false,
    isUpdating: false,
};

const initialState = {
    categories: [],
    status: initialLoadingStatus,
    error: null,
    selectedCategoryId: null,
};

function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case START_CATEGORY_ISADDING:
            return {
                ...state,
                error: null,
                status: { ...state.status, isAdding: true },
            };
        case CATEGORY_ERROR:
            return {
                ...state,
                status: initialLoadingStatus,
                error: action.payload,
            };
        case ADD_CATEGORY:
            return {
                ...state,
                status: { ...state.status, isAdding: false },
                categories: [...state.categories, action.payload],
            };
        case START_CATEGORY_ISLOADING:
            return {
                ...state,
                error: null,
                status: { ...state.status, isLoading: true },
            };
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                status: { ...state.status, isLoading: false },
            };
        case START_CATEGORY_ISDELETING:
            return {
                ...state,
                error: null,
                status: { ...state.status, isDeleting: true },
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                status: { ...state.status, isDeleting: false },
                categories: state.categories.filter(
                    (ele) => ele._id !== action.payload
                ),
            };
        case START_CATEGORY_ISUPDATING:
            return {
                ...state,
                error: null,
                status: { ...state.status, isUpdating: true },
            };
        case SET_SELECTED_CATEGORY_ID:
            return { ...state, selectedCategoryId: action.payload };
        case RESET_SELECTED_CATEGORY_ID:
            return { ...state, selectedCategoryId: null };
        case UPDATE_CATEGORY:
            return {
                ...state,
                status: { ...state.status, isUpdating: false },
                categories: state.categories.map((ele) =>
                    ele._id === action.payload._id ? action.payload : ele
                ),
            };
        default:
            return state;
    }
}

export default categoriesReducer;
