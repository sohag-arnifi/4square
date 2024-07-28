"use client";

import GlobalLoader from "@/components/GlobalLoader";
import PageHeader from "@/components/PageHeader";
import FormProvaider from "@/components/forms";
import FormRadioField from "@/components/forms/FormRadioField";
import { IClient } from "@/models/client";
import { useGetAllClientsQuery } from "@/redux/features/clients/clientApi";
import theme from "@/theme";
import { Person2, Router } from "@mui/icons-material";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { FormikValues } from "formik";
import React from "react";
import PaymentCard from "./_components/PaymentCard";
import { useCreateClientTransMutation } from "@/redux/features/clientTransaction/clientTransactionApi";
import { useAppDispatch } from "@/redux/hooks";
import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";

export interface IPayment {
  isActivedNeeded: string;
  paymentMethod: string;
}

const ClientDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { data, isLoading } = useGetAllClientsQuery({});

  const dispatch = useAppDispatch();

  const [createClientTrans, { isLoading: createLoading }] =
    useCreateClientTransMutation();

  if (isLoading) {
    return <GlobalLoader height="40vh" />;
  }

  const selectedClient: IClient = data?.data?.find(
    (item: IClient) => item?._id === params?.id
  );

  const clientDetailsInfo = {
    "Active Packege": selectedClient?.servicePackege,
    "Packege Charge ": selectedClient?.serviceCharge
      ? `${selectedClient?.serviceCharge}Tk`
      : "",
    "Client ID": selectedClient?.customerId,
    "Login ID": selectedClient?.loginId,
    "Login Password": selectedClient?.loginPassword,
    "Phone Number": selectedClient?.phone,
    Address: selectedClient?.address,
  };

  const expiryInDays = selectedClient?.expiryDate
    ? Math.ceil(
        (new Date(selectedClient.expiryDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const initialValues = {
    isActivedNeeded: "No",
    paymentMethod: "",
  };

  const paymentHandlar = async (values: FormikValues) => {
    try {
      const response = await createClientTrans({
        paymentClient: selectedClient?._id,
        paymentMethod: values.paymentMethod,
        paymentPackage: selectedClient.servicePackege,
        paymentAmount: selectedClient?.serviceCharge,
      }).unwrap();

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
            message: response?.message || "Something went wrong",
            type: "error",
          })
        );
      }
    } catch (error) {
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
      <PageHeader title="Client Details" />
      <Box sx={{ paddingX: "5%", mx: "auto", my: "20px", minHeight: "40vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper
              variant="outlined"
              sx={{
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                  paddingBottom: "10px",
                }}
              >
                <Person2
                  sx={{
                    fontSize: "30px",
                    color: theme?.colorConstants?.primaryBlue,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    paddingLeft: "10px",
                    marginTop: "5px",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: theme?.colorConstants?.primaryBlue,
                  }}
                >
                  {selectedClient?.name}
                </Typography>
              </Box>

              {Object.keys(clientDetailsInfo)?.map((key, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      marginTop: "5px",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      bgcolor: theme?.colorConstants?.whitishGray,
                      "&:hover": {
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "16px",
                        width: "130px",
                      }}
                    >
                      {key}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      :{" "}
                      {clientDetailsInfo[key as keyof typeof clientDetailsInfo]}
                    </Typography>
                  </Box>
                );
              })}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              sx={{
                padding: "20px",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                  paddingBottom: "10px",
                }}
              >
                <Router
                  sx={{
                    fontSize: "30px",
                    // color: theme?.colorConstants?.primaryBlue,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    paddingLeft: "10px",
                    marginTop: "5px",
                    fontSize: "18px",
                    fontWeight: 600,
                    // color: theme?.colorConstants?.,
                  }}
                >
                  Connection Status
                </Typography>
              </Box>

              <Box
                paddingTop="16px"
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    width: "130px",
                  }}
                >
                  Status
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: selectedClient?.isActive
                      ? theme.colorConstants?.primaryBlue
                      : theme.colorConstants?.crossRed,
                  }}
                >
                  : {selectedClient?.isActive ? "Active" : "Disabled"}
                </Typography>
              </Box>

              <Box
                paddingTop="5px"
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    width: "130px",
                  }}
                >
                  Expiry Date:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  :{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(selectedClient?.expiryDate))}
                </Typography>
              </Box>

              {expiryInDays > 0 && (
                <Box
                  paddingTop="5px"
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      width: "130px",
                    }}
                  >
                    Expires in days:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    : {expiryInDays}{" "}
                    {expiryInDays > 1 ? "days left." : "day left."}
                  </Typography>
                </Box>
              )}

              <Box marginTop="16px">
                <FormProvaider
                  submitHandlar={paymentHandlar}
                  initialValues={initialValues}
                >
                  <Box>
                    <FormRadioField
                      name={"isActivedNeeded"}
                      label={"Do you want to activate this account?"}
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </Box>

                  <PaymentCard loading={createLoading} />
                </FormProvaider>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ClientDetails;
