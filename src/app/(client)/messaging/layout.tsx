import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "4Square | All Clients",
  description: "Generated by create next app",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};

export default Layout;
