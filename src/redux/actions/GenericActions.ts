import { actionTypes } from "../Constants"

export const startLoading = () => {
    return ({ type: actionTypes.LOADING_BEGIN })
}

export const endLoading = () => {
    return ({ type: actionTypes.LOADING_OVER })
}
