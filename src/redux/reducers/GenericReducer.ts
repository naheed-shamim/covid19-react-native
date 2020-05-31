import { actionTypes } from '../Constants';

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_BEGIN:
      return { ...state, loading: true };
    case actionTypes.LOADING_OVER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default reducer;
