import { put } from 'redux-saga/effects';
import { actionTypes } from '../Constants';
import { CovidWorldService } from '../../service/CovidWorldService';


export function* fetchWorldSummary() {
    try {
        yield put({ type: actionTypes.DATA_LOADING })
        const response = yield CovidWorldService.fetchSummary();
        yield put({ type: actionTypes.WORLD_SUMMARY_LOADED, payload: response.data })
        //TODO: handle success codes
    }
    catch (error) {
        //TODO: handle error, show message
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

