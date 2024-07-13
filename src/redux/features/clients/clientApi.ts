import { baseApiSlice } from "../baseApi/baseApiSlice";

const clientApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (data) => ({
        url: "/clients",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["clients"],
    }),

    updateClient: builder.mutation({
      query: (data) => ({
        url: "/clients",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["clients"],
    }),

    deleteClient: builder.mutation({
      query: (data) => ({
        url: "/clients",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["clients"],
    }),

    getAllClients: builder.query({
      query: () => ({
        url: "/clients",
        method: "GET",
      }),
      providesTags: ["clients"],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useUpdateClientMutation,
  useGetAllClientsQuery,
  useDeleteClientMutation,
} = clientApi;
