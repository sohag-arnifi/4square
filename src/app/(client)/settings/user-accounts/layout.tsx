import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "4Square | Users Accounts Setup",
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
