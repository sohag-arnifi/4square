import theme from "@/theme";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface IOverviewCardProps {
  name: string;
  icon: JSX.Element;
  link?: {
    name: string;
    url: string;
  };
}

const OverviewCard: React.FC<{
  data: IOverviewCardProps;
  children?: React.ReactNode;
}> = ({ data, children }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRedius: "10px",
        padding: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {data?.icon}
          <Typography
            sx={{
              paddingX: "10px",
            }}
            variant="h3"
          >
            {data?.name}
          </Typography>
        </Box>

        {data?.link?.url && (
          <Link href={data?.link?.url}>
            <Typography
              variant="body1"
              sx={{
                color: theme.colorConstants.primaryBlue,
                fontWeight: 500,
              }}
            >
              {data?.link?.name}
            </Typography>
          </Link>
        )}
      </Box>

      <Box width="100%" marginY="20px">
        {children}
        {/* <Paper
          variant="outlined"
          sx={{
            borderRedius: "6px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Business sx={{ fontSize: "20px" }} />
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                paddingX: "10px",
              }}
            >
              Company
            </Typography>
          </Box>

          <Typography variant="h5">30</Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            borderRedius: "6px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <People sx={{ fontSize: "20px" }} />
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                paddingX: "10px",
              }}
            >
              Person
            </Typography>
          </Box>

          <Typography variant="h5">25</Typography>
        </Paper> */}
      </Box>
    </Paper>
  );
};

export default OverviewCard;
