import { Box, InputAdornment, TextField, Typography } from "@mui/material";
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
          <textarea
            {...field}
            rows={3}
            style={{
              width: "100%",
              // border: "none",
              padding: "20px",
              outline: "none",
              // fontFamily: fontFamily.switzer,
              // fontFamily: fontFamily.inter,
              fontSize: "16px",
              fontWeight: 500,
            }}
            required={required}
            placeholder={placeholder}
            // onChange={(e) => setUserComment(e.target.value)}
          ></textarea>
        )}
      </Field>
    </Box>
  );
};

export default FormTextAreaField;
