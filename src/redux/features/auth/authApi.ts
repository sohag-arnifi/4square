import { baseApiSlice } from "../baseApi/baseApiSlice";
import { setLoggedInUser } from "./authSlice";

const authApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getLoginUser: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.success) {
            dispatch(setLoggedInUser(data?.data));
          }
        } catch (err) {
          console.error(err);
        }
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useLoginMutation, useGetLoginUserQuery } = authApi;
