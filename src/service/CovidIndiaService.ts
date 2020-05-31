import Requests from './Requests';
import { CovidIndiaApi } from './Config';
import { COVID_INDIA_BASE_URL } from './ApiConstants';

const BASE_URL = COVID_INDIA_BASE_URL;
export const CovidIndiaService = {
    getGenericStats: () => {
        const { path, methodType } = CovidIndiaApi.All_DATA();
        return Requests.requestBuilder(methodType, BASE_URL, path);
    },
    getStateDistrictStats: async () => {
        const { path, methodType } = CovidIndiaApi.STATE_WISE();
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