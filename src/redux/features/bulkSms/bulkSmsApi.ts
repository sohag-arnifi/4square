import { baseApiSlice } from "../baseApi/baseApiSlice";

const bulkSmsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: (params) => ({
        url: "/bulksms",
        method: "GET",
        params,
      }),
      providesTags: ["bulksms"],
    }),

    sendSingleSms: builder.mutation({
      query: (data) => ({
        url: "/bulksms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bulksms"],
    }),
  }),
});

export const { useSendSingleSmsMutation, useGetAllMessagesQuery } = bulkSmsApi;
