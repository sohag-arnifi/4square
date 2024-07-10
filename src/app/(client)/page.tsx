"use client";

import OverviewCard from "@/components/OverviewCard";
import theme from "@/theme";
import { AssuredWorkload, Groups2 } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";

const ClientCountCard: React.FC<{
  data: { title: string; count: string };
}> = ({ data: { title, count } }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        bgcolor: theme.colorConstants.bgLightBlue,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          fontSize: "40px",
        }}
      >
        {count ?? "00"}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          fontColor: theme.colorConstants.mediumGray,
        }}
      >
        {title ?? ""}
      </Typography>
    </Paper>
  );
};

const Home = () => {
  const clientsdata = {
    name: "Clients",
    icon: <Groups2 sx={{ fontSize: "30px" }} />,
    link: {
      name: "View List",
      url: "/clients",
    },
    clients: [
      { title: "Total", count: "20" },
      { title: "Deactived", count: "12" },
      { title: "Actived", count: "08" },
    ],
  };

  const investorsData = {
    name: "Investors",
    icon: <AssuredWorkload sx={{ fontSize: "30px" }} />,
    link: {
      name: "View List",
      url: "/investors",
    },
  };

  return (
    <Box paddingX={"5%"}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <OverviewCard data={clientsdata}>
              <Grid container spacing={2}>
                {clientsdata?.clients?.map((item, i) => {
                  return (
                    <Grid item xs={4} key={i}>
                      <ClientCountCard data={item} />
                    </Grid>
                  );
                })}
              </Grid>
            </OverviewCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <OverviewCard data={investorsData}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <ClientCountCard
                    data={{
                      title: "Investors",
                      count: "05",
                    }}
                  />
                </Grid>

                <Grid item xs={8}>
                  <ClientCountCard
                    data={{
                      title: "Total Invest",
                      count: "30,00,000",
                    }}
                  />
                </Grid>
              </Grid>
            </OverviewCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
