import { baseApiSlice } from "../baseApi/baseApiSlice";

const investorApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvestor: builder.mutation({
      query: (data) => ({
        url: "/investor",
        method: "POST",
        body: data,
      }),
    }),

    updateInvestor: builder.mutation({
      query: (data) => ({
        url: "/investor",
        method: "PATCH",
        body: data,
      }),
    }),

    getAllInvestor: builder.query({
      query: () => ({
        url: "/investor",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateInvestorMutation,
  useUpdateInvestorMutation,
  useGetAllInvestorQuery,
} = investorApi;
