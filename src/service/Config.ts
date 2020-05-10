import { HttpMethods } from "./ApiConstants";

export const CovidIndiaApi = {
    All_DATA: () => {
        return {
            path: `/data.json`,
            methodType: HttpMethods.GET,
        };
    },
    STATE_WISE: () => {
        return {
            path: `/state_district_wise.json`,
            methodType: HttpMethods.GET,
        };
    },
};

export const CovidWorldApi = {
    SUMMARY: () => {
        return {
            path: `/summary`,
            methodType: HttpMethods.GET,
        };
    },
    COUNTRIES: () => {
        return {
            path: `/countries`,
            methodType: HttpMethods.GET,
        };
    }
}