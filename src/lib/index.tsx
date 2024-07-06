"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
