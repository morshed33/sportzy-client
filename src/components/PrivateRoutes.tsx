import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import toast from "react-hot-toast";

interface PrivateRouteProps {
  roleRequired: "user" | "admin";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roleRequired }) => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!user.role) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (user.role !== roleRequired) {
    toast.error("You are not authorized to access this page");
    return <Navigate to="/"/>;
  }

  return <Outlet />;
};

export default PrivateRoute;
