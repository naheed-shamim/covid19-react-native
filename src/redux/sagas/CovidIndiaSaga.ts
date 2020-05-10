import { put } from 'redux-saga/effects';
import { actionTypes } from '../Constants';
import { CovidIndiaService } from '../../service/CovidIndiaService';


export function* getOverallStatsAndTimeline() {
    try {
        yield put({ type: actionTypes.DATA_LOADING })
        const response = yield CovidIndiaService.getGenericStats();
        yield put({ type: actionTypes.OVERALL_DATA_LOADED, payload: response.data })
        //TODO: handle success codes
    }
    catch (error) {
        //TODO: handle error, show message
    }
}

export function* getStateDistrictData() {

    try {
        yield put({ type: actionTypes.DATA_LOADING })
        const response = yield CovidIndiaService.getStateDistrictStats();
        yield put({ type: actionTypes.STATE_DISTRICT_DATA_LOADED, payload: response.data })
    }
    catch (error) {
        //TODO: handle error
    }
}

