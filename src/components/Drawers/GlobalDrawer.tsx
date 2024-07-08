import theme from "@/theme";
import { Close } from "@mui/icons-material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import React from "react";

interface IProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}
const GlobalDrawer: React.FC<IProps> = ({ title, open, setOpen, children }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ sx: { width: { xs: "100%", md: "500px" } } }}
    >
      <Box>
        <Box
          height={"8vh"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={2}
          sx={{ bgcolor: theme.colorConstants.backGray }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: theme.colorConstants.white,
            }}
            variant="h3"
          >
            {title}
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            color="error"
            sx={{
              borderRadius: "50%",
              border: "2px solid red",
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Box padding={{ xs: 2, md: 5 }}>{children}</Box>
      </Box>
    </Drawer>
  );
};

export default GlobalDrawer;
