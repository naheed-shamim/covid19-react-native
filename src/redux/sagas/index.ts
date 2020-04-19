import { put, takeLatest, all } from 'redux-saga/effects';
import { Action } from 'redux';
import { actionTypes } from '../Constants';
import { CovidService } from '../../service/CovidService';
import { getStateDistrictData } from './CovidIndiaSaga';
import { getOverallStatsAndTimeline } from '../sagas/CovidIndiaSaga';

function* actionWatcher() {
    yield takeLatest(actionTypes.GET_OVERALL_STATS_AND_TIMELINE, getOverallStatsAndTimeline)
    yield takeLatest(actionTypes.GET_STATE_DISTRICT_STATS, getStateDistrictData)
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}