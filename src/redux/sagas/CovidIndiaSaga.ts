import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../Constants';
import { startLoading, endLoading } from '../actions/GenericActions';
import { callCovidIndiaAPI, handleError } from '../../service/WebService';
import { CovidIndiaApi } from '../../service/Config';
import { showShortToast } from '../../utils/Toast';

export function* getOverallStatsAndTimeline() {
    try {
        yield put(startLoading())
        const indiaData = yield callCovidIndiaAPI(CovidIndiaApi.All_DATA)
        yield put({ type: actionTypes.OVERALL_DATA_LOADED, payload: indiaData })
        yield put(endLoading())
        //TODO: handle success codes
    }
    catch (error) {
        const errorMsg = handleError(error)
        showShortToast(errorMsg);
        yield put(endLoading())

    }
}

export function* getStateDistrictData() {

    try {
        yield put({ type: actionTypes.DATA_LOADING })
        const districtData = yield callCovidIndiaAPI(CovidIndiaApi.STATE_WISE);
        yield put({ type: actionTypes.STATE_DISTRICT_DATA_LOADED, payload: districtData })
    }
    catch (error) {
        const errorMsg = handleError(error)
        showShortToast(errorMsg);
    }
}

