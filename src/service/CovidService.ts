import Requests from './Requests';
import { CovidApi } from './Config';
import { COVID_API_BASE_URL } from './ApiConstants';

const BASE_URL = COVID_API_BASE_URL;
export const CovidService = {
    // Fetch by data
    getGenericStats: async (loader: Function) => {
        const { path, methodType } = CovidApi.All_DATA();
        const request = Requests.requestBuilder(methodType, BASE_URL, path);
        loader && loader(true);
        try {
            const response = await request;
            // console.log('====================================');
            // console.log(response);
            // console.log('====================================');
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