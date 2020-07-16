import { actionTypes } from "../Constants";

const initialState = {
    loading: false,
    summary: null,
    error: null
    // globalLastUpdateTime: '',
    // countries: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DATA_LOADING:
            return { ...state, loading: true }
        case actionTypes.WORLD_SUMMARY_LOADED: {
            return {
                ...state,
                summary: action.payload,
                loading: false,
                error: null
            };
        }
        case actionTypes.WORLD_SUMMARY_FAILED: {
            return {
                ...state,
                summary: null,
                loading: false,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
export default reducer