"use client";

import GlobalButton from "@/components/Buttons/GlobalButton";
import GlobalDrawer from "@/components/Drawers/GlobalDrawer";
import GlobalLoader from "@/components/GlobalLoader";
import PageHeader from "@/components/PageHeader";
import GlobalTable from "@/components/Tables/GlobalTable";
import FormProvaider from "@/components/forms";
import FormInputField, { IInputType } from "@/components/forms/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField";
import { IClient } from "@/models/client";
import {
  useCreateClientMutation,
  useGetAllClientsQuery,
  useUpdateClientMutation,
} from "@/redux/features/clients/clientApi";
import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import theme from "@/theme";
import { Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const ClientsListing = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [clientInfo, setClientInfo] = useState<Partial<IClient>>({});

  const [renderClientsStatus, setRenderClientsStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const loginUser = useAppSelector((state) => state?.auth?.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [createClient, { isLoading: createLoading }] =
    useCreateClientMutation();
  const [updateClient, { isLoading: updateLoading }] =
    useUpdateClientMutation();

  const { data, isLoading: initialLoading } = useGetAllClientsQuery({});

  const updateHandler = (id: string) => {
    const selected = data?.data?.find((item: IClient) => item?._id === id);
    setClientInfo(selected);
    setIsOpenDrawer(true);
  };

  const submitHandler = async (values: FormikValues) => {
    let response;
    try {
      if (!values?._id) {
        response = await createClient(values).unwrap();
      } else {
        response = await updateClient(values).unwrap();
      }

      if (response?.success) {
        dispatch(
          snackbarSliceActions.open({
            message: response?.message,
            type: "success",
          })
        );
        setIsOpenDrawer(false);
        setClientInfo({});
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
          message: response?.message || "Something went wrong",
          type: "error",
        })
      );
    }
  };

  const deleteUserHandler = async () => {
    // try {
    //   const res = await deleteUser({
    //     id: clientInfo?.id,
    //     role: clientInfo?.role,
    //   }).unwrap();
    //   if (res.success) {
    //     dispatch(
    //       snackbarSliceActions.open({
    //         type: "success",
    //         message: res?.message,
    //       })
    //     );
    //     setIsOpenModal(false);
    //     setClientInfo({});
    //   } else {
    //     dispatch(
    //       snackbarSliceActions.open({
    //         type: "error",
    //         message: res.message || "Something went wrong",
    //       })
    //     );
    //   }
    // } catch (error) {
    //   console.error(error);
    //   dispatch(
    //     snackbarSliceActions.open({
    //       type: "error",
    //       message: "Something went wrong",
    //     })
    //   );
    // }
  };

  if (initialLoading) {
    return <GlobalLoader height="40vh" />;
  }

  const filterOptions = [
    { label: "Active", value: "active" },
    { label: "Deactive", value: "deactive" },
  ];

  const filteredData = data?.data?.filter((item: IClient) => {
    if (renderClientsStatus === "all") {
      return true;
    } else if (renderClientsStatus === "active") {
      return item?.isActive;
    } else if (renderClientsStatus === "deactive") {
      return !item?.isActive;
    } else {
      return false;
    }
  });

  const searchAbleData: IClient[] = filteredData?.filter((item: IClient) => {
    const searchInLowerCase = search.toLocaleLowerCase();

    const { name, address, phone, customerId, loginId, servicePackege } = item;

    return (
      name?.toLocaleLowerCase().includes(searchInLowerCase) ||
      address?.toLocaleLowerCase().includes(searchInLowerCase) ||
      phone?.toLocaleLowerCase().includes(searchInLowerCase) ||
      customerId?.toLocaleLowerCase().includes(searchInLowerCase) ||
      loginId?.toLocaleLowerCase().includes(searchInLowerCase) ||
      servicePackege?.toLocaleLowerCase().includes(searchInLowerCase)
    );
  });

  const tableHeaders = [
    {
      label: "Client Name",
      align: "left",
      width: "150px",
    },
    {
      label: "Phone Number",
      align: "left",
      width: "150px",
    },
    {
      label: "Address",
      align: "left",
      width: "150px",
    },
    {
      label: "ID Number",
      align: "left",
      width: "100px",
    },
    {
      label: "Package",
      align: "left",
      width: "100px",
    },
    {
      label: "Expiry Date",
      align: "left",
      width: "180px",
    },
    {
      label: "Status",
      align: "left",
      width: "100px",
    },
    {
      label: "Actions",
      align: "center",
      width: "100px",
    },
  ];

  const tableItems = searchAbleData?.map((item: IClient) => {
    return {
      _id: item._id?.toString(),
      name: item.name,
      phone: item.phone,
      address: item.address,
      idNumber: item.customerId,
      servicePackege: item.servicePackege,
      expiryDate: formatDate(item?.expiryDate),
      status: item.isActive ? "Active" : "Deactive",
    };
  });

  return (
    <Box>
      <PageHeader title="Company Clients" />

      <Box sx={{ paddingX: "5%", mx: "auto", my: "20px", minHeight: "40vh" }}>
        <Box
          sx={{
            paddingY: "10px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "start", md: "center" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              xs: "18px",
              md: "24px",
              pb: { xs: "16px", md: "0px" },
            }}
          >
            Total Result -{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {searchAbleData?.length ?? 0}
            </span>
          </Typography>

          <Stack direction="row" gap="10px">
            <Select
              defaultValue="all"
              size="small"
              sx={{
                width: "150px",
                height: "40px",
                color: theme?.colorConstants.darkGray,
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                bgcolor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  boxShadow:
                    "0px 2px 4px 0px #60617029, 0px 0px 1px 0px #28293D0A",
                },
              }}
              renderValue={(e: unknown) => {
                if (e === "all" || e === null || e === undefined) {
                  return `All Status`;
                } else if (e === "active") {
                  return "Active";
                } else {
                  return "Deactive";
                }
              }}
              inputProps={{ "aria-label": "Without label" }}
              MenuProps={{ disableScrollLock: true }}
              onChange={(e) => {
                setRenderClientsStatus(e.target.value);
              }}
              onBlur={(e) => {
                setRenderClientsStatus(e.target.value);
              }}
            >
              <MenuItem
                sx={{
                  color: theme?.colorConstants.darkGray,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                value={"all"}
              >
                All Status
              </MenuItem>

              {filterOptions?.map((item, i) => {
                return (
                  <MenuItem
                    key={i}
                    sx={{
                      color: theme?.colorConstants.darkGray,
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: 500,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    value={item?.value}
                  >
                    {item?.label}
                  </MenuItem>
                );
              })}
            </Select>

            <TextField
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type={"text"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{<Search />}</InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", md: "350px" },
                bgcolor: "white",
                fontSize: "14px",
                fontWeight: 500,
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
              variant="outlined"
              placeholder={"Search..."}
            />
          </Stack>
        </Box>

        <GlobalTable
          tableHeaders={tableHeaders}
          tableItems={tableItems}
          deleteHandler={() => {}}
          updateHandler={updateHandler}
          loginUser={loginUser}
        />
      </Box>

      <Box paddingX="5%">
        <Box marginY="50px">
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <GlobalButton
              onClick={() => router.back()}
              color="error"
              title="Back"
            />
            <GlobalButton
              onClick={() => {
                setClientInfo({});
                setIsOpenDrawer(true);
              }}
              title="Add New"
            />
          </Stack>
        </Box>
      </Box>

      <GlobalDrawer
        title={clientInfo?._id ? "Update Client info" : "Create new Client"}
        open={isOpenDrawer}
        setOpen={setIsOpenDrawer}
      >
        <FormProvaider submitHandlar={submitHandler} initialValues={clientInfo}>
          <Box marginTop={{ xs: "30px", md: "0px" }}>
            <FormInputField
              name="name"
              label="Client Name"
              required
              placeholder="Enter Client Name"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="phone"
              label="Client Phone"
              required
              placeholder="Enter Phone Name"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="email"
              label="Email (Optional)"
              type={IInputType.EMAIL}
              placeholder="Enter Email address"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="address"
              label="Address"
              required
              placeholder="Enter Address"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="customerId"
              label="Customer Id"
              required
              placeholder="Enter Customer Id"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="loginId"
              label="Login ID"
              required
              placeholder="Enter Login ID"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="loginPassword"
              label="Login Password"
              required
              placeholder="Enter Login Password"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormSelectField
              name="servicePackege"
              label="Package"
              options={[
                { label: "10MBS", value: "10MBS" },
                { label: "15MBS", value: "15MBS" },
                { label: "20MBS", value: "20MBS" },
                { label: "25MBS", value: "25MBS" },
                { label: "30MBS", value: "30MBS" },
                { label: "40MBS", value: "40MBS" },
              ]}
              placeholder="Select One"
              required
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="mac"
              label="MAC Address (optional)"
              placeholder="Enter MAC Address"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormSelectField
              name="isActive"
              label="Status"
              options={[
                { label: "Active", value: true },
                { label: "Deavtive", value: false },
              ]}
              placeholder="Select One"
              required
            />
          </Box>

          <Box marginTop="50px">
            <Stack direction="row" spacing={2} justifyContent={"center"}>
              <GlobalButton
                onClick={() => {
                  setIsOpenDrawer(false);
                  setClientInfo({});
                }}
                color="error"
                title="Cancel"
              />

              <GlobalButton
                isLoading={createLoading || updateLoading}
                title={clientInfo?._id ? "Update" : "Create"}
                type="submit"
              />
            </Stack>
          </Box>
        </FormProvaider>
      </GlobalDrawer>
    </Box>
  );
};

export default ClientsListing;
