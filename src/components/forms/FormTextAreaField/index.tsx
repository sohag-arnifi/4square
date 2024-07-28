import theme from "@/theme";
import {
  Box,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React from "react";

export enum IInputType {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  PASSWORD = "password",
}

interface IInput {
  name: string;
  type?: IInputType;
  icon?: React.ReactNode;
  placeholder?: string;
  label?: string;
  inline?: boolean;
  required?: boolean;
}

const FormTextAreaField: React.FC<IInput> = ({
  name,
  label,
  placeholder,
  icon,
  type = IInputType.TEXT,
  inline,
  required,
}) => {
  return (
    <Box
      maxWidth={"500px"}
      display={"flex"}
      flexDirection={{ xs: "column", md: inline ?? false ? "row" : "column" }}
    >
      <Typography
        variant="body1"
        marginBottom={inline ?? false ? "0px" : "10px"}
        paddingY={inline ?? false ? "15px" : "0px"}
        sx={{
          fontWeight: 500,
          width: "200px",
        }}
      >
        {label ?? label}
      </Typography>

      <Field name={name} type={type}>
        {({ field, meta }: FieldProps) => (
          <>
            <textarea
              {...field}
              rows={3}
              style={{
                width: "100%",
                padding: "10px",
                outline: "none",
                fontSize: "16px",
                fontWeight: 500,
              }}
              required={required}
              placeholder={placeholder}
            ></textarea>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                }}
              >
                Message Length: {field?.value?.length}
              </Typography>

              <Typography
                sx={{
                  fontSize: "10px",
                  marginLeft: "5px",
                }}
              >
                SMS Cost: {Math.ceil(field?.value?.length / 160)}
              </Typography>
            </Box>
            <FormHelperText
              sx={{
                color: theme.colorConstants.crossRed,
                marginLeft: "16px",
              }}
            >
              {meta.touched && meta.error}
            </FormHelperText>
          </>
        )}
      </Field>
    </Box>
  );
};

export default FormTextAreaField;
