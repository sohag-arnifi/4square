import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "../features/baseApi/baseApiSlice";
import snackbarReducer from "../features/snackBar/snackBarSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    snackbar: snackbarReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApiSlice.middleware),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
