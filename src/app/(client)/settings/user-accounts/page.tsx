"use client";

import GlobalButton from "@/components/Buttons/GlobalButton";
import GlobalDrawer from "@/components/Drawers/GlobalDrawer";
import GlobalLoader from "@/components/GlobalLoader";
import GlobalModal from "@/components/Modals/GlobalModal";
import PageHeader from "@/components/PageHeader";
import GlobalTable from "@/components/Tables/GlobalTable";
import FormProvaider from "@/components/forms";
import FormInputField, { IInputType } from "@/components/forms/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField";
import { IUser } from "@/models/user";
import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";
import {
  useCreateNewUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import theme from "@/theme";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const amOrPm = hour < 12 ? "AM" : "PM";

  const formattedHour = (hour % 12 !== 0 ? hour % 12 : 12).toString();
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  return `${day} ${month} ${year} at ${formattedHour}:${formattedMinute} ${amOrPm}`;
};

const UserAccounts = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<Partial<IUser>>({});
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const loginUser = useAppSelector((state) => state.auth?.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [createNewUser, { isLoading: createLoading }] =
    useCreateNewUserMutation();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const [deleteuser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const { data, isLoading: initialLoading } = useGetAllUsersQuery({});

  if (initialLoading) {
    return <GlobalLoader height="40vh" />;
  }

  const tableHeaders = [
    {
      label: "Username",
      align: "left",
      width: "100px",
    },
    {
      label: "Full Name",
      align: "left",
      width: "150px",
    },
    {
      label: "Phone Number",
      align: "left",
      width: "150px",
    },
    {
      label: "E-mail",
      align: "left",
      width: "150px",
    },
    {
      label: "Last Visit",
      align: "left",
      width: "200px",
    },
    {
      label: "Access Level",
      align: "left",
      width: "100px",
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

  const tableItems = data?.data?.map((item: IUser) => {
    return {
      _id: item?._id,
      username: item?.username || "null",
      fullName: item?.name || "null",
      phone: item?.phone || "null",
      email: item?.email || "null",
      lastVisit: item?.lastVisit ? formatDate(item?.lastVisit as Date) : "null",
      role:
        item?.role === "super_admin"
          ? "Super Admin"
          : item?.role === "admin"
          ? "Admin"
          : "User",
      status: item?.isActive ? "Active" : "Deactive",
    };
  });

  const updateHandler = (id: string) => {
    const selected = data?.data?.find((item: IUser) => item?._id === id);
    setUserInfo(selected);
    setIsOpenDrawer(true);
  };

  const submitHandler = async (values: FormikValues) => {
    let response;
    try {
      if (!values?._id) {
        response = await createNewUser(values).unwrap();
      } else {
        response = await updateUser(values).unwrap();
      }

      if (response?.success) {
        dispatch(
          snackbarSliceActions.open({
            message: response?.message,
            type: "success",
          })
        );
        setIsOpenDrawer(false);
        setUserInfo({});
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

  const modalInfo = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ErrorOutline color="error" sx={{ fontSize: "100px" }} />
      <Typography
        variant="h3"
        sx={{
          color: theme.colorConstants.crossRed,
          fontSize: "22px",
          paddingTop: "20px",
        }}
      >
        Are you sure you want to delete this user?
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.colorConstants.darkBlue,
          fontSize: "16px",
        }}
      >
        You will be delete this user after clicking on <b>Yes</b> button
      </Typography>
    </Box>
  );

  const openDeleteModal = (id: string) => {
    const selected = data?.data?.find((item: IUser) => item?._id === id);
    setUserInfo(selected);
    setIsOpenDeleteModal(true);
  };

  const deleteUserHandler = async () => {
    try {
      const res = await deleteuser(userInfo).unwrap();
      if (res.success) {
        dispatch(
          snackbarSliceActions.open({
            type: "success",
            message: res?.message,
          })
        );
        setIsOpenDeleteModal(false);
        setUserInfo({});
      } else {
        dispatch(
          snackbarSliceActions.open({
            type: "error",
            message: res.message || "Something went wrong",
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        snackbarSliceActions.open({
          type: "error",
          message: "Something went wrong",
        })
      );
    }
  };

  return (
    <Box>
      <PageHeader title="User Accounts Setup" />
      <Box sx={{ paddingX: "5%", mx: "auto", my: "20px", minHeight: "40vh" }}>
        <GlobalTable
          tableHeaders={tableHeaders}
          tableItems={tableItems}
          deleteHandler={openDeleteModal}
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
                setUserInfo({});
                setIsOpenDrawer(true);
              }}
              title="Add New"
            />
          </Stack>
        </Box>
      </Box>

      <GlobalDrawer
        title={userInfo?._id ? "Update User info" : "Create new user"}
        open={isOpenDrawer}
        setOpen={setIsOpenDrawer}
      >
        <FormProvaider submitHandlar={submitHandler} initialValues={userInfo}>
          <Box marginTop={{ xs: "30px", md: "0px" }}>
            <FormInputField
              name="username"
              label="Username"
              required
              placeholder="Enter Username"
            />
          </Box>

          <Box marginTop={"10px"}>
            <FormInputField
              name="password"
              label="Password"
              type={IInputType.PASSWORD}
              required={userInfo?._id ? false : true}
              placeholder="********"
            />
          </Box>

          <Box marginTop={"10px"}>
            <FormSelectField
              name="role"
              label="Access Level"
              options={[
                { label: "Super Admin", value: "super_admin" },
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
              ]}
              placeholder="Select Access Level"
              required
            />
          </Box>

          <Box marginTop="10px">
            <FormInputField
              name="name"
              label="Name"
              required
              placeholder="Enter login username"
            />
          </Box>

          <Box marginTop="10px">
            <FormInputField
              name="email"
              label="E-mail"
              type={IInputType.EMAIL}
              required
              placeholder="Enter user E-mail"
            />
          </Box>

          <Box marginTop="10px">
            <FormInputField
              name="phone"
              label="Phone"
              required
              placeholder="Enter user phone number"
            />
          </Box>

          <Box marginTop="10px">
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

          <Box marginTop="16px">
            <Stack direction="row" spacing={2} justifyContent={"center"}>
              <GlobalButton
                onClick={() => setIsOpenDrawer(false)}
                color="error"
                title="Cancel"
              />

              <GlobalButton
                disabled={
                  loginUser?.role !== "super_admin" &&
                  loginUser?.role !== "admin" &&
                  loginUser?._id !== userInfo?._id
                }
                isLoading={createLoading || updateLoading}
                title={userInfo?._id ? "Update" : "Create"}
                type="submit"
              />
            </Stack>
          </Box>
        </FormProvaider>
      </GlobalDrawer>

      <GlobalModal
        title=""
        info={modalInfo}
        okFn={deleteUserHandler}
        open={isOpenDeleteModal}
        setOpen={setIsOpenDeleteModal}
        loading={deleteLoading}
      />
    </Box>
  );
};

export default UserAccounts;
