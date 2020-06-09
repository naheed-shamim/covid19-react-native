export const COVID_INDIA_BASE_URL = 'https://api.covid19india.org';
export const COVID_WORLD_BASE_URL = 'https://api.covid19api.com'

export const FLAG_URL = (countryCode: string, size = 16) => `https://www.countryflags.io/${countryCode}/flat/${size}.png`


export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface HttpRequest {
    type: string,
    url: string
}