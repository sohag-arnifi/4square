import { baseApiSlice } from "../baseApi/baseApiSlice";

const clientTransactionApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClientTrans: builder.mutation({
      query: (data) => ({
        url: "/clientTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["clients"],
    }),

    getAllClientTransaction: builder.query({
      query: () => ({
        url: "/clientTransaction",
        method: "GET",
      }),
      providesTags: ["clients"],
    }),
  }),
});

export const { useCreateClientTransMutation, useGetAllClientTransactionQuery } =
  clientTransactionApi;
