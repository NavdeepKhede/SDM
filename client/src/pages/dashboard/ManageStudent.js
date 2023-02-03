import { Stack } from "@mui/material";
import React from "react";
import ShowTable from "../../components/ShowTable";
import { useSelector } from "react-redux";
import EditStudent from "../../components/EditStudent";
import ViewStudent from "../../components/ViewStudent";

const ManageStudent = () => {
  const { managePage } = useSelector((state) => state.app);

  return (
    <Stack
      sx={{
        width: "100%",
      }}
      p={4}
    >
      {(() => {
        switch (managePage?.type) {
          case "SHOWALL":
            return <ShowTable />;
          case "VIEWONE":
            return <ViewStudent />;
          case "EDITONE":
            return <EditStudent />;

          default:
            return <ShowTable />;
        }
      })()}
    </Stack>
  );
};

export default ManageStudent;
