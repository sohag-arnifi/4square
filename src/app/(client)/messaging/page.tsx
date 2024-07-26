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
import FormTextAreaField from "@/components/forms/FormTextAreaField";
import { IClient } from "@/models/client";
import {
  useCreateClientMutation,
  useDeleteClientMutation,
  useGetAllClientsQuery,
  useUpdateClientMutation,
} from "@/redux/features/clients/clientApi";
import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import theme from "@/theme";
import { DateRange, ErrorOutline, Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface IDateProps {
  value: Date;
  setFn: React.Dispatch<React.SetStateAction<Date>>;
}
const DatePickerField: React.FC<IDateProps> = ({ value, setFn }) => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(value as Date)}
          views={["day", "month", "year"]}
          format="DD/MM/YYYY"
          sx={{
            // width: "100%",
            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
              height: "5px",
              fontSize: { xs: "14px", md: "14px" },
              fontWeight: 500,
              bgcolor: theme.colorConstants?.whitishGray,
            },
          }}
          onChange={(date) => {
            if (date !== null && date) {
              setFn(date.toDate());
            }
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const MessagePage = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [clientInfo, setClientInfo] = useState<Partial<IClient>>({});

  const [openTestContainer, setOpenTestContainer] = useState<boolean>(false);

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [investorInfo, setInvestorInfo] = useState({});

  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();

    date.setMonth(date.getMonth() - 1);
    return date;
  });

  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date();

    return date;
  });

  console.log(startDate);

  const [renderClientsStatus, setRenderClientsStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const loginUser = useAppSelector((state) => state?.auth?.user);

  const { data, isLoading: initialLoading } = useGetAllClientsQuery({});

  const updateHandler = (id: string) => {
    const selected = data?.data?.find((item: IClient) => item?._id === id);
    setClientInfo(selected);
    setIsOpenDrawer(true);
  };

  const openDeleteModal = (id: string) => {
    const selected = data?.data?.find((item: IClient) => item?._id === id);
    setClientInfo(selected);
    setIsOpenDeleteModal(true);
  };

  if (initialLoading) {
    return <GlobalLoader height="40vh" />;
  }

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

  const submitHandler = async (values: FormikValues) => {
    let response;

    console.log(values);
    // try {
    //   if (!values?._id) {
    //     response = await createInvestor(values).unwrap();
    //   } else {
    //     response = await updateInvestor(values).unwrap();
    //   }

    //   if (response?.success) {
    //     dispatch(
    //       snackbarSliceActions.open({
    //         message: response?.message,
    //         type: "success",
    //       })
    //     );
    //   } else {
    //     dispatch(
    //       snackbarSliceActions.open({
    //         message: response?.message || "Something went wrong",
    //         type: "error",
    //       })
    //     );
    //   }
    // } catch (error) {
    //   dispatch(
    //     snackbarSliceActions.open({
    //       message: response?.message || "Something went wrong",
    //       type: "error",
    //     })
    //   );
    // }
  };

  return (
    <Box>
      <PageHeader title="Messages" />

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
            <DatePickerField value={startDate} setFn={setStartDate} />
            <DatePickerField value={endDate} setFn={setEndDate} />

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
                width: { xs: "100%", md: "250px" },
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
          deleteHandler={openDeleteModal}
          updateHandler={updateHandler}
          loginUser={loginUser}
          isNavigate
        />
      </Box>

      <Box paddingX="5%">
        <Box marginY="50px">
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <GlobalButton
              // onClick={() => router.back()}
              color="error"
              title="Send Bulk SMS"
            />
            <GlobalButton
              onClick={() => setOpenTestContainer(true)}
              title="Send Test SMS"
            />
          </Stack>
        </Box>
      </Box>

      <GlobalDrawer
        title={"Send Test SMS"}
        open={openTestContainer}
        setOpen={setOpenTestContainer}
      >
        <FormProvaider submitHandlar={submitHandler} initialValues={{}}>
          <Box marginTop={{ xs: "30px", md: "0px" }}>
            <FormInputField
              name="sendNumber"
              label="Phone Number"
              required
              placeholder="Enter a phone number"
            />
          </Box>

          <Box marginTop={{ xs: "30px" }}>
            <FormTextAreaField
              name="message"
              label="Message"
              required
              placeholder="Type your message here"
            />
          </Box>

          <Box marginTop="50px">
            <Stack direction="row" spacing={2} justifyContent={"center"}>
              <GlobalButton
                // onClick={() => {
                //   setIsOpenDrawer(false);
                //   setInvestorInfo({});
                // }}
                color="error"
                title="Cancel"
              />

              <GlobalButton
                // isLoading={createLoading || updateLoading}
                title={"Send"}
                type="submit"
              />
            </Stack>
          </Box>
        </FormProvaider>
      </GlobalDrawer>
    </Box>
  );
};

export default MessagePage;
