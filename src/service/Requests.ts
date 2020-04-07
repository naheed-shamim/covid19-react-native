
import { makeRequest } from './AxiosService';

export default class Requests {
    static requestBuilder(methodType: String, baseURL: String, urlPath: String) {
        const targetURL = Requests.generateURL(baseURL, urlPath);
        const request = makeRequest(methodType, targetURL);
        return request;
    }

    static generateURL(baseURL: String, endpoint: String): String {
        return '' + baseURL + endpoint;
    }
}
