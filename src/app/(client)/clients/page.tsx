"use client";

import theme from "@/theme";
import { AddCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ClientsListing = () => {
  return (
    <Box paddingX="5%">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ color: theme.colorConstants.darkBlue, fontSize: "24px" }}
          >
            All Clients
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            size={"small"}
            sx={{
              textTransform: "none",
            }}
            startIcon={<AddCircle />}
          >
            Add Client
          </Button>
        </Box>
      </Box>
      this is client listiing page
    </Box>
  );
};

export default ClientsListing;
