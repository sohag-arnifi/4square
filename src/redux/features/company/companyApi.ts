import { baseApiSlice } from "../baseApi/baseApiSlice";

const companyApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: "/company/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateCompanyMutation } = companyApi;
