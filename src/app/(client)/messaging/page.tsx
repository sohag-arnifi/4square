"use client";

import GlobalButton from "@/components/Buttons/GlobalButton";
import GlobalDrawer from "@/components/Drawers/GlobalDrawer";
import GlobalLoader from "@/components/GlobalLoader";
import PageHeader from "@/components/PageHeader";
import GlobalTable from "@/components/Tables/GlobalTable";
import FormProvaider from "@/components/forms";
import FormInputField, { IInputType } from "@/components/forms/FormInputField";
import FormTextAreaField from "@/components/forms/FormTextAreaField";
import { IBulkSMS } from "@/models/bulksms";
import {
  useGetAllMessagesQuery,
  useSendSingleSmsMutation,
} from "@/redux/features/bulkSms/bulkSmsApi";

import { snackbarSliceActions } from "@/redux/features/snackBar/snackBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import theme from "@/theme";
import { Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
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
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  sendNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/^\d{11}$/, "Phone Number must be exactly 11 digits"),
  message: Yup.string().required("Message is Required"),
  // .min(2, "Message must be at least 2 characters")
  // .max(160, "Message must be at most 160 characters"),
});

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openTestContainer, setOpenTestContainer] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();

    date.setMonth(date.getMonth() - 1);
    return date;
  });

  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date();

    return date;
  });

  const [search, setSearch] = useState<string>("");

  const loginUser = useAppSelector((state) => state?.auth?.user);

  const [sendSingleSms, { isLoading: isSingleSmsLoading }] =
    useSendSingleSmsMutation();

  const { data, isLoading: initialLoading } = useGetAllMessagesQuery({
    startDate,
    endDate,
  });

  if (initialLoading) {
    return <GlobalLoader height="40vh" />;
  }

  const searchAbleData: IBulkSMS[] = data?.data?.filter((item: IBulkSMS) => {
    const searchInLowerCase = search.toLocaleLowerCase();

    const { sendNumber } = item;
    return sendNumber?.toLocaleLowerCase().includes(searchInLowerCase);
  });

  const tableHeaders = [
    {
      label: "SendBy",
      align: "left",
      width: "100px",
    },
    {
      label: "Phone",
      align: "left",
      width: "100px",
    },
    {
      label: "Count",
      align: "center",
      width: "50px",
    },
    {
      label: "Send Date",
      align: "left",
      width: "150px",
    },
    {
      label: "Message",
      align: "left",
      width: "700px",
    },
  ];

  const totalMessageCost = searchAbleData?.reduce(
    (count: number, item: IBulkSMS) => {
      return count + (item.smsCount || 0);
    },
    0
  );

  const tableItems = searchAbleData?.map((item: IBulkSMS) => {
    return {
      _id: item._id?.toString() as string,
      sendBy: item?.sendBy as string,
      phone: item?.sendNumber as string,
      count: item?.smsCount?.toString() as string,
      date: formatDate(item?.createdAt),
      message: item?.message,
    };
  });

  const submitHandler = async (values: FormikValues) => {
    try {
      const response = await sendSingleSms({
        ...values,
        smsCount: Math.ceil(values.message.length / 160),
      })?.unwrap();
      if (response?.success) {
        setOpenTestContainer(false);
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
      <PageHeader title="Messages" />

      <Box sx={{ paddingX: "5%", mx: "auto", my: "20px", minHeight: "40vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Typography>
            Messages Cost:{" "}
            <span
              style={{
                color: theme?.colorConstants?.crossRed,
                fontWeight: "bold",
              }}
            >
              {totalMessageCost} Only
            </span>
          </Typography>
        </Box>

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
          loginUser={loginUser}
        />
      </Box>

      <Box paddingX="5%">
        <Box marginY="50px">
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <GlobalButton
              onClick={() => router.back()}
              color="error"
              title="Send Bulk SMS"
            />
            <GlobalButton
              onClick={() => setOpenTestContainer(true)}
              title="Send SMS"
            />
          </Stack>
        </Box>
      </Box>

      <GlobalDrawer
        title={"Send SMS"}
        open={openTestContainer}
        setOpen={setOpenTestContainer}
      >
        <FormProvaider
          submitHandlar={submitHandler}
          initialValues={{ sendNumber: "", message: "" }}
          validationSchema={validateSchema}
        >
          <Box marginTop={{ xs: "30px", md: "0px" }}>
            <FormInputField
              name="sendNumber"
              label="Phone Number"
              required
              // type={IInputType.NUMBER}
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
                onClick={() => {
                  setOpenTestContainer(false);
                }}
                color="error"
                title="Cancel"
              />

              <GlobalButton
                isLoading={isSingleSmsLoading}
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
