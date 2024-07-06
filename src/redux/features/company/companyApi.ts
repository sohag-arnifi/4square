import { baseApiSlice } from "../baseApi/baseApiSlice";

const companyApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: "/company",
        method: "POST",
        body: data,
      }),
    }),

    updateCompany: builder.mutation({
      query: (data) => ({
        url: "/company",
        method: "PATCH",
        body: data,
      }),
    }),

    getCompanyInfo: builder.query({
      query: () => ({
        url: "/company",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompanyInfoQuery,
  useUpdateCompanyMutation,
} = companyApi;
