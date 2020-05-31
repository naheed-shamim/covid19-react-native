import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../Constants';
import { CovidIndiaService } from '../../service/CovidIndiaService';
import { startLoading, endLoading } from '../actions/GenericActions';


export function* getOverallStatsAndTimeline() {
    try {
        yield put(startLoading())
        const response = yield (CovidIndiaService.getGenericStats());
        // console.log(response)
        yield put({ type: actionTypes.OVERALL_DATA_LOADED, payload: response.data })
        yield put(endLoading())
        //TODO: handle success codes
    }
    catch (error) {
        yield put(endLoading())
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

