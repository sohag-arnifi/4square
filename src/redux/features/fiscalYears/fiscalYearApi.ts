import { baseApiSlice } from "../baseApi/baseApiSlice";

const fiscalYearApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewFiscalYear: builder.mutation({
      query: (data) => ({
        url: "/fiscal-years",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["fiscalYear"],
    }),

    getAllFiscalYears: builder.query({
      query: () => ({
        url: "/fiscal-years",
        method: "GET",
      }),
      providesTags: ["fiscalYear"],
    }),

    updateFiscalYear: builder.mutation({
      query: (data) => ({
        url: "/fiscal-years",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["fiscalYear"],
    }),

    deleteFiscalYear: builder.mutation({
      query: (data) => ({
        url: "/fiscal-years",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["fiscalYear"],
    }),
  }),
});

export const {
  useCreateNewFiscalYearMutation,
  useGetAllFiscalYearsQuery,
  useUpdateFiscalYearMutation,
  useDeleteFiscalYearMutation,
} = fiscalYearApi;
