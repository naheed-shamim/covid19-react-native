import { put, takeLatest, all } from 'redux-saga/effects';
import { Action } from 'redux';
import { actionTypes } from '../Constants';
import { CovidService } from '../../service/CovidService';
// function* fetchNews() {
//     const json = yield fetch('https://newsapi.org/v1/articles? 
//         source = cnn & apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
//         .then(response => response.json());
//     yield put({ type: "NEWS_RECEIVED", json: json.articles, });
// }

// interface TaskAction extends Action { type: "TASK_ADD", payload: any }

// interface ITask {
//     id: number
//     task: string,
//     //other things here
// }

export function* getOverallStatsAndTimeline() {
    try {
        yield put({ type: actionTypes.DATA_LOADING })
        const response = yield CovidService.getGenericStats();
        yield put({ type: actionTypes.OVERALL_DATA_LOADED, payload: response.data })
        //TODO: handle success codes
    }
    catch (error) {
        //TODO: handle error, show message
    }
}

export function* getStateDistrictData() {

    try {
        const response = yield CovidService.getGenericStats_v2();
        yield put({ type: actionTypes.STATE_DISTRICT_DATA, payload: response })
    }
    catch (error) {
        //TODO: handle error
    }
}

