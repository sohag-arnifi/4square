import { Box, Typography } from "@mui/material";
import React from "react";

interface IProps {
  title: string;
}
const PageHeader: React.FC<IProps> = ({ title }) => {
  return (
    <Box
      sx={{
        paddingX: "5%",
        paddingBottom: { xs: "5px", md: "10px" },
        borderBottom: `1.5px solid black`,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "16px", md: "18px" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
