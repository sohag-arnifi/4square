"use client";

import GlobalButton from "@/components/Buttons/GlobalButton";
import GlobalDrawer from "@/components/Drawers/GlobalDrawer";
import GlobalLoader from "@/components/GlobalLoader";
import PageHeader from "@/components/PageHeader";
import GlobalTable from "@/components/Tables/GlobalTable";
import FormProvaider from "@/components/forms";
import FormInputField, { IInputType } from "@/components/forms/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField";
import { IInvestor } from "@/models/investor";
import {
  useCreateInvestorMutation,
  useGetAllInvestorQuery,
  useUpdateInvestorMutation,
} from "@/redux/features/investor/investorApi";
import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Stack } from "@mui/material";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const InvestorsListing = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [investorInfo, setInvestorInfo] = useState<Partial<IInvestor>>({});

  const loginUser = useAppSelector((state) => state?.auth?.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [createInvestor, { isLoading: createLoading }] =
    useCreateInvestorMutation();
  const [updateInvestor, { isLoading: updateLoading }] =
    useUpdateInvestorMutation();

  const { data, isLoading: initialLoading } = useGetAllInvestorQuery({});

  const tableHeaders = [
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
      width: "200px",
    },
    {
      label: "Invest",
      align: "left",
      width: "100px",
    },
    {
      label: "Profite",
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

  const tableItems = data?.data?.map((item: IInvestor) => {
    return {
      _id: item._id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      invest: item?.invest.toString() ?? "0.00",
      profit: item?.profit.toString() ?? "0.00",
      status: item.isActive ? "Active" : "Deactive",
    };
  });

  const updateHandler = (id: string) => {
    // const selected = data?.data?.find((item: User) => item?.id === id);
    // setInvestorInfo(selected);
    // setIsOpenDrawer(true);
  };

  const submitHandler = async (values: FormikValues) => {
    let response;
    try {
      if (!values?._id) {
        response = await createInvestor(values).unwrap();
      } else {
        response = await updateInvestor(values).unwrap();
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
    //     id: investorInfo?.id,
    //     role: investorInfo?.role,
    //   }).unwrap();
    //   if (res.success) {
    //     dispatch(
    //       snackbarSliceActions.open({
    //         type: "success",
    //         message: res?.message,
    //       })
    //     );
    //     setIsOpenModal(false);
    //     setInvestorInfo({});
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

  return (
    <Box>
      <PageHeader title="Company Investors" />

      <Box sx={{ paddingX: "5%", mx: "auto", my: "20px", minHeight: "40vh" }}>
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
                setInvestorInfo({});
                setIsOpenDrawer(true);
              }}
              title="Add New"
            />
          </Stack>
        </Box>
      </Box>

      <GlobalDrawer
        title={
          investorInfo?.id ? "Update Invester info" : "Create new Invester"
        }
        open={isOpenDrawer}
        setOpen={setIsOpenDrawer}
      >
        <FormProvaider
          submitHandlar={submitHandler}
          initialValues={investorInfo}
        >
          <Box marginTop={{ xs: "30px", md: "0px" }}>
            <FormInputField
              name="name"
              label="Full Name"
              required
              placeholder="Enter Full Name"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="phone"
              label="Phone"
              required
              placeholder="Enter Phone Name"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="email"
              label="Email"
              type={IInputType.EMAIL}
              required
              placeholder="Enter Email address"
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
                isLoading={createLoading || updateLoading}
                title={investorInfo?.id ? "Update" : "Create"}
                type="submit"
              />
              <GlobalButton
                onClick={() => {
                  setIsOpenDrawer(false);
                  setInvestorInfo({});
                }}
                color="error"
                title="Cancel"
              />
            </Stack>
          </Box>
        </FormProvaider>
      </GlobalDrawer>
    </Box>
  );
};

export default InvestorsListing;
