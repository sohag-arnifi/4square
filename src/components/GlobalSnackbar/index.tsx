"use client";

import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

// interface IProps {}
const GlobalSnackbar: React.FC = () => {
  const { isOpen, type, message } = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => dispatch(snackbarSliceActions.close(""))}
    >
      <Alert
        onClose={() => dispatch(snackbarSliceActions.close(""))}
        severity={type as AlertColor}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
