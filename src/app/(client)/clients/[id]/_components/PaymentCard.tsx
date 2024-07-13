import FormSelectField from "@/components/forms/FormSelectField";
import theme from "@/theme";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { IPayment } from "../page";
import { useFormikContext } from "formik";
import { useAppSelector } from "@/redux/hooks";

const PaymentCard = () => {
  const { values } = useFormikContext<IPayment>();
  const loginUser = useAppSelector((state) => state.auth.user);

  if (values?.isActivedNeeded === "Yes") {
    return (
      <Box>
        <FormSelectField
          required
          inline
          name="paymentMethod"
          label="Payment Method"
          placeholder="Select Payment Method"
          options={[
            { label: "Bkash", value: "Bkash" },
            { label: "Nogod", value: "Nogod" },
            { label: "Bank", value: "Bank" },
          ]}
        />

        <Box
          sx={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              color: theme.colorConstants?.mediumGray,
            }}
          >
            Payment by{" "}
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: theme.colorConstants?.primaryBlue,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {loginUser?.username ?? ""}
            </span>
          </Typography>

          <Button
            //   disabled
            sx={{
              textTransform: "none",
              px: "30px",
            }}
            type="submit"
            size="small"
            variant="contained"
            color="primary"
          >
            Active
          </Button>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default PaymentCard;
