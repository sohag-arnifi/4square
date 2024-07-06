"use client";

import theme from "@/theme";
import {
  AccountBalanceWallet,
  AddBusinessSharp,
  AssuredWorkload,
  Business,
  Groups2,
  Payments,
  People,
} from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Box paddingX={"5%"}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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
                  <Groups2
                    sx={{
                      fontSize: "30px",
                    }}
                  />
                  <Typography
                    sx={{
                      paddingX: "10px",
                    }}
                    variant="h3"
                  >
                    Clients
                  </Typography>
                </Box>

                <Link href="/clients">
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.colorConstants.primaryBlue,
                      fontWeight: 500,
                    }}
                  >
                    View List
                  </Typography>
                </Link>
              </Box>

              <Box width="100%" marginY="20px">
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
                </Paper>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
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
                  <AssuredWorkload
                    sx={{
                      fontSize: "30px",
                    }}
                  />
                  <Typography
                    sx={{
                      paddingX: "10px",
                    }}
                    variant="h3"
                  >
                    Assets
                  </Typography>
                </Box>
              </Box>

              <Box width="100%" marginY="20px">
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
                    <Payments sx={{ fontSize: "20px" }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        paddingX: "10px",
                      }}
                    >
                      Debit
                    </Typography>
                  </Box>

                  <Typography variant="h5">30,0000.00</Typography>
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
                    <AccountBalanceWallet sx={{ fontSize: "20px" }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        paddingX: "10px",
                      }}
                    >
                      Credit
                    </Typography>
                  </Box>

                  <Typography variant="h5">20,000.00</Typography>
                </Paper>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box marginY="20px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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
                  <AddBusinessSharp
                    sx={{
                      fontSize: "30px",
                    }}
                  />
                  <Typography
                    sx={{
                      paddingX: "10px",
                    }}
                    variant="h3"
                  >
                    4Square Cable
                  </Typography>
                </Box>

                <Link href="/">
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.colorConstants.primaryBlue,
                      fontWeight: 500,
                    }}
                  >
                    View All
                  </Typography>
                </Link>
              </Box>

              <Box width="100%" marginY="20px">
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
                </Paper>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
