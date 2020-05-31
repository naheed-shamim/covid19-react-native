
import { combineReducers } from 'redux';
import CovidIndiaReducer from './CovidIndiaReducer';
import CovidWorldReducer from './CovidWorldReducer';
import GenericReducer from './GenericReducer';

const rootReducer = combineReducers({
    covidIndia: CovidIndiaReducer,
    covidWorld: CovidWorldReducer,
    app: GenericReducer
});

export default rootReducer;