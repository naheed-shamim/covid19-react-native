import Requests from './Requests';
import { CovidApi } from './Config';
import { COVID_API_BASE_URL } from './ApiConstants';

const BASE_URL = COVID_API_BASE_URL;
export const CovidService = {
    getGenericStats: async () => {
        const { path, methodType } = CovidApi.All_DATA();
        return await Requests.requestBuilder(methodType, BASE_URL, path);
        // loader && loader(true);
        try {
            const response = request;
            // loader && loader(false);

        } catch (error) {
            // loader && loader(false);
            throw error;
        }
    },
    getStateDistrictStats: async (loader: Function) => {
        const { path, methodType } = CovidApi.STATE_WISE();
        const request = Requests.requestBuilder(methodType, BASE_URL, path);
        loader && loader(true);
        try {
            const response = await request;
            loader && loader(false);
            return response.data;
        } catch (error) {
            loader && loader(false);
            throw error;
        }
    },

};


const executeRequest = async (request) => {
    try {
        const response = await request;
        return response.data;
    } catch (error) {

    }
}; 