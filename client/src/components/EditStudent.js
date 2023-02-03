import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from '../axios';
import Header from './Header'
import StudentForm from './StudentForm';

const EditStudent = () => {
  const { activeStudent: id } = useSelector((state) => state.app.managePage);

  const [data, setData] = useState(null);

  useEffect(() => {
    return async (formValues) => {
      await axios
        .get(`/student/view/${id}`,{
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }) // Handle the response from backend here
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
      <Header title="Edit Student's Data" backBtn={true} />

      {data && (
        <StudentForm defaultDataValues={data} isDisabled={false} />
      )}
    </Stack>
  )
}

export default EditStudent