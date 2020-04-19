
import { makeRequest } from './AxiosService';
import { HttpMethods } from './ApiConstants';

export default class Requests {
    static requestBuilder(methodType: HttpMethods, baseURL: string, urlPath: string) {
        const targetURL = Requests.generateURL(baseURL, urlPath);
        const request = makeRequest(methodType, targetURL);
        return request;
    }

    static generateURL(baseURL: string, endpoint: string): string {
        return '' + baseURL + endpoint;
    }
}
