import { baseApiSlice } from "../baseApi/baseApiSlice";

const userApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user",
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
