import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["user", "fiscalYear", "clients", "bulksms"],
  endpoints: () => ({}),
});
