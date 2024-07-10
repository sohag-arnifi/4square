import { baseApiSlice } from "../baseApi/baseApiSlice";

const userApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (data) => ({
        url: "/auth/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
