
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


    WORLD_SUMMARY_LOADING: 'worldSummaryLoading',
    WORLD_SUMMARY_LOADED: 'worldSummaryLoaded',
    // COUNTRY_DATA_LOADED: 'countryDataLoaded',

    TIME_LINE_SERIES: 'timeLineSeries',

}