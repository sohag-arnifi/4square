"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import FormProvaider from "@/components/forms";
import { FormikValues } from "formik";
import FormInputField, { IInputType } from "@/components/forms/FormInputField";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/hooks";
import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";
import { useRouter } from "next/navigation";
import theme from "@/theme";

const validateSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (values: FormikValues): Promise<void> => {
    try {
      const response = await login(values).unwrap();

      if (!response.success) {
        dispatch(
          snackbarSliceActions.open({
            type: "error",
            message: response.message,
          })
        );
      } else {
        router.replace("/");
        dispatch(
          snackbarSliceActions.open({
            type: "success",
            message: response.message,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          border: { xs: "none", md: "1px solid rgba(0, 0, 0, 0.12)" },
          borderRadius: "10px",
          height: { xs: "100%", md: "500px" },
          width: { xs: "100%", md: "400px" },
          padding: "30px",
          boxShadow: { xs: "none", md: "0 0 10px 0 rgba(0, 0, 0, 0.2)" },
        }}
      >
        <Box
          sx={{
            paddingTop: { xs: "50px", md: "0px" },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: "28px",
              color: theme.colorConstants.darkBlue,
            }}
          >
            ClearLeder
          </Typography>

          <Typography
            variant="body1"
            sx={{
              paddingY: "20px",
              fontWeight: 500,
            }}
          >
            Login to your account
          </Typography>
        </Box>

        <Box marginTop="20px">
          <FormProvaider
            submitHandlar={onSubmit}
            initialValues={{ username: "", password: "" }}
            validationSchema={validateSchema}
          >
            <Box marginTop={"20px"}>
              <FormInputField
                name="username"
                label="Username"
                required
                placeholder="Username"
              />
            </Box>

            <Box marginTop={"20px"}>
              <FormInputField
                type={IInputType.PASSWORD}
                name="password"
                label="Password"
                required
                placeholder="********"
              />
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "right",
                    fontSize: "14px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                >
                  Forgot password ?
                </Typography>
              </Box>

              <Box sx={{ marginY: "50px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    width: "150px",
                    height: "40px",
                  }}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </Box>
            </Box>
          </FormProvaider>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
