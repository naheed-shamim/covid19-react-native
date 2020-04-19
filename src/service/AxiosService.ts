import axios from 'axios';
import { HttpMethods } from './ApiConstants';

export function makeRequest(methodType: HttpMethods, url: string, requestBody: any = null) {
    const config = {
        timeout: 30 * 1000, // Let's say you want to wait at least 30 sec
    };
    let axiosRequest;
    switch (methodType) {
        case HttpMethods.GET:
            axiosRequest = axios.get(url, config);
            break;
        case HttpMethods.POST:
            axiosRequest = axios.post(url, requestBody, config);
            break;
    }
    return axiosRequest;
}
