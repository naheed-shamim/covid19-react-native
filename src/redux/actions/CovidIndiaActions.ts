import { actionTypes } from "../Constants"

export const getOverallStatsAndTimeline = () => {
    return ({ type: actionTypes.GET_OVERALL_STATS_AND_TIMELINE })
}

export const getStateDistrictStats = () => {
    return ({ type: actionTypes.GET_STATE_DISTRICT_STATS })
}
