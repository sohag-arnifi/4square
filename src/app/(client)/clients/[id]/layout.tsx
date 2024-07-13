import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "4Square | Clients Details",
  description: "4 Square Cable Network - Clients Details",
};

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};

export default ClientLayout;
