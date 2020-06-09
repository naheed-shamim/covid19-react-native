import { put, call } from 'redux-saga/effects';
import { actionTypes } from '../Constants';
import { CovidWorldService } from '../../service/CovidWorldService';
import { startLoading, endLoading } from '../actions/GenericActions';
import { callCovidWorldAPI, handleError } from '../../service/WebService';
import { CovidWorldApi } from '../../service/Config';
import { showShortToast } from '../../utils/Toast';

export function* fetchWorldSummary() {
    try {
        yield put(startLoading())
        yield put({ type: actionTypes.DATA_LOADING })

        const worldSummary = yield callCovidWorldAPI(CovidWorldApi.SUMMARY);

        yield put({ type: actionTypes.WORLD_SUMMARY_LOADED, payload: worldSummary })
        yield put(endLoading())
        //TODO: handle success codes
    }
    catch (error) {
        const errorMsg = handleError(error)
        console.log(errorMsg)
        showShortToast(errorMsg)
        yield put({ type: actionTypes.WORLD_SUMMARY_FAILED, payload: errorMsg })
        yield put(endLoading())

    }
}

// export function* getStateDistrictData() {

//     try {
//         yield put({ type: actionTypes.DATA_LOADING })
//         const response = yield CovidWorldService.fetchCountriesData();
//         yield put({ type: actionTypes.STATE_DISTRICT_DATA_LOADED, payload: response.data })
//     }
//     catch (error) {
//         //TODO: handle error
//     }
// }

