"use client";

import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { ErrorOutline, KeyboardArrowDown, Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import theme from "@/theme";
import { useAppSelector } from "@/redux/hooks";
import GlobalModal from "../Modals/GlobalModal";

import MenuIcon from "@mui/icons-material/Menu";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    paddingX: theme.spacing(1),
    marginTop: theme.spacing(1),
    minWidth: 200,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface HeaderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const TopNav: React.FC<HeaderProps> = ({ setOpen, open }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logoutModal, setLogoutModal] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const logoutHandlar = (): void => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/login");
    setLogoutModal(false);
  };

  const modalInfo = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ErrorOutline
        color="error"
        sx={{ fontSize: { xs: "50px", md: "100px" } }}
      />
      <Typography
        variant="h3"
        sx={{
          color: theme.colorConstants.crossRed,
          fontSize: { xs: "16px", md: "24px" },
          paddingTop: { xs: "10px", md: "20px" },
          lineHeight: { xs: "18px", md: "24px" },
        }}
      >
        Are you sure you want to logout?
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.colorConstants.darkBlue,
          fontSize: { xs: "12px", md: "16px" },
          lineHeight: { xs: "14px", md: "20px" },
          marginTop: "10px",
        }}
      >
        You will be logged out after clicking on <b>Yes</b> button
      </Typography>
    </Box>
  );

  return (
    <Box
      height="60px"
      width="100%"
      display="flex"
      justifyContent={{ xs: "space-between", md: "end" }}
      alignItems={"center"}
      px={{ xs: 0, md: 2 }}
      zIndex={10}
      sx={{
        boxShadow: "0px 20px 51px 0px rgba(66, 129, 233, 0.20)",
        borderBottom: "2px solid black",
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
        }}
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          onClick={() => setOpen(!open)}
          size="large"
          aria-label="menu"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 2,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          <Box display={{ xs: "none", md: "flex" }}>
            <Avatar
              alt={user?.username}
              src=""
              sx={{ width: 40, height: 40, mx: "10px" }}
            />

            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{ ml: "10px", fontWeight: 400, color: "#757575" }}
              >
                {user?.role === "super_admin" ? "Super Admin" : "Admin"}
              </Typography>
              <Button
                aria-haspopup="true"
                aria-expanded={true}
                variant="text"
                disableElevation
                onClick={(e) => setAnchorEl(e.currentTarget)}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  color: theme.colorConstants.darkBlue,
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  height: "20px",
                }}
              >
                {user?.username}
              </Button>
            </Box>
          </Box>

          <Box display={{ xs: "block", md: "none" }}>
            <Avatar
              alt={user?.username}
              src=""
              sx={{ width: 30, height: 30 }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />

            {/* <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{ ml: "10px", fontWeight: 400, color: "#757575" }}
              >
                {user?.role === "super_admin" ? "Super Admin" : "Admin"}
              </Typography>
              <Button
                aria-haspopup="true"
                aria-expanded={true}
                variant="text"
                disableElevation
                onClick={(e) => setAnchorEl(e.currentTarget)}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  color: theme.colorConstants.darkBlue,
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  height: "20px",
                }}
              >
                {user?.username}
              </Button>
            </Box> */}
          </Box>
        </Stack>
      </Stack>

      <StyledMenu
        disableScrollLock
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            setLogoutModal(true);
            setAnchorEl(null);
          }}
        >
          <Logout />
          <Typography sx={{ color: "#3A326D", fontWeight: 500, px: "10px" }}>
            {"Logout"}
          </Typography>
        </MenuItem>
      </StyledMenu>

      <GlobalModal
        title=""
        info={modalInfo}
        okFn={logoutHandlar}
        open={logoutModal}
        setOpen={setLogoutModal}
        loading={false}
      />
    </Box>
  );
};

export default TopNav;
