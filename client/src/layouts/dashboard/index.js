import React from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector(state => state.app)

  if(!isLoggedIn) {
    return <Navigate to="/auth/login" />
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Header />
      <Stack direction="row" sx={{ height: "calc(100vh - 75px)" }}>
        <Sidebar />
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default DashboardLayout;
