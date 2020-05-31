import { actionTypes } from "../Constants";

const initialState = {
    loading: false,
    summary: null,
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
                // globalLastUpdateTime: action.payload.Date,
                // countries: action.payload.Countries,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
};
export default reducer