"use client";

import React, { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useGetLoginUserQuery } from "@/redux/features/auth/authApi";
import GlobalLoader from "@/components/GlobalLoader";

export default function ProtectedRouteHOC<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  const ProtectedRoute: React.FC<P> = (props) => {
    const { data, isLoading } = useGetLoginUserQuery({});
    const router = useRouter();

    const loginUser = data?.data;

    if (isLoading) {
      return <GlobalLoader height="100vh" />;
    }

    if (!loginUser?.isActive || !loginUser?.id) {
      router.replace("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
}
