import { Box } from "@mui/material";
import React from "react";

export const metadata = {
  title: "4Square | Login",
  description: "Login page",
};

interface LayoutProps {
  children: React.ReactNode;
}
const layout: React.FC<LayoutProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default layout;
