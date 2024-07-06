import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as User,
};

const authSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
