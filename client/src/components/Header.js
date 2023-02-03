import { IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { useDispatch } from "react-redux";
import { UpdateManagePageTypeAndId } from "../redux/slices/app";

const Header = ({ title, backBtn }) => {
  const dispatch = useDispatch();

  let date = new Date();
  let time = date.getHours() + ":" + date.getMinutes();
  date =
    date.getDay() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear() +
    "  " +
    time;

  const handleBack = () => {
    dispatch(UpdateManagePageTypeAndId("SHOWALL", null));
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={3}
      px={backBtn ? 4 : 8}
    >
      {backBtn ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={handleBack}>
            <CaretLeft size={24} />
          </IconButton>
          <Typography variant="h4" sx={{ fontSize: "20px", fontWeight: 600 }}>
            {title}
          </Typography>
        </Stack>
      ) : (
        <Typography variant="h4" sx={{ fontSize: "20px", fontWeight: 600 }}>
          {title}
        </Typography>
      )}

      <Typography variant="body2">{date}</Typography>
    </Stack>
  );
};

export default Header;
