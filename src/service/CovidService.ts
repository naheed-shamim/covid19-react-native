import Requests from './Requests';
import { CovidApi } from './Config';
import { COVID_API_BASE_URL } from './ApiConstants';

const BASE_URL = COVID_API_BASE_URL;
export const CovidService = {
    getGenericStats: async () => {
        const { path, methodType } = CovidApi.All_DATA();
        return await Requests.requestBuilder(methodType, BASE_URL, path);
    },
    getStateDistrictStats: async () => {
        const { path, methodType } = CovidApi.STATE_WISE();
        return Requests.requestBuilder(methodType, BASE_URL, path);
    },
};


const executeRequest = async (request) => {
    try {
        const response = await request;
        return response.data;
    } catch (error) {

    }
}; 