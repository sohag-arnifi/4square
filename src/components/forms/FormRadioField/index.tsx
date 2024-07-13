import theme from "@/theme";
import {
  Box,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React from "react";

interface SelectOptions {
  label: string;
  value: string | boolean;
}
interface IRadio {
  options: SelectOptions[];
  name: string;
  label?: string | boolean;
  inline?: boolean;
}

const FormRadioField: React.FC<IRadio> = ({ name, label, options, inline }) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={inline ?? false ? "center" : "start"}
      justifyContent={"start"}
      flexDirection={inline ?? false ? "row" : "column"}
    >
      <Typography
        variant="body1"
        sx={{
          color: theme.colorConstants.lightPurple,
          fontWeight: 500,
          width: inline ?? false ? "150px" : "100%",
        }}
      >
        {label ?? label}
      </Typography>

      <Box>
        <Field name={name}>
          {({ field, meta }: FieldProps<string>) => (
            <>
              <RadioGroup row {...field} onChange={field.onChange}>
                {options.map((item) => (
                  <FormControlLabel
                    key={item.label}
                    value={item.value}
                    control={<Radio size="small" />}
                    label={
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: theme?.colorConstants.darkGray,
                        }}
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                ))}
              </RadioGroup>
              <FormHelperText error>
                {meta.touched && meta.error}
              </FormHelperText>
            </>
          )}
        </Field>
      </Box>
    </Box>
  );
};

export default FormRadioField;
