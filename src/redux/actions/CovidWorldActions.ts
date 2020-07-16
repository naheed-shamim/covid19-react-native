import { actionTypes } from "../Constants"

export const getWorldSummary = () => {
    return ({ type: actionTypes.FETCH_WORLD_SUMMARY })
}

// export const getStateDistrictStats = () => {
//     return ({ type: actionTypes.GET_STATE_DISTRICT_STATS })
// }
