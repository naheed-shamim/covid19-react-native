import axios, { AxiosResponse } from 'axios';
import { HttpMethods } from './ApiConstants';

export function makeRequest(methodType: HttpMethods, url: string, requestBody: any = null) {
    const config = {
        timeout: 10 * 1000, // Let's say you want to wait at least 10 sec
    };
    let axiosRequest;
    switch (methodType) {
        case HttpMethods.GET:
            axiosRequest = axios.get(url, config);
            break;
        case HttpMethods.POST:
            axiosRequest = axios.post(url, requestBody, config);
            break;
        default: axiosRequest = axios.get(url, config);
    }
    return axiosRequest;
}

export const handleResponse = (response: any) => {
    const statusCode = response.status
    switch (statusCode) {
        case 200: return response.data

    }

}
