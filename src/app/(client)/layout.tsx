"use client";

import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import { Box, Drawer, LinearProgress } from "@mui/material";
import React, { Suspense, useState } from "react";
import {
  BarChart,
  Business,
  Description,
  Groups2,
  Settings,
} from "@mui/icons-material";
import ProtectedRouteHOC from "@/lib/ProtectedRoute";
import theme from "@/theme";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const items = [
    {
      label: "Overview",
      path: "/",
      icon: <BarChart />,
    },
    {
      label: "All Clients",
      path: "/clients",
      icon: <Groups2 />,
    },
    {
      label: "Sales",
      path: "/",
      icon: <Business />,
      subPath: [
        {
          label: "Direct Invoice",
          path: "/sales/direct-invoice",
        },
        {
          label: "Direct Delivery",
          path: "/sales/direct-delivery",
        },
        {
          label: "Sales Orders",
          path: "/sales/sales-orders",
        },
      ],
    },
    {
      label: "Purchases",
      path: "/purchases",
      icon: <Description />,
      subPath: [
        {
          label: "Purchase Orders",
          path: "/purchases/purchase-orders",
        },
        {
          label: "Purchase Invoices",
          path: "/purchases/purchase-invoices",
        },
      ],
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <Settings />,
      subPath: [
        {
          label: "Company Setup",
          path: "/settings/company-setup",
        },
        {
          label: "User Accounts Setup",
          path: "/settings/user-accounts-setup",
        },
        {
          label: "Access Setup",
          path: "/settings/access-setup",
        },
        {
          label: "Fiscal Years",
          path: "/settings/fiscal-years",
        },
      ],
    },
  ];

  return (
    <Box
      display="flex"
      minHeight={"100vh"}
      sx={{ bgcolor: theme.colorConstants.whitishGray }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
        width={"15%"}
        position={"fixed"}
      >
        <SideNav setOpen={setOpen} navigateItems={items} />
      </Box>

      <Box
        marginLeft={{ xs: "0px", md: "15%" }}
        width={{ xs: "100%", md: "85%" }}
      >
        <Box
          position={"fixed"}
          width={{ xs: "100%", md: "85%" }}
          zIndex={10}
          bgcolor={theme.colorConstants.whitishGray}
        >
          <TopNav setOpen={setOpen} open={open} />
        </Box>

        <Box zIndex={5} marginTop={"100px"} sx={{ overflow: "hidden" }}>
          <Suspense fallback={<LinearProgress />}>{children}</Suspense>
        </Box>
      </Box>

      <Drawer
        sx={{
          // width: "100%",
          // width: { xs: "100%", md: "15%" },
          "& .MuiDrawer-paper": {
            width: "300px",
            boxSizing: "border-box",
            "@media (min-width: 900px)": {
              // width: "100%",
            },
          },
          "@media (min-width: 900px)": {
            // width: "300px",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <SideNav setOpen={setOpen} navigateItems={items} />
      </Drawer>
    </Box>
  );
};

export default ProtectedRouteHOC(DashboardLayout);
