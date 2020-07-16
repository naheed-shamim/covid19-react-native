
export const actionTypes = {
    //Calling Actions
    GET_OVERALL_STATS_AND_TIMELINE: 'getOverallStatsAndTimeline',
    GET_STATE_DISTRICT_STATS: 'getStateDistrictStats',
    GET_STATE_DISTRICT_STATS_V2: 'getStateDistrictStats_v2',

    FETCH_WORLD_SUMMARY: 'fetchWorldSummary',
    FETCH_COUNTRY_DATA: 'fetchCountryData',

    //Within Saga and Reducers
    OVERALL_DATA_LOADED: 'overallDataLoaded',
    DATA_LOADING: 'dataLoading',
    STATE_DISTRICT_DATA_LOADED: 'stateDistrictDataLoaded',

    OVERALL_DATA_LOAD_FAILED: 'overallDataLoadFailed',


    WORLD_SUMMARY_LOADING: 'worldSummaryLoading',
    WORLD_SUMMARY_LOADED: 'worldSummaryLoaded',
    WORLD_SUMMARY_FAILED: 'worldSummaryFailed',


    TIME_LINE_SERIES: 'timeLineSeries',

    LOADING_BEGIN: 'loadingBegin',
    LOADING_OVER: 'loadingOver',

}