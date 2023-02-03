import React from "react";
import { Box, Stack } from "@mui/material";
import AddStudentForm from "../../sections/Forms/AddStudentForm";
import Header from "../../components/Header";

const AddStudent = () => {

  return (
    <Stack
      sx={{
        width: "100%",
      }}
    >
      <Header title="Add New Student Data" backBtn={false} />

      <Box p={3} width="95%" marginX="auto">
        <AddStudentForm />
      </Box>
    </Stack>
  );
};

export default AddStudent;
