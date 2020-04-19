
import { combineReducers } from 'redux';
import CovidIndiaReducer from './CovidIndiaReducer';
const rootReducer = combineReducers({
    covidIndia: CovidIndiaReducer,
});

export default rootReducer;