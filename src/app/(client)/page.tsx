"use client";

import OverviewCard from "@/components/OverviewCard";
import { IClient } from "@/models/client";
import { IInvestor } from "@/models/investor";
import { useGetAllClientsQuery } from "@/redux/features/clients/clientApi";
import { useGetAllInvestorQuery } from "@/redux/features/investor/investorApi";
import theme from "@/theme";
import { AssuredWorkload, Groups2 } from "@mui/icons-material";
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";

const ClientCountCard: React.FC<{
  data: { title: string; count: string; loading: boolean };
}> = ({ data: { title, count, loading } }) => {
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
      {loading ? (
        <Skeleton
          sx={{
            height: "72px",
            width: "100%",
          }}
        />
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "28px", md: "40px" },
            }}
          >
            {count ?? "00"}
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "14px", md: "16px" },
              fontColor: theme.colorConstants.mediumGray,
            }}
          >
            {title ?? ""}
          </Typography>
        </>
      )}
    </Paper>
  );
};

const Home = () => {
  const { data: clients, isLoading: isClientLoading } = useGetAllClientsQuery(
    {}
  );

  const { data: investors, isLoading: isInvestorLoading } =
    useGetAllInvestorQuery({});

  const clientsdata = {
    name: "Clients",
    icon: <Groups2 sx={{ fontSize: "30px" }} />,
    link: {
      name: "View List",
      url: "/clients",
    },
    clients: [
      { title: "Total", count: clients?.data?.length },
      {
        title: "Deactived",
        count: clients?.data?.filter((item: IClient) => !item?.isActive)
          ?.length,
      },

      {
        title: "Actived",
        count: clients?.data?.filter((item: IClient) => item?.isActive)?.length,
      },
    ],
  };

  const totalInvest = investors?.data?.reduce(
    (acc: number, item: IInvestor) => {
      return acc + item?.invest;
    },
    0
  );

  const investorsData = {
    name: "Investors",
    icon: <AssuredWorkload sx={{ fontSize: "30px" }} />,
    link: {
      name: "View List",
      url: "/investor",
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
                      <ClientCountCard
                        data={{ ...item, loading: isClientLoading }}
                      />
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
                      count: investors?.data?.length,
                      loading: isInvestorLoading,
                    }}
                  />
                </Grid>

                <Grid item xs={8}>
                  <ClientCountCard
                    data={{
                      title: "Total Invest",
                      count: totalInvest,
                      loading: isInvestorLoading,
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
