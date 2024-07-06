"use client";

import {
  Box,
  ButtonBase,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Close, KeyboardArrowDown } from "@mui/icons-material";
import theme from "@/theme";

export interface INavigateLink {
  label: string;
  path: string;
  icon: React.ReactNode;
  subPath?: {
    label: string;
    path: string;
  }[];
}

interface IProps {
  navigateItems: INavigateLink[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav: React.FC<IProps> = ({ navigateItems, setOpen }) => {
  const [activeIndex, setActiveIndex] = useState<number[]>([]);
  const pathname = usePathname();

  return (
    <Box
      sx={{ bgcolor: theme.colorConstants.backGray, color: "white" }}
      height="100vh"
      padding={2}
    >
      <Box
        width={{ xs: "100%" }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "22px", md: "32px" },
            color: "white",
          }}
        >
          ClearLedger
        </Typography>

        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
          }}
          onClick={() => setOpen(false)}
          size="small"
          color="error"
        >
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mt: 1, mb: 2, bgcolor: "white" }} />

      <Box
        height={"80vh"}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        gap={2}
      >
        <Stack width={"100%"} gap={1}>
          {navigateItems.map((item, i) => {
            return !item?.subPath ? (
              <Box key={i} width={"100%"} sx={{ color: "red" }}>
                <ButtonBase
                  onClick={() => setOpen(false)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 1,
                    fontSize: "16px",
                    borderRadius: 1,
                    bgcolor: pathname === item.path ? "#3d3f42" : "transparent",
                    fontWeight: pathname === item.path ? "600" : "normal",
                    color:
                      pathname === item.path
                        ? theme.colorConstants.white
                        : "#d2d5db",

                    "&:hover": {
                      bgcolor: "#3d3f42",
                      color: theme.colorConstants.white,
                    },
                  }}
                  component={Link}
                  href={item.path}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SvgIcon
                      fontSize="small"
                      sx={{
                        mr: 2,
                      }}
                    >
                      {item.icon}
                    </SvgIcon>
                    {item.label}
                  </Box>
                </ButtonBase>
              </Box>
            ) : (
              <Box key={i} width={"100%"} sx={{ color: "red" }}>
                <ButtonBase
                  onClick={() => {
                    const findIndex = activeIndex.findIndex(
                      (index) => index === i
                    );
                    if (findIndex !== -1) {
                      const remain = activeIndex.filter((index) => index !== i);
                      setActiveIndex(remain);
                    } else {
                      setActiveIndex([...activeIndex, i]);
                    }
                  }}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 1,
                    fontSize: "16px",
                    borderRadius: 1,
                    bgcolor: activeIndex.includes(i)
                      ? "#3d3f42"
                      : "transparent",
                    fontWeight: activeIndex.includes(i) ? "600" : "normal",
                    color: activeIndex.includes(i)
                      ? theme.colorConstants.white
                      : "#d2d5db",

                    "&:hover": {
                      bgcolor: "#3d3f42",
                      color: theme.colorConstants.white,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SvgIcon
                      fontSize="small"
                      sx={{
                        mr: 2,
                      }}
                    >
                      {item.icon}
                    </SvgIcon>
                    {item.label}
                  </Box>

                  <SvgIcon
                    fontSize="small"
                    sx={{
                      mr: 2,
                      transition: "all 0.3s ease",
                      transform: activeIndex.includes(i)
                        ? "rotate(-180deg)"
                        : "none",
                    }}
                  >
                    <KeyboardArrowDown />
                  </SvgIcon>
                </ButtonBase>

                <Box
                  sx={{
                    display: activeIndex.includes(i) ? "block" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item?.subPath?.map((subItem, j) => {
                    return (
                      <ButtonBase
                        onClick={() => setOpen(false)}
                        key={j}
                        sx={{
                          marginY: "5px",
                          width: "100%",
                          display: "flex",
                          fontSize: "14px",
                          justifyContent: "space-between",
                          padding: 1,
                          borderRadius: 1,
                          bgcolor:
                            pathname === subItem.path
                              ? "#3d3f42"
                              : "transparent",
                          fontWeight:
                            pathname === subItem.path ? "600" : "normal",
                          color:
                            pathname === subItem.path
                              ? theme.colorConstants.white
                              : "#d2d5db",

                          "&:hover": {
                            bgcolor: "#3d3f42",
                            color: theme.colorConstants.white,
                          },
                        }}
                        component={Link}
                        href={subItem.path}
                      >
                        <Box marginLeft={"35px"}>{subItem.label}</Box>
                      </ButtonBase>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default SideNav;
