import { actionTypes } from "../Constants";

const initialState = {

    loading: false,

    overall: {},
    statewise: [],
    timeLineSeries: []

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DATA_LOADING:
            return { ...state, loading: true }
        case actionTypes.OVERALL_DATA_LOADED: {
            return {
                ...state,
                overall: action.payload.statewise[0],
                statewise: action.payload.statewise.slice(1),
                timeLineSeries: action.payload.cases_time_series,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
};
export default reducer