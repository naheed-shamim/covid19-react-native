import { HttpMethods } from "./ApiConstants";

export const CovidApi = {
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