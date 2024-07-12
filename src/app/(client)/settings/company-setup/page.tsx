"use client";

import GlobalButton from "@/components/Buttons/GlobalButton";
import GlobalLoader from "@/components/GlobalLoader";
import PageHeader from "@/components/PageHeader";
import FormProvaider from "@/components/forms";
import FormDateField from "@/components/forms/FormDateField";
import FormInputField, { IInputType } from "@/components/forms/FormInputField";
import {
  useCreateCompanyMutation,
  useGetCompanyInfoQuery,
  useUpdateCompanyMutation,
} from "@/redux/features/company/companyApi";
import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  companyName: Yup.string().required("Company is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  startDate: Yup.string().required("Start Date is required"),
  emergencyContact: Yup.string().required("Emergency Contact is required"),
  license: Yup.string().optional(),
  binNumber: Yup.string().optional(),
});

const CompanySetup = () => {
  const [createCompany, { isLoading: createLoading }] =
    useCreateCompanyMutation();
  const [updateCompany, { isLoading: updateLoading }] =
    useUpdateCompanyMutation();

  const { data, isLoading: initialLoading } = useGetCompanyInfoQuery({});
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (initialLoading) {
    return <GlobalLoader height="70vh" />;
  }

  const initialValues = {
    _id: data?.data?._id || null,
    companyName: data?.data?.companyName || "",
    address: data?.data?.address || "",
    email: data?.data?.email || "",
    phone: data?.data?.phone || "",
    startDate: data?.data?.startDate || "",
    emergencyContact: data?.data?.emergencyContact || "",
    license: data?.data?.license || "",
    binNumber: data?.data?.binNumber || "",
  };

  const onSubmit = async (values: FormikValues) => {
    let response;
    try {
      if (!values?._id) {
        response = await createCompany(values).unwrap();
      } else {
        response = await updateCompany(values).unwrap();
      }

      if (response?.success) {
        dispatch(
          snackbarSliceActions.open({
            message: response?.message,
            type: "success",
          })
        );
      } else {
        dispatch(
          snackbarSliceActions.open({
            message: response?.message,
            type: "error",
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        snackbarSliceActions.open({
          message: "Something went wrong",
          type: "error",
        })
      );
    }
  };

  return (
    <Box>
      <PageHeader title={"Company Setup"} />
      <Box paddingY={{ xs: "10px", md: "20px" }} paddingX="5%">
        <Paper
          variant="outlined"
          sx={{
            borderRadius: { xs: "6px", md: "10px" },
            padding: { xs: "20px", md: "50px" },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            bgcolor: "#f9f9f9",
          }}
        >
          <FormProvaider
            initialValues={initialValues}
            submitHandlar={onSubmit}
            validationSchema={validateSchema}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <FormInputField
                    name="companyName"
                    label="Company Full Name"
                    placeholder="Enter Company Full Name"
                  />
                </Box>

                <Box marginTop="20px">
                  <FormInputField
                    name="address"
                    label="Address"
                    placeholder="Enter Address"
                  />
                </Box>

                <Box marginTop="20px">
                  <FormInputField
                    name="email"
                    type={IInputType.EMAIL}
                    label="Email"
                    placeholder="Enter email address"
                  />
                </Box>

                <Box marginTop="20px">
                  <FormInputField
                    name="phone"
                    label="Contact Number"
                    placeholder="Enter Contact number"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <FormDateField name="startDate" label="Company Start Date" />
                </Box>

                <Box marginTop="20px">
                  <FormInputField
                    name="emergencyContact"
                    label="Emergency Contact"
                    placeholder="Enter Emergency Contact"
                  />
                </Box>

                <Box marginTop="20px">
                  <FormInputField
                    name="license"
                    label="License Number (optional)"
                    placeholder="Enter License Number"
                  />
                </Box>

                <Box marginTop="20px">
                  <FormInputField
                    name="binNumber"
                    label="BIN Number (optional)"
                    placeholder="Enter BIN Number"
                  />
                </Box>
              </Grid>
            </Grid>

            <Box marginTop="30px">
              <Stack direction="row" spacing={2} justifyContent={"center"}>
                <GlobalButton
                  onClick={() => router.back()}
                  color="error"
                  title="Back"
                />

                {data?.data?._id ? (
                  <GlobalButton
                    type="submit"
                    isLoading={createLoading || updateLoading}
                    title="Update"
                  />
                ) : (
                  <GlobalButton
                    type="submit"
                    isLoading={createLoading || updateLoading}
                    title="Create"
                  />
                )}
              </Stack>
            </Box>
          </FormProvaider>
        </Paper>
      </Box>
    </Box>
  );
};

export default CompanySetup;
