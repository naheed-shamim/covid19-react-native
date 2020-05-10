
import { combineReducers } from 'redux';
import CovidIndiaReducer from './CovidIndiaReducer';
import CovidWorldReducer from './CovidWorldReducer';
const rootReducer = combineReducers({
    covidIndia: CovidIndiaReducer,
    covidWorld: CovidWorldReducer
});

export default rootReducer;