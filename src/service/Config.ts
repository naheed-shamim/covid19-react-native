import { HttpMethods } from "./ApiConstants";

export const CovidIndiaApi = {
  All_DATA: {
    path: `/data.json`,
    methodType: HttpMethods.GET,
  },
  STATE_WISE: {
    path: `/state_district_wise.json`,
    methodType: HttpMethods.GET,
  },
};

export const CovidWorldApi = {
  SUMMARY: {
    path: `/summary`,
    methodType: HttpMethods.GET,
  },
  COUNTRIES: {
    path: `/countries`,
    methodType: HttpMethods.GET,
  },
};
