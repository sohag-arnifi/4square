import { IUser } from "@/models/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as IUser,
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
