import { takeLatest, all } from 'redux-saga/effects';
import { actionTypes } from '../Constants';
import { getStateDistrictData } from './CovidIndiaSaga';
import { getOverallStatsAndTimeline } from './CovidIndiaSaga';
import { fetchWorldSummary } from './CovidWorldSaga';


function* covidIndiaActionWatcher() {
    yield takeLatest(actionTypes.GET_OVERALL_STATS_AND_TIMELINE, getOverallStatsAndTimeline)
    yield takeLatest(actionTypes.GET_STATE_DISTRICT_STATS, getStateDistrictData)
}

function* covidWorldActionWatcher() {
    yield takeLatest(actionTypes.FETCH_WORLD_SUMMARY, fetchWorldSummary)

}
export default function* rootSaga() {
    yield all([
        covidIndiaActionWatcher(),
        covidWorldActionWatcher()
    ]);
}