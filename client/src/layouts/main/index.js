import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assests/logo.png";
const MainLayout = () => {

  const { isLoggedIn } = useSelector(state => state.app)

  if(isLoggedIn) {
    return <Navigate to="/add-student" />
  }

  return (
    <Box p={5} margin="auto" sx={{ backgroundColor: (theme) => theme.palette.primary.light, height: "100vh",}}>
      <Container maxWidth="sm">
        <Stack mb={3} spacing={5} sx={{ width: "100%", backgroundColor: "#ebedf3"}}>
          <Stack sx={{ width: "100%" }} direction="column" alignItems="center">
            <img style={{ height: 180, width: 180 }} src={Logo} alt="Logo" />
          </Stack>
        </Stack>

        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;
