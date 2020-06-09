import Requests from "./Requests";
import { COVID_INDIA_BASE_URL, COVID_WORLD_BASE_URL } from "./ApiConstants";

export const callCovidIndiaAPI = (apiConfig: any, queryString = null, bodyParams = null, header = null) => {
    return callAPI(COVID_INDIA_BASE_URL, apiConfig, queryString, bodyParams, header);
}
export const callCovidWorldAPI = (apiConfig: any, queryString = null, bodyParams = null, header = null) => {
    return callAPI(COVID_WORLD_BASE_URL, apiConfig, queryString, bodyParams, header);
}


/**
 * AXIOS Web Service Implementation
 * @param baseURL 
 * @param apiConfig 
 * @param queryString 
 * @param bodyParams 
 * @param header 
 */
const callAPI = async (baseURL: string, apiConfig, queryString, bodyParams, header) => {

    const { path, methodType } = apiConfig;
    const targetURL = Requests.generateURL(baseURL, path)
    const apiRequest = Requests.requestBuilder1(methodType, targetURL);

    try {
        const response = await apiRequest;
        //TODO:return as per status Code
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const handleError = error => {
    // let err = error.response;
    let errorMsg = 'Oops! Something Went Wrong';
    if (!!error.code) {
        switch (error.code) {
            case 'ECONNABORTED':
                errorMsg = 'Connection Timed Out';
        }
    }
    else if (!!error.response) {
        switch (error.response.status) {
            case 404:
                errorMsg = 'Resource Not Found';
        }
    }
    return errorMsg
}