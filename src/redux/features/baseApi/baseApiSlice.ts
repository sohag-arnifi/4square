import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    // prepareHeaders: (headers) => {
    //   headers.set("Content-Type", "application/json");
    //   return headers;
    // },
  }),
  tagTypes: ["user", "fiscalYear", "clients"],
  endpoints: () => ({}),
});
