import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { UserCircle } from "phosphor-react";
import { useSelector } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const { email } = useSelector(state => state.app.user);

  return (
    <Box
      p={2}
      px={5}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        height: 75,
        // width: "100%",
      }}
      zIndex={2}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: 700, color: theme.palette.primary.dark }}
            variant="h2"
          >
            SDM
          </Typography>
        </Box>

        <Box
          p={1}
          px={2}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.light,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.20)",
          }}
          borderRadius={0.75}
        >
          <Stack spacing={1.5} direction="row" alignItems="center">
            <UserCircle size={28} />
            <Typography variant="h5" component="span">
              {email}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
