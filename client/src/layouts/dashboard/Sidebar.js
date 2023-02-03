import { Box, Button, Stack, Typography } from "@mui/material";
import { CirclesThreePlus, SignOut, UserPlus } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../redux/slices/app";

const SidebarContent = [
  {
    id: 0,
    icon: <UserPlus size={24} />,
    title: "Add Student",
  },
  {
    id: 1,
    icon: <CirclesThreePlus size={24} />,
    title: "Manage Student",
  },
  {
    id: 2,
    icon: <SignOut size={24} />,
    title: "Logout",
  },
];

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/add-student";
    case 1:
      return "/manage";

    default:
      break;
  }
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if(selected === 2){
      dispatch(Logout());
    }
  }, [selected])
  

  return (
    <Box
      py={5}
      pl={5}
      sx={{
        // backgroundColor: (theme) => theme.palette.primary.light,
        // boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.20)",
        height: "100%",
        // width: "280px",
      }}
      zIndex={1}
    >
      <Stack spacing={4} sx={{ height: "100%" }} justifyContent="flex-start">
        {SidebarContent.map((elem) => (
          elem.id === selected ?
              (<Button
                py={2}
                key={elem.id}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.dark,
                  color: (theme) => theme.palette.background.alt,
                  height: "60px",
                  width: "280px",
                  borderRadius: "6px",
                  borderTopLeftRadius: "6px",
                  borderBottomLeftRadius: "6px",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.dark
                  }
                }}
              >
                <Stack
                  px={2.5}
                  sx={{ width: "100%" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  <Stack justifyContent="center" alignItems="center">{elem.icon}</Stack>
                  <Typography variant="h5" component="span">
                    {elem.title}
                  </Typography>
                </Stack>
              </Button>) : (<Button
                py={2}
                key={elem.id}
                sx={{
                  backgroundColor: (theme) => theme.palette.error.contrastText,
                  color: (theme) => theme.palette.primary.main,
                  height: "60px",
                  width: "280px",
                  borderRadius: "6px",
                  borderTopLeftRadius: "6px",
                  borderBottomLeftRadius: "6px",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.light
                  }
                }}
                onClick={() => {
                  setSelected(elem.id);
                  navigate(getPath(elem.id));
                }}
              >
                <Stack
                  px={2.5}
                  sx={{ width: "100%" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  <Stack justifyContent="center" alignItems="center">{elem.icon}</Stack>
                  <Typography variant="h5" component="span">
                    {elem.title}
                  </Typography>
                </Stack>
              </Button>)
          ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
