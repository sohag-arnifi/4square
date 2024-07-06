import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface IProps {
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "text" | "outlined" | "contained" | undefined;
  width?: string;
  height?: string;
  onClick?: () => void;
  color?: "primary" | "secondary" | "error" | undefined;
  type?: "submit" | "button" | undefined;
}
const GlobalButton: React.FC<IProps> = ({
  title,
  isLoading,
  disabled,
  variant,
  width,
  height,
  onClick,
  color,
  type,
}) => {
  return (
    <Button
      onClick={() => onClick && onClick()}
      disabled={disabled || isLoading}
      size="small"
      variant={variant ? variant : "contained"}
      color={color ? color : "primary"}
      type={type ? type : "button"}
      sx={{
        textTransform: "none",
        width: width ? width : "150px",
        height: height ? height : "40px",
      }}
    >
      {isLoading ? <CircularProgress size="20px" /> : title}
    </Button>
  );
};

export default GlobalButton;
