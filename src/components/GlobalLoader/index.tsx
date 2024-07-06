import theme from "@/theme";
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const GlobalLoader = ({ height }: { height?: string }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height || "40vh"}
      flexDirection="column"
    >
      <CircularProgress variant="indeterminate" />
      <Typography
        variant="h4"
        sx={{ color: theme.colorConstants.darkBlue, padding: "16px" }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default GlobalLoader;
