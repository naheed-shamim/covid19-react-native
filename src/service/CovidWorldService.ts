import Requests from './Requests';
import { CovidWorldApi } from './Config';
import { COVID_WORLD_BASE_URL } from './ApiConstants';

const BASE_URL = COVID_WORLD_BASE_URL;
export const CovidWorldService = {
    fetchSummary: async () => {
        const { path, methodType } = CovidWorldApi.SUMMARY();
        return await Requests.requestBuilder(methodType, BASE_URL, path);
    },
    fetchCountriesData: async () => {
        const { path, methodType } = CovidWorldApi.COUNTRIES();
        return Requests.requestBuilder(methodType, BASE_URL, path);
    },
};

