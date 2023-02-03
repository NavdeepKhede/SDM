import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios";
import Header from "./Header";
import StudentForm from "./StudentForm";

const ViewStudent = () => {
  const { activeStudent: id } = useSelector((state) => state.app.managePage);

  const [data, setData] = useState(null);

  useEffect(() => {
    return async () => {
      await axios
        .get(`/student/view/${id}`) // Handle the response from backend here
        .then((res) => {
          setData(res.data.student);
        })
        // Catch errors if any
        .catch((error) => {
          console.log(error);
        });
    };
  }, [id]);


  return (
    <Stack
      sx={{
        width: "100%",
      }}
    >
      <Header title="View Student's Data" backBtn={true} />

      {data && (
        <StudentForm defaultDataValues={data} isDisabled={true} />
      )}
    </Stack>
  );
};

export default ViewStudent;
